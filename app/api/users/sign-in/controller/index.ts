import { parseRequest } from "../parser";
import { signInUser } from "../repo";

export type StateSignInUserResult =
  | "parsed"
  | "not-parsed"
  | "accepted"
  | "not-accepted";

export type SignInUserResult = {
  state: StateSignInUserResult;
  message: string;
  token?: string;
};

export const signInUserIfRequestIsValid = async (
  request: any,
): Promise<SignInUserResult> => {
  const parserResult = parseRequest(request);
  if (!parserResult.data) {
    return { state: "not-parsed", message: parserResult.message };
  }
  const { accepted, message, token } = await signInUser(parserResult.data);
  if (!accepted) {
    return { state: "not-accepted", message };
  }
  return { state: "accepted", message, token };
};
