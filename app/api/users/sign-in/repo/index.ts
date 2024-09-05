import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma, Users } from "@prisma/client";
import { SignInUserRequest } from "../types";
import { InternalServerError, UnauthorizedError } from "@/app/api/errors";

type User = Users;
type SignInUserProps = SignInUserRequest;

export const find = async (props: SignInUserProps): Promise<User> => {
  try {
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
  } catch (error) {
    const isPrismaError =
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError;
    if (isPrismaError) {
      throw new InternalServerError(error.message);
    }
    throw new InternalServerError("Error interno desconocido");
  }
};
