export type StateCreateResult =
  | "parsed"
  | "created"
  | "not-parsed"
  | "not-created";

export type CreateUserResult = {
  state: StateCreateResult;
  message: string;
};
