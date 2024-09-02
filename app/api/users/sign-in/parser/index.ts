import { SignInUserRequestScheme } from "../types";
import type { SignInUserRequest } from "../types";

export type ParsedData = SignInUserRequest;

export type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};

export const parseRequest = (request: any): ParseRequestResult => {
  const { success, error, data } = SignInUserRequestScheme.safeParse(request);
  return {
    parsed: success,
    message: error?.message ?? "Datos parseados correctamente",
    data: data,
  };
};
