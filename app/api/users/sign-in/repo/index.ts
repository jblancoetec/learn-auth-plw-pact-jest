import db from "@/db";
import { SignInUserRequest } from "../types";
import bcrypt from "bcrypt";
import { Users } from "@prisma/client";
import { UnauthorizedError } from "@/app/api/errors";

type User = Users;
type SignInUserProps = SignInUserRequest;

export const find = async (props: SignInUserProps): Promise<User> => {
  const user = await db.users.findUnique({
    where: {
      email: props.email,
    },
  });
  if (!user) {
    throw new UnauthorizedError("Usuario no esta registrado");
  }
  const passIsCorrect = await bcrypt.compare(props.password, user.password);
  if (!passIsCorrect) {
    throw new UnauthorizedError("Usuario o contraseña incorrectos");
  }
  return user;
};
