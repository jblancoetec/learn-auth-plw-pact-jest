import { SignUpUserRequestScheme } from "../types";
import type { SignUpUserRequest } from "../types";

type ParsedData = SignUpUserRequest;

type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};

export const parseRequest = (request: any): ParseRequestResult => {
  const { error, data } = SignUpUserRequestScheme.safeParse(request);
  if (error) {
    return { parsed: false, message: error.message };
  }
  if (data.password !== data.confirm) {
    return { parsed: false, message: "Passwords do not match" };
  }
  return {
    parsed: true,
    message: "Request is valid",
    data,
  };
};
