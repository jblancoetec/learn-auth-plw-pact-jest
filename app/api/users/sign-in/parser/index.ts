import { BadRequestError } from "@/app/api/errors";
import { SignInUserRequestScheme } from "../types";
import type { SignInUserRequest } from "../types";

export type ParsedData = SignInUserRequest;

export const parse = (request: any): ParsedData => {
  const { success, error, data } = SignInUserRequestScheme.safeParse(request);
  if (!success) {
    throw new BadRequestError(error.message);
  }
  return data;
};
