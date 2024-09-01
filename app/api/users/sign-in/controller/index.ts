import { ParseRequestResult } from "../parser";
import { parseRequest } from "../parser";
import { signInUser, SignInUserProps, SignInUserResult } from "../repo";

type SignInUserIfRequestIsValid = (request: any) => Promise<SignInUserResult>;
type ParseRequest = (request: any) => ParseRequestResult;
type SignInUser = (props: SignInUserProps) => Promise<SignInUserResult>;

export const signInUserIfRequestIsValidFactory = (
  parseRequest: ParseRequest,
  signInUser: SignInUser,
): SignInUserIfRequestIsValid => {
  return async (request: any): Promise<SignInUserResult> => {
    const { parsed, message, data } = parseRequest(request);
    return parsed ? await signInUser(data!) : { state: "not-parsed", message };
  };
};

export const signInUserIfRequestIsValid = signInUserIfRequestIsValidFactory(
  parseRequest,
  signInUser,
);
