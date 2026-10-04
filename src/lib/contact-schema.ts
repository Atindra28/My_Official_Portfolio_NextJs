import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters.")
    .max(80, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(3, "Enter a valid email address.")
    .max(120, "Email is too long.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Subject should be at least 3 characters.")
    .max(140, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(5000, "Message is too long."),
  fax_number: z.string().optional(),
  startedAt: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error" | "unconfigured";
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

export function fieldErrorsFromZod(
  error: z.ZodError,
): ContactFormState["fieldErrors"] {
  const fieldErrors: ContactFormState["fieldErrors"] = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      (key === "name" || key === "email" || key === "subject" || key === "message") &&
      !fieldErrors[key]
    ) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}
