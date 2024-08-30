import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { SignUpRequest } from "../types";

export type SignUpUserResult = {
  enrolled: boolean;
  message: string;
};

export type SignUpUserProps = SignUpRequest;

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
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  await db.users.create({ data: user });
  return {
    enrolled: true,
    message: "User enrolled",
  };
};

const handle = (error: unknown): SignUpUserResult => {
  const isPrismaError =
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError;
  return {
    enrolled: false,
    message: isPrismaError ? error.message : "Unknown error",
  };
};
