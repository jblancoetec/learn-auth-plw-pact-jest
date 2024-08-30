import { SignUpUserResult } from "../controller";
import { StateSignUpResult } from "../types";

export const statusCode = new Map<StateSignUpResult, number>();
statusCode.set("enrolled", 201);
statusCode.set("parsed", 202);
statusCode.set("not-parsed", 400);
statusCode.set("not-enrolled", 500);

export const reply = (result: SignUpUserResult): Response => {
  const code = statusCode.get(result.state);
  return Response.json(result, { status: code });
};
