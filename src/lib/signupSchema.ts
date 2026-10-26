import { z } from "zod";

export const signupSchema = z
  .object({
    callsign: z
      .string()
      .min(1, "Callsign is required.")
      .refine((value) => value.length >= 3, "Use at least 3 characters.")
      .refine(
        (value) => /^[A-Za-z0-9_-]{3,20}$/.test(value),
        "Use letters, numbers, underscores, or hyphens.",
      ),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email e.g you@example.com"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    terms: z
      .boolean()
      .refine((accepted) => accepted, {
        message: "Accept the terms to continue",
      }),
  })
  .superRefine(({ password, confirmPassword }, context) => {
    if (confirmPassword && confirmPassword !== password) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do no match",
      });
    }
  });

export type SignupValues = z.infer<typeof signupSchema>;
export type SignupField = keyof SignupValues;
export type SignupErrors = Partial<Record<SignupField, string>>;
