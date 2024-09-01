import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import { signInUserIfRequestIsValid } from "../controller";
import { initDB, cleanDB } from "./utils";

describe("Como usuario, deseo ingresar al sistema mediante mi correo y mi contraseña, para poder operar con el mismo", () => {
  test("Dado un correo y una contraseña válidos, se debe devolver un token de acceso", async () => {
    const result = await signInUserIfRequestIsValid({
      email: "jdoe@test.com",
      password: "passtesting",
    });
    expect(result.token).toBeDefined();
    expect(result.state).toBe("accepted");
    expect(result.message).toBe("User accepted");
  });

  test("Dado un una contraseña invalida, no se debe devolver un token de acceso", async () => {
    const result = await signInUserIfRequestIsValid({
      email: "jdoe@test.com",
      password: "passwrong",
    });
    expect(result.token).not.toBeDefined();
    expect(result.state).toBe("not-accepted");
    expect(result.message).toBe("User or password incorrect");
  });

  beforeAll(async () => {
    await initDB();
  });

  afterAll(async () => {
    await cleanDB();
  });
});
