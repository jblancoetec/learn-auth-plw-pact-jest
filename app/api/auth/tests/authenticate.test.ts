import { cleanDB, initDB } from "@/app/tests/utils";
import { test, expect, beforeAll, afterAll } from "bun:test";
import { authenticate } from "../authenticate";
import { UnauthorizedError } from "../../errors";

beforeAll(async () => {
  await initDB();
});

afterAll(async () => {
  await cleanDB();
});

test("Dada una contraseña invalida, se espera la excepción UnauthorizeError ", async () => {
  expect(
    async () =>
      await authenticate({ email: "jdoe@test.com", password: "invalid" }),
  ).toThrowError(UnauthorizedError);
});
