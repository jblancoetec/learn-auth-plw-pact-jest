import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { signUpUser } from "../signUpUser";
import { cleanDB, initDB } from "@/app/tests/utils";

describe("Como usuario, deseo registrarme en la aplicación para poder acceder a los servicios", () => {
  test("Si la petición es válida, entonces se debe registrar el usuario", async () => {
    const req = {
      name: "Juan",
      lastname: "Perez",
      email: "jperez@test.com",
      password: "passtotest",
      confirm: "passtotest",
    };
    const result = await signUpUser(req);
    expect(result.status).toBe(201);
  });

  beforeAll(async () => {
    await initDB();
  });

  afterAll(async () => {
    await cleanDB();
  });
});
