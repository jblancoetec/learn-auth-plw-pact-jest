import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { SignUpRequest, SignUpUserResult } from "../types";

type SignUpUserProps = SignUpRequest;

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
    state: "enrolled",
    message: "User enrolled",
  };
};

const handle = (error: unknown): SignUpUserResult => {
  const isPrismaError =
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError;
  return {
    state: "not-enrolled",
    message: isPrismaError ? error.message : "Unknown error",
  };
};
