import db from "@/db";
import { SignInUserRequest, SignInUserResult } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Prisma, Users } from "@prisma/client";
import { UserOrPasswordIncorrect } from "../errors";

type User = Users;
type SignInUserProps = SignInUserRequest;

const ACCEPTED = 202;
const INTERNAL_SERVER_ERROR = 500;

export const signInUser = async (
  props: SignInUserProps
): Promise<SignInUserResult> => {
  try {
    const user = await find(props);
    return await tokenize(user);
  } catch (error) {
    return handle(error);
  }
};

const find = async (props: SignInUserProps): Promise<User> => {
  const user = await db.users.findUnique({
    where: {
      email: props.email,
    },
  });
  if (!user) {
    throw new UserOrPasswordIncorrect();
  }
  const correctPass = await bcrypt.compare(props.password, user.password);
  if (!correctPass) {
    throw new UserOrPasswordIncorrect();
  }
  return user;
};

const tokenize = async (user: User): Promise<SignInUserResult> => {
  const secret = process.env.JWT_SECRET ?? "secret";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
    },
    secret,
    {
      expiresIn: "1h",
    }
  );

  return {
    status: ACCEPTED,
    message: "Usuario correctamente autenticado",
    token,
  };
};

const handle = (error: unknown): SignInUserResult => {
  const isPrismaError =
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError;
  const isAUserOrPassError = error instanceof UserOrPasswordIncorrect;
  return {
    status: isAUserOrPassError ? error.status : INTERNAL_SERVER_ERROR,
    message:
      isPrismaError || isAUserOrPassError ? error.message : "Error desconocido",
  };
};
