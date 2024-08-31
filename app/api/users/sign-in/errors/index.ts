import { StateSignInUserResult } from "../types";

export class UserNotFoundError extends Error {
  constructor(public reason: StateSignInUserResult = "not-found") {
    super("User not found");
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}

export class PasswordNotMatchError extends Error {
  constructor(public reason: StateSignInUserResult = "not-accepted") {
    super("Password incorrect");
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
