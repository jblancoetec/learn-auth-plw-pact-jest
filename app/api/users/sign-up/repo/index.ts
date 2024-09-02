import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { SignUpUserRequest, SignUpUserResult } from "../types";

type SignUpUserProps = SignUpUserRequest;

export const signUpUser = async (
  props: SignUpUserProps,
): Promise<SignUpUserResult> => {
  try {
    const user = { ...props };
    return await create(user);
  } catch (error) {
    return handle(error);
  }
};

const CREATED = 201;

const create = async (user: SignUpUserProps): Promise<SignUpUserResult> => {
  user.password = await bcrypt.hash(user.password, 10);
  await db.users.create({
    data: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    },
  });
  return {
    status: CREATED,
    message: "Usuario registrado correctamente",
  };
};

const INTERNAL_SERVER_ERROR = 500;

const handle = (error: unknown): SignUpUserResult => {
  const isPrismaError =
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError;
  console.error(error);
  return {
    status: INTERNAL_SERVER_ERROR,
    message: isPrismaError ? error.message : "Error desconocido",
  };
};
