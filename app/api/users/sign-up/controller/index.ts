import { parseRequest } from "../parser";
import { signUpUser } from "../repo";
import type { SignUpUserResult } from "../types";

const bad_request = 400;

export const signUpUserIfRequestIsValid = async (
  request: any,
): Promise<SignUpUserResult> => {
  const { parsed, message, data } = parseRequest(request);
  return parsed ? await signUpUser(data!) : { status: bad_request, message };
};
