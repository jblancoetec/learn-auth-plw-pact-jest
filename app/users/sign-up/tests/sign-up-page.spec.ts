import { test, expect } from "@playwright/test";
import { initDB, cleanDB } from "@/app/tests/utils";

test.describe("Como usuario, quiero incribirme en el sistema para obtener una cuenta particular", () => {
  test.beforeAll(async () => {
    await initDB();
  });

  test.afterAll(async () => {
    await cleanDB();
  });

  test.beforeEach(async ({ page }) => await page.goto("/users/sign-up"));

  test("Si se rellenan adecuadamente todos los campos requeridos, el sistema me redirige a sing-in", async ({
    page,
  }) => {
    await page.route("*/**/api/users/sign-up", async (route) => {
      await route.fulfill({ status: 201 });
    });
    await page.getByPlaceholder("Nombre").fill("Juan");
    await page.getByPlaceholder("Apellido").fill("Perez");
    await page.getByPlaceholder("Email").fill("jdoe@test.com");
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill("passteing");
    await page.getByPlaceholder("Repetir contraseña").fill("passtesting");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000/users/sign-in");
  });

  test("Exponer alerta en caso de que la contraseña y su confirmación no coincidan", async ({
    page,
  }) => {
    const alert = page.getByText("Las contraseñas no coinciden");
    await expect(alert).not.toBeVisible();
    await page.getByPlaceholder("Contraseña", { exact: true }).fill("123");
    await page.getByPlaceholder("Repetir contraseña").fill("1234");
    await expect(alert).toBeVisible();
  });

  test("El servidor recibe efectivamente todos los datos enviado a traves del formulario", async ({
    page,
  }) => {
    await page.route("*/**/api/users/sign-up", async (route, request) => {
      const data = request.postDataJSON();
      const ok =
        data.name === "Juan" &&
        data.lastname === "Perez" &&
        data.email === "jperez@test.com" &&
        data.password === "passtesting" &&
        data.confirm === "passtesting";
      await route.fulfill({ status: ok ? 201 : 401 });
    });

    await page.getByPlaceholder("Nombre").fill("Juan");
    await page.getByPlaceholder("Apellido").fill("Perez");
    await page.getByPlaceholder("Email").fill("jperez@test.com");
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill("passtesting");
    await page.getByPlaceholder("Repetir contraseña").fill("passtesting");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000/users/sign-in");
  });
});
