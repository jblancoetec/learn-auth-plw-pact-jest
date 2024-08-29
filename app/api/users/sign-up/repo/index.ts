import db from "@/db";
import { Prisma } from "@prisma/client";
import { CreateUserProps, CreateUserResult } from "./types";

export const createUser = (props: CreateUserProps): CreateUserResult => {
  const result = { created: false, message: "" };
  db.users
    .create({ data: props })
    .then(() => {
      result.created = true;
      result.message = "User created";
    })
    .catch((error) => {
      const isPrismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError;
      result.created = false;
      result.message = isPrismaError ? error.message : "Unknown error";
    });

  return result;
};
