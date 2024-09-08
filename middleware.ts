import { NextRequest, NextResponse } from "next/server";
import { autherize } from "./app/api/auth/autherize";

const middleware = async (req: NextRequest): Promise<NextResponse> => {
  return await autherize(req);
};

export default middleware;

export const config = { matcher: "/users/dashboard/:path" };
