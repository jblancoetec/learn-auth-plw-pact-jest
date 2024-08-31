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
  return {
    parsed: parsedRequest.success,
    message: parsedRequest.error?.message ?? "Request parsed successfully",
    data: parsedRequest.data,
  };
};
