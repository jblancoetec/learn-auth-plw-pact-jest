import { parseRequest } from "../parser";
import { signInUser } from "../repo";
import { SignInUserResult } from "../types";

const BAD_REQUEST = 400;

export const signInUserIfRequestIsValid = async (
  request: any,
): Promise<SignInUserResult> => {
  const { parsed, message, data } = parseRequest(request);
  return parsed ? await signInUser(data!) : { status: BAD_REQUEST, message };
};
