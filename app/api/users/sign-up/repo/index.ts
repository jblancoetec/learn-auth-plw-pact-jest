import db from "@/db";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { SignUpRequest } from "../types";

export type SignUpUserResult = {
  enrolled: boolean;
  message: string;
};

export type SignUpUserProps = SignUpRequest;

export const signUpUser = (props: SignUpUserProps): SignUpUserResult => {
  const result = { enrolled: false, message: "" };
  const user = { ...props };
  bcrypt.hash(user.password, 10).then((hash) => {
    user.password = hash;
  });
  db.users
    .create({ data: user })
    .then(() => {
      result.enrolled = true;
      result.message = "User enrolled";
    })
    .catch((error) => {
      const isPrismaError =
        error instanceof Prisma.PrismaClientKnownRequestError ||
        error instanceof Prisma.PrismaClientUnknownRequestError;
      result.enrolled = false;
      result.message = isPrismaError ? error.message : "Unknown error";
    });

  return result;
};
