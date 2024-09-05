import { BadRequestError } from "@/app/api/errors";
import { SignUpUserRequestScheme } from "../types";
import type { SignUpUserRequest } from "../types";

type ParsedData = SignUpUserRequest;

export const parse = (request: any): ParsedData => {
  const { success, error, data } = SignUpUserRequestScheme.safeParse(request);
  if (!success) {
    throw new BadRequestError(error?.message);
  }
  const passIsConfirm = data.password === data.confirm;
  if (!passIsConfirm) {
    throw new BadRequestError("Las contraseñas no coinciden");
  }
  return data;
};
