import { SignUpUserResult } from "../types";

export const reply = (result: SignUpUserResult): Response => {
  const { status } = result;
  return Response.json(result, { status });
};
