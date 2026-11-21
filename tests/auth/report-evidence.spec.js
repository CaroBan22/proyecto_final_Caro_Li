import { test, expect } from '../fixtures.js';

test('REP-01: documenta el acceso al registro con evidencia por etapa',
  async ({ loginPage, page }, testInfo) => {
    await test.step('Mostrar el formulario de acceso', async () => {
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();

      await testInfo.attach('formulario-acceso', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });

    await test.step('Abrir el formulario de registro', async () => {
      await page.getByRole('link', {
        name: 'Register',
        exact: true,
      }).click();

      await expect(page).toHaveURL(/register\.htm/);
      await expect(
        page.locator('input[name="customer.firstName"]'),
      ).toBeVisible();

      await testInfo.attach('formulario-registro', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    });
  });
