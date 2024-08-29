import { User } from "../types";

export type CreateUserResult = {
  created: boolean;
  message: string;
};

export type CreateUserProps = User;
