import z from "zod";

export type StateSignInUserResult =
  | "internal-error"
  | "parsed"
  | "not-parsed"
  | "accepted"
  | "not-accepted"
  | "not-found";

export const SignInRequestScheme = z.object({
  email: z
    .string()
    .email("Debe existir un email: Por ejemplo jdoe@ejemplo.com"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type SignInRequest = z.infer<typeof SignInRequestScheme>;
