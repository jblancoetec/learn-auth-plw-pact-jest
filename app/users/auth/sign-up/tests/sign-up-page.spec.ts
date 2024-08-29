import { test, expect } from "@playwright/test";

test.describe("Como usuario, quiero incribirme en el sistema para obtener una cuenta particular", () => {
  test("Si se rellenan adecuadamente, todos los campos requeridos, el sistema me redirige a sing-in", async ({
    page,
  }) => {
    await page.route("*/**/api/auth/sign-up", async (route) => {
      await route.fulfill({ status: 201 });
    });
    await page.goto("http://localhost:3000/auth/sign-up");
    await page.getByPlaceholder("Nombre").click();
    await page.getByPlaceholder("Nombre").fill("Jhon");
    await page.getByPlaceholder("Apellido").click();
    await page.getByPlaceholder("Apellido").fill("Doe");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("jdoe@gmail.com");
    await page.getByPlaceholder("Contraseña", { exact: true }).click();
    await page.getByPlaceholder("Contraseña", { exact: true }).fill("123");
    await page.getByPlaceholder("Repetir contraseña").click();
    await page.getByPlaceholder("Repetir contraseña").fill("123");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000/auth/sign-in");
  });

  test("Exponer alerta en caso de que la contraseña y su confirmación no coincidan", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/auth/sign-up");
    const alert = page.getByText("Las contraseñas no coinciden");
    await expect(alert).not.toBeVisible();
    await page.getByPlaceholder("Contraseña", { exact: true }).click();
    await page.getByPlaceholder("Contraseña", { exact: true }).fill("123");
    await page.getByPlaceholder("Repetir contraseña").click();
    await page.getByPlaceholder("Repetir contraseña").fill("1234");
    await expect(alert).toBeVisible();
  });
});
