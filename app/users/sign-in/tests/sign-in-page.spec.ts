import { test, expect } from "@playwright/test";

test.describe("Como usuario, quiero ingresar al sistema para poder operar con él", () => {
  test.beforeEach(({ page }) => page.goto("/users/sign-in"));

  test("Tras recibir un status code 202, el sistema me redirige al home", async ({
    page,
  }) => {
    await page.route("*/**/api/users/sign-in", async (route) => {
      await route.fulfill({ status: 202 });
    });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("jdoe@test.com");
    await page.getByPlaceholder("Contraseña", { exact: true }).click();
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill("passtesting");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000");
  });

  test("Los datos enviados desde el form al server, son correctos", async ({
    page,
  }) => {
    await page.route("*/**/api/users/sign-in", async (route, request) => {
      const data = request.postDataJSON();
      const ok =
        data.email === "jdoe@test.com" && data.password === "passtesting";
      await route.fulfill({ status: ok ? 202 : 401 });
    });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("jdoe@test.com");
    await page.getByPlaceholder("Contraseña", { exact: true }).click();
    await page
      .getByPlaceholder("Contraseña", { exact: true })
      .fill("passtesting");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000");
  });
});
