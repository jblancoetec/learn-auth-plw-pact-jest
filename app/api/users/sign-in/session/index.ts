import { User } from "@/app/users/types";
import { SignInUserResult } from "../types";
import jwt from "jsonwebtoken";

export const signIn = (user: User): SignInUserResult => {
  const secret = process.env.JWT_SECRET ?? "secret";
  const token = jwt.sign(
    {
      id: user.id,
    },
    secret,
    {
      expiresIn: "1h",
    },
  );

  return {
    message: "Usuario correctamente autenticado",
    token,
  };
};
