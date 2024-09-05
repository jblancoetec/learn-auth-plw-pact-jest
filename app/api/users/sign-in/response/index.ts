import { NextResponse } from "next/server";
import { SignInUserResult } from "../types";

export const reply = (result: SignInUserResult): Response => {
  const { message } = result;
  const response = NextResponse.json({ message }, { status: 202 });
  response.cookies.set({
    name: "session",
    value: result.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
};
