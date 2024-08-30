import { parseRequest } from "../parser";
import { signInUser, SignInUserResult } from "../repo";

export const signInUserIfRequestIsValid = async (
  request: any,
): Promise<SignInUserResult> => {
  const { message, data } = parseRequest(request);
  if (!data) {
    return { state: "not-parsed", message };
  }
  return await signInUser(data);
};
