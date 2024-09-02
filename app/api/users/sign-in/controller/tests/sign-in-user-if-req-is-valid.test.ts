import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { signInUserIfRequestIsValid } from "..";
import { initDB, cleanDB } from "./utils";

describe("Como usuario, deseo ingresar al sistema mediante mi correo y mi contraseña, para poder operar con el mismo", () => {
  test("Dado un correo y una contraseña válidos, se debe devolver un token de acceso", async () => {
    const result = await signInUserIfRequestIsValid({
      email: "jdoe@test.com",
      password: "passtesting",
    });
    expect(result.token).toBeDefined();
    expect(result.status).toBe(202);
    expect(result.message).toBe("Usuario autenticado correctamente");
  });

  test("Dado un una contraseña invalida, no se debe devolver un token de acceso", async () => {
    const result = await signInUserIfRequestIsValid({
      email: "jdoe@test.com",
      password: "passwrong",
    });
    expect(result.token).not.toBeDefined();
    expect(result.status).toBe(401);
    expect(result.message).toBe("Usuario o contraseña incorrectos");
  });

  beforeAll(async () => {
    await initDB();
  });

  afterAll(async () => {
    await cleanDB();
  });
});
