import z from "zod";

export const SignInUserRequestScheme = z.object({
  email: z
    .string()
    .email("Debe existir un email: Por ejemplo jdoe@ejemplo.com"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type SignInUserRequest = z.infer<typeof SignInUserRequestScheme>;

export type SignInUserResult = {
  status: number;
  message: string;
  token?: string;
};
