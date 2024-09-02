import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { signUpUserIfRequestIsValid } from "..";
import { cleanDB, initDB } from "./utils";

describe("Como usuario, deseo registrarme en la aplicación para poder acceder a los servicios", () => {
  test("Si la petición es válida, entonces se debe registrar el usuario", async () => {
    const req = {
      name: "John",
      lastname: "Doe",
      email: "jdoe@test.com",
      password: "passtotest",
      confirm: "passtotest",
    };
    const result = await signUpUserIfRequestIsValid(req);
    expect(result.message).toBe("Usuario registrado correctamente");
    expect(result.status).toBe(201);
  });

  beforeAll(async () => {
    await initDB();
  });

  afterAll(async () => {
    await cleanDB();
  });
});