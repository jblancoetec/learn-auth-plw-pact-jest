import { NextResponse } from "next/server";
import { SignInUserResult } from "../types";

export const reply = (result: SignInUserResult): Response => {
  const { status, message } = result;
  const response = NextResponse.json({ message }, { status });

  response.cookies.set({
    name: "sign-in-token",
    value: result.token ?? "no-token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
};
