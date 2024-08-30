import db from "@/db";
import { SignInRequest } from "../types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export type SignInUserResult = {
  accepted: boolean;
  message: string;
  token?: string;
};

export type SignInUserProps = SignInRequest;

export const signInUser = async (
  props: SignInUserProps,
): Promise<SignInUserResult> => {
  const user = await db.users.findUnique({
    where: {
      email: props.email,
    },
  });

  if (!user) {
    return { accepted: false, message: "User not found" };
  }

  const passwordCorrect = await bcrypt.compare(props.password, user.password);

  if (!passwordCorrect) {
    return { accepted: false, message: "Password incorrect" };
  }

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
    },
  );

  return { accepted: true, message: "User accepted", token };
};
