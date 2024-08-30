import { parseRequest } from "../parser";
import { signUpUser } from "../repo";

export type StateCreateResult =
  | "parsed"
  | "enrolled"
  | "not-parsed"
  | "not-created";

export type SignUpUserResult = {
  state: StateCreateResult;
  message: string;
};

export const signUpUserIfRequestIsValid = (request: any): SignUpUserResult => {
  const { parsed, message: parserMessage, data } = parseRequest(request);
  if (!parsed) {
    return { state: "not-parsed", message: parserMessage };
  }
  const { enrolled: created, message: createrMessage } = signUpUser(data!);
  if (!created) {
    return { state: "not-created", message: createrMessage };
  }
  return { state: "enrolled", message: "User sign up successfully" };
};
