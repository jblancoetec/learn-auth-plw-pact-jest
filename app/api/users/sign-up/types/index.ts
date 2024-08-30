import z from "zod";

export const SignUpRequestScheme = z.object({
  name: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string().min(8),
});

export type SignUpRequest = z.infer<typeof SignUpRequestScheme>;

export type StateSignUpResult =
  | "parsed"
  | "enrolled"
  | "not-parsed"
  | "not-enrolled";
