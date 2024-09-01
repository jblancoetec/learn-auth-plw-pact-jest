import { parseRequest } from "../parser";
import { signInUser, SignInUserResult } from "../repo";

export const signInUserIfRequestIsValid = async (
  request: any,
): Promise<SignInUserResult> => {
  const { parsed, message, data } = parseRequest(request);
  return parsed ? await signInUser(data!) : { state: "not-parsed", message };
};
