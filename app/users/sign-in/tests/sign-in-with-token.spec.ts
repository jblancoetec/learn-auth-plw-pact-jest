import { cleanDB, initDB } from "@/app/tests/utils";
import { test, expect } from "@playwright/test";

test.describe("Como usuario, quiero ingresar al sistema para poder operar con él", () => {
  test.beforeAll(async () => {
    await initDB();
  });

  test.afterAll(async () => {
    await cleanDB();
  });

  test.beforeEach(({ page }) => page.goto("/users/sign-in"));

  test.skip("Con una cuenta valida, el sistema me redirige al home ", async ({
    page,
  }) => {
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
