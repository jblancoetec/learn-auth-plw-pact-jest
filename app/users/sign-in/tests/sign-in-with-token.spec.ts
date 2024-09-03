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

  test("Con una cuenta valida, el sistema me redirige al home ", async ({
    page,
  }) => {
    await page.getByPlaceholder("Email").fill("jdoe@test.com");
    await page.getByPlaceholder("Contraseña").fill("passtesting");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page).toHaveURL("http://localhost:3000");
  });

  test.skip('Con una cuenta invalida, el sistema debe mostrar el mensaje ""', async ({
    page,
  }) => {
    await page.goto("http://localhost:3001/users/sign-in");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill("jperez@test.com");
    await page.getByPlaceholder("Contraseña").click();
    await page.getByPlaceholder("Contraseña").fill("passwrong");
    await page.getByRole("button", { name: "continuar" }).click();
    await expect(page.getByText("Parece que no hay internet")).toBeVisible();
  });
});
