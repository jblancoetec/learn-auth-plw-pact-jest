import { parseRequest } from "../parser";
import { signUpUser } from "../repo";
import type { StateSignUpResult } from "../types";

export type SignUpUserResult = {
  state: StateSignUpResult;
  message: string;
};

export const signUpUserIfRequestIsValid = async (
  request: any,
): Promise<SignUpUserResult> => {
  const { parsed, message: parserMessage, data } = parseRequest(request);
  if (!parsed) {
    return { state: "not-parsed", message: parserMessage };
  }
  const { enrolled, message: createrMessage } = await signUpUser(data!);
  if (!enrolled) {
    return { state: "not-enrolled", message: createrMessage };
  }
  return { state: "enrolled", message: "User sign up successfully" };
};
