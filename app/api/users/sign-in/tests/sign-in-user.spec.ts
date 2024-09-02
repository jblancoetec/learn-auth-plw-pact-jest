import { test, expect } from "@playwright/test";
import { initDB, cleanDB } from "./utils";

test.describe("Como usuario, deseo ingresar al sistema mediante mi correo y mi contraseña, para poder operar con el mismo", () => {
  test("Si la api recibe usuario y contraseña validos, la respuesta esperada es un status 202", async ({
    request,
  }) => {
    const response = await request.post("/api/users/sign-in", {
      data: {
        email: "jdoe@test.com",
        password: "passtesting",
      },
    });
    expect(response.status()).toBe(202);
  });

  test.beforeAll(() => {
    initDB();
  });

  test.afterAll(() => {
    cleanDB();
  });
});
