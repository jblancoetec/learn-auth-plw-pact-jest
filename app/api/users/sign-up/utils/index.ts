import { StateCreateResult } from "../controller/types";

export const statusCode = new Map<StateCreateResult, number>();
statusCode.set("created", 201);
statusCode.set("parsed", 202);
statusCode.set("not-parsed", 400);
statusCode.set("not-created", 500);
