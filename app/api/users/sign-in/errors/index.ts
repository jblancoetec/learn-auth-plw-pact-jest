import { StateSignInUserResult } from "../types";

export class UserOrPasswordIncorrect extends Error {
  constructor(public reason: StateSignInUserResult = "not-accepted") {
    super("User or password incorrect");
    Object.setPrototypeOf(this, UserOrPasswordIncorrect.prototype);
  }
}
