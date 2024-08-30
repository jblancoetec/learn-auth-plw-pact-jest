import z from "zod";

export const SignInRequestScheme = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInRequest = z.infer<typeof SignInRequestScheme>;
