import { test, expect } from '../fixtures.js';

test.describe('Autenticación', () => {
  test('no crea sesión para un usuario inválido', async ({
    page,
    loginPage,
    credentials,
  }) => {
    test.fail(
      true,
      'OBS-LOGIN-01: ParaBank redirige a overview con un nombre de usuario aleatorio.'
    );

    const invalidUsername = `usuario_invalido_${Date.now()}`;
    const password = credentials.password || 'clave_de_prueba';
    await loginPage.login(invalidUsername, password);

    await expect(page).not.toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
    await expect(loginPage.errorMessage).toContainText(
      /The username and password could not be verified/i
    );
  });

  test('rechaza una contraseña incorrecta', async ({
    page,
    loginPage,
    credentials,
  }) => {
    test.skip(
      !credentials.username,
      'Configura PARABANK_USERNAME en .env para probar una contraseña incorrecta.'
    );

    const incorrectPassword = `${credentials.password || ''}_incorrecta`;
    await loginPage.login(credentials.username, incorrectPassword);

    await expect(page).not.toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
    await expect(loginPage.errorMessage).toContainText(
      /The username and password could not be verified/i
    );
  });

  test('permite iniciar sesión con credenciales configuradas', async ({
    page,
    loginPage,
    credentials,
  }) => {
    test.skip(
      !credentials.username || !credentials.password,
      'Configura PARABANK_USERNAME y PARABANK_PASSWORD en .env para ejecutar este caso.'
    );

    await loginPage.login(credentials.username, credentials.password);

    await expect(page).toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  });
});
