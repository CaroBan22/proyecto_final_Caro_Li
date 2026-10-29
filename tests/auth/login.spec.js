import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Inicio de sesión', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('rechaza credenciales incorrectas', async ({ page }) => {
    await loginPage.login('usuario_invalido', 'clave_invalida');

    await expect(loginPage.rightPanel).toContainText(
      'The username and password could not be verified'
    );
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
  });

  test('muestra el mensaje de validación con campos vacíos', async () => {
    await loginPage.login('', '');

    await expect(loginPage.rightPanel).toContainText(
      'Please enter a username and password.'
    );
  });

  test('permite iniciar sesión con credenciales configuradas', async ({ page }) => {
    test.skip(
      !process.env.PARABANK_USERNAME || !process.env.PARABANK_PASSWORD,
      'Configura PARABANK_USERNAME y PARABANK_PASSWORD en .env para ejecutar este caso.'
    );

    await loginPage.login(process.env.PARABANK_USERNAME, process.env.PARABANK_PASSWORD);

    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  });
});
