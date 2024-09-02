import z from "zod";

export const SignUpUserRequestScheme = z.object({
  name: z.string().min(2).max(255),
  lastname: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string().min(8),
});

export type SignUpUserRequest = z.infer<typeof SignUpUserRequestScheme>;

export type SignUpUserResult = {
  status: number;
  message: string;
};
