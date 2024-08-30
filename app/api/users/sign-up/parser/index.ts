import { SignUpRequestScheme } from "../types";
import type { SignUpRequest } from "../types";

export type ParsedData = SignUpRequest;

export type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};

export const parseRequest = (request: any): ParseRequestResult => {
  const user = SignUpRequestScheme.safeParse(request);
  if (user.error) {
    return { parsed: false, message: user.error.message };
  }
  if (user.data.password !== user.data.confirm) {
    return { parsed: false, message: "Passwords do not match" };
  }
  return {
    parsed: true,
    message: "Props are valid",
    data: user.data,
  };
};
