import { test, expect } from "@playwright/test";

test.describe("Como usuario, quiero ingresar al sistema para poder operar con él", () => {
  test.beforeEach(({ page }) => page.goto("/users/sign-in"));

  test("Con una cuenta valida, el sistema me redirige al home ", async ({
    page,
  }) => {
    await page.route("*/**/api/users/sign-in", async (route) => {
      await route.fulfill({ status: 202 });
    });
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("jdoe@gmail.com");
    await page.getByPlaceholder("Contraseña", { exact: true }).click();
    await page.getByPlaceholder("Contraseña", { exact: true }).fill("123");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000");
  });
});
