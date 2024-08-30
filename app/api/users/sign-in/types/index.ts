import z from "zod";

export type StateSignInUserResult =
  | "internal-error"
  | "parsed"
  | "not-parsed"
  | "accepted"
  | "not-accepted"
  | "not-found";

export const SignInRequestScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInRequest = z.infer<typeof SignInRequestScheme>;
