import { SignInRequestScheme } from "../types";
import type { SignInRequest } from "../types";

export type ParsedData = SignInRequest;

export type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};

export const parseRequest = (request: any): ParseRequestResult => {
  const parsedRequest = SignInRequestScheme.safeParse(request);
  if (parsedRequest.error) {
    return { parsed: false, message: parsedRequest.error.message };
  }
  return {
    parsed: true,
    message: "Props are valid",
    data: parsedRequest.data,
  };
};
