import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma, Users } from "@prisma/client";
import { InternalServerError, UnauthorizedError } from "@/app/api/errors";
import { SignInUserRequest } from "../users/sign-in/types";

type User = Users;
type AuthenticateProps = SignInUserRequest;

export const authenticate = async (props: AuthenticateProps): Promise<User> => {
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
      throw new InternalServerError(
        `Error interno en la base de datos: ${error.message}`,
      );
    }
    throw error;
  }
};
