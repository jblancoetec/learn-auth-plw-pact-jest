import { SignUpRequestScheme } from "../types";
import type { SignUpRequest } from "../types";

export type ParsedData = SignUpRequest;

export type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};

export const parseRequest = (request: any): ParseRequestResult => {
  const parsedRequest = SignUpRequestScheme.safeParse(request);
  if (parsedRequest.error) {
    return { parsed: false, message: parsedRequest.error.message };
  }
  if (parsedRequest.data.password !== parsedRequest.data.confirm) {
    return { parsed: false, message: "Passwords do not match" };
  }
  return {
    parsed: true,
    message: "Props are valid",
    data: parsedRequest.data,
  };
};
