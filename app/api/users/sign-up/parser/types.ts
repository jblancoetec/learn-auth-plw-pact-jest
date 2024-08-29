import { User } from "../types";

export type ParsedData = User;

export type ParseRequestResult = {
  parsed: boolean;
  message: string;
  data?: ParsedData;
};
