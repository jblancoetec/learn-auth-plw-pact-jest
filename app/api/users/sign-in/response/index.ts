import { NextResponse } from "next/server";

type ReplyProps = {
  token: string;
};

export const reply = (result: ReplyProps): Response => {
  const response = NextResponse.json(
    { message: "Usuario correctamente autenticado" },
    { status: 202 },
  );
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
