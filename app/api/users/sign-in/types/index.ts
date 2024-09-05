import z from "zod";

export const SignInUserRequestScheme = z.object(
  {
    email: z
      .string()
      .email("Debe existir un email: Por ejemplo jdoe@ejemplo.com"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  },
  {
    message:
      "La petición no contiene ninguno de los datos necesarios para ser procesado",
  },
);

export type SignInUserRequest = z.infer<typeof SignInUserRequestScheme>;

export type SignInUserResult = {
  message: string;
  token: string;
};
