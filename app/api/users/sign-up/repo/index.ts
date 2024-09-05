import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma, Users } from "@prisma/client";
import { SignUpUserRequest, SignUpUserResult } from "../types";
import { InternalServerError } from "@/app/api/errors";

type SignUpUserProps = SignUpUserRequest;
type User = Users;

export const create = async (props: SignUpUserProps): Promise<User> => {
  try {
    props.password = await bcrypt.hash(props.password, 10);
    const user = await db.users.create({
      data: {
        name: props.name,
        lastname: props.lastname,
        email: props.email,
        password: props.password,
      },
    });
    return user;
  } catch (error) {
    const isPrismaError =
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientUnknownRequestError;
    if (isPrismaError) {
      throw new InternalServerError(error.message);
    }
    throw new InternalServerError("Error desconocido");
  }
};
