"use client";

import { submitContact } from "@/app/contact/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import {
  contactSchema,
  initialContactState,
  fieldErrorsFromZod,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { useActionState, useEffect, useRef, useState } from "react";

const fields: { name: ContactField; label: string; autoComplete: string; type?: string }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", autoComplete: "email", type: "email" },
  { name: "subject", label: "Subject", autoComplete: "off" },
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const [clientErrors, setClientErrors] = useState<ContactFormState["fieldErrors"]>({});
  const startedAt = useRef(0);
  const startedInput = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      startedAt.current = Date.now();
    }
    if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  const errors = { ...state.fieldErrors, ...clientErrors };

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-5"
      noValidate
      aria-busy={pending}
      onSubmit={(event) => {
        if (startedInput.current) {
          startedInput.current.value = String(startedAt.current || Date.now());
        }
        const data = new FormData(event.currentTarget);
        const parsed = contactSchema.safeParse({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          fax_number: data.get("fax_number") ?? "",
          startedAt: data.get("startedAt") ?? "",
        });
        if (!parsed.success) {
          event.preventDefault();
          setClientErrors(fieldErrorsFromZod(parsed.error));
          return;
        }
        setClientErrors({});
      }}
    >
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="fax_number">Fax</label>
        <input id="fax_number" name="fax_number" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedInput} type="hidden" name="startedAt" defaultValue="" />

      {fields.map((field) => {
        const errorId = `${field.name}-error`;
        const message = errors[field.name];
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              required
              aria-invalid={message ? true : undefined}
              aria-describedby={message ? errorId : undefined}
              className="h-11"
            />
            {message ? (
              <p id={errorId} className="text-sm text-destructive">
                {message}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-36 text-base md:text-base"
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-destructive">
            {errors.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
        disabled={pending}
      >
        {pending ? "Sending…" : "Send message"}
      </button>

      <p
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(
          "text-sm leading-relaxed outline-none",
          state.status === "idle" && "sr-only",
          state.status === "success" && "text-foreground",
          (state.status === "error" || state.status === "unconfigured") && "text-destructive",
        )}
      >
        {state.message || "Form status"}
      </p>
    </form>
  );
}
