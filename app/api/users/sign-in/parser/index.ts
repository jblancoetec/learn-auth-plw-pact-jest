import { SignInRequestScheme } from "../types";
import type { SignInRequest } from "../types";

export type ParsedData = SignInRequest;

export type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};

export const parseRequest = (request: any): ParseRequestResult => {
  const user = SignInRequestScheme.safeParse(request);
  if (user.error) {
    return { parsed: false, message: user.error.message };
  }
  return {
    parsed: true,
    message: "Props are valid",
    data: user.data,
  };
};
