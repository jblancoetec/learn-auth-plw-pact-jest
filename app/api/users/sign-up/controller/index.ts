import { parseRequest } from "../parser";
import { signUpUser } from "../repo";
import type { StateSignUpResult } from "../types";

export type SignUpUserResult = {
  state: StateSignUpResult;
  message: string;
};

export const signUpUserIfRequestIsValid = (request: any): SignUpUserResult => {
  const { parsed, message: parserMessage, data } = parseRequest(request);
  if (!parsed) {
    return { state: "not-parsed", message: parserMessage };
  }
  const { enrolled: created, message: createrMessage } = signUpUser(data!);
  if (!created) {
    return { state: "not-enrolled", message: createrMessage };
  }
  return { state: "enrolled", message: "User sign up successfully" };
};
