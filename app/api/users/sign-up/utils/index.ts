import type { StateSignUpUserResult } from "../controller";

export const statusCode = new Map<StateSignUpUserResult, number>();
statusCode.set("enrolled", 201);
statusCode.set("parsed", 202);
statusCode.set("not-parsed", 400);
statusCode.set("not-enrolled", 500);
