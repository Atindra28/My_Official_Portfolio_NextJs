"use server";

import {
  contactSchema,
  fieldErrorsFromZod,
  type ContactFormState,
} from "@/lib/contact-schema";
import { clientAddress, rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";

const MIN_SUBMIT_MS = 1200;

export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    fax_number: formData.get("fax_number") ?? "",
    startedAt: formData.get("startedAt") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: fieldErrorsFromZod(parsed.error),
    };
  }

  if (parsed.data.fax_number && parsed.data.fax_number.trim().length > 0) {
    return {
      status: "success",
      message: "Message sent.",
      fieldErrors: {},
    };
  }

  const startedAt = Number(parsed.data.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_SUBMIT_MS) {
    return {
      status: "error",
      message: "Please wait a moment and send the message again.",
      fieldErrors: {},
    };
  }

  const headerStore = await headers();
  const address = clientAddress(headerStore);
  if (!rateLimit(`contact:${address}`, 5, 10 * 60 * 1000)) {
    return {
      status: "error",
      message: "Too many messages from this network. Try again later.",
      fieldErrors: {},
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    return {
      status: "error",
      message: "The message could not be sent right now. Please try again later, or use the email address on this page.",
      fieldErrors: {},
    };
  }

  const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const subjectLine = parsed.data.subject.replace(/[\r\n]+/g, " ").trim();

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Portfolio Contact: ${subjectLine}`,
      text: [
        "New message from your portfolio website",
        "",
        "Name:",
        parsed.data.name,
        "",
        "Email:",
        parsed.data.email,
        "",
        "Subject:",
        parsed.data.subject,
        "",
        "Message:",
        parsed.data.message,
      ].join("\n"),
    });

    if (result.error) {
      return {
        status: "error",
        message: "The message could not be sent. Please try again shortly, or use the email address on this page.",
        fieldErrors: {},
      };
    }
  } catch {
    return {
      status: "error",
      message: "The message could not be sent. Please try again shortly, or use the email address on this page.",
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: "Message sent. I'll reply to the email you entered.",
    fieldErrors: {},
  };
}
