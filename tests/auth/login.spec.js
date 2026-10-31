import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Inicio de sesión', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('no crea sesión para un usuario inválido', async ({ page }) => {
    test.fail(
      true,
      'OBS-LOGIN-01: ParaBank redirige a overview con un nombre de usuario aleatorio.'
    );

    const invalidUsername = `usuario_invalido_${Date.now()}`;
    await loginPage.login(invalidUsername, 'clave_de_prueba');

    await expect(page).not.toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
  });

  test('rechaza una contraseña incorrecta', async ({ page }) => {
    test.skip(
      !process.env.PARABANK_USERNAME,
      'Configura PARABANK_USERNAME en .env para probar una contraseña incorrecta.'
    );

    const incorrectPassword = `${process.env.PARABANK_PASSWORD || ''}_incorrecta`;
    await loginPage.login(process.env.PARABANK_USERNAME, incorrectPassword);

    await expect(page).not.toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
  });

  test('permite iniciar sesión con credenciales configuradas', async ({ page }) => {
    test.skip(
      !process.env.PARABANK_USERNAME || !process.env.PARABANK_PASSWORD,
      'Configura PARABANK_USERNAME y PARABANK_PASSWORD en .env para ejecutar este caso.'
    );

    await loginPage.login(process.env.PARABANK_USERNAME, process.env.PARABANK_PASSWORD);

    await expect(page).toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  });
});
