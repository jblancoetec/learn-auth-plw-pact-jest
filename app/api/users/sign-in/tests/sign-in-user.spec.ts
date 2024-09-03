import { test, expect } from "@playwright/test";
import { initDB, cleanDB } from "@/app/tests/utils";

test.describe("Como usuario, deseo ingresar al sistema mediante mi correo y mi contraseña, para poder operar con el mismo", () => {
  test("Si la api recibe usuario y contraseña validos, devuelve status code 202", async ({
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

  test("Si la api recibe usuario y contraseña validos, devuelve el mensaje 'Usuario correctamente autenticado'", async ({
    request,
  }) => {
    const response = await request.post("/api/users/sign-in", {
      data: {
        email: "jdoe@test.com",
        password: "passtesting",
      },
    });
    const data = await response.json();
    expect(data.message).toBe("Usuario correctamente autenticado");
  });

  test.beforeAll(async () => {
    await initDB();
  });

  test.afterAll(async () => {
    await cleanDB();
  });
});
