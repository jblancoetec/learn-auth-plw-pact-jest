import { parseRequest } from "../parser";
import { signUpUser } from "../repo";
import type { SignUpUserResult } from "../types";

export const signUpUserIfRequestIsValid = async (
  request: any,
): Promise<SignUpUserResult> => {
  const { parsed, message, data } = parseRequest(request);
  return parsed ? await signUpUser(data!) : { state: "not-parsed", message };
};
