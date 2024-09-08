import { NextRequest, NextResponse } from "next/server";
import { decryptID } from "./utils";

export const autherize = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const cookie = req.cookies.get("session");
    if (!cookie) {
      return NextResponse.redirect(new URL("/users/sign-in"));
    }
    const token = cookie.value;
    if (!token) {
      return NextResponse.redirect(new URL("/users/sign-in"));
    }
    await decryptID(token);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/users/sign-in"));
  }
};
