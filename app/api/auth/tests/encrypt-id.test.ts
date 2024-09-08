import { test, expect } from "bun:test";
import { encryptID } from "../utils";

test("Dada un id determinado, se debe generar un token", async () => {
  const token = await encryptID("id");
  expect(token).toBeDefined();
});
