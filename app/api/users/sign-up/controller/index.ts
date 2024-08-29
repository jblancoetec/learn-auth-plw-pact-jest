import { parseRequest } from "../parser";
import { createUser } from "../repo";
import { CreateUserResult } from "./types";

export const createUserIfRequestIsValid = (request: any): CreateUserResult => {
  const { parsed, message: parserMessage, data } = parseRequest(request);
  if (!parsed) {
    return { state: "not-parsed", message: parserMessage };
  }
  const { created, message: createrMessage } = createUser(data!);
  if (!created) {
    return { state: "not-created", message: createrMessage };
  }

  return { state: "created", message: createrMessage };
};
