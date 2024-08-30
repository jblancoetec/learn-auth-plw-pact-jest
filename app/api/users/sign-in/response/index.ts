import { NextResponse } from "next/server";
import { SignInUserResult } from "../repo";
import { StateSignInUserResult } from "../types";

export const statusCode = new Map<StateSignInUserResult, number>();
statusCode.set("accepted", 202);
statusCode.set("parsed", 202);
statusCode.set("not-parsed", 400);
statusCode.set("not-accepted", 401);
statusCode.set("not-found", 404);

export const reply = (result: SignInUserResult): Response => {
  const code = statusCode.get(result.state);
  const response = NextResponse.json(result, { status: code });

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
