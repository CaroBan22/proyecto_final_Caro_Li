import { test, expect } from './fixture.js';

test.describe('Autenticación', () => {
  test('no crea sesión para un usuario inválido', async ({ page, loginPage }) => {
    test.fail(
      true,
      'OBS-LOGIN-01: ParaBank redirige a overview con un nombre de usuario aleatorio.'
    );

    const invalidUsername = `usuario_invalido_${Date.now()}`;
    await loginPage.login(invalidUsername, 'clave_de_prueba');

    await expect(page).not.toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
    await expect(loginPage.errorMessage).toContainText(
      /The username and password could not be verified/i
    );
  });

  test('rechaza una contraseña incorrecta', async ({
    page,
    loginPage,
    parabankCredentials,
  }) => {
    test.skip(
      !parabankCredentials.username,
      'Configura PARABANK_USERNAME en .env para probar una contraseña incorrecta.'
    );

    const incorrectPassword = `${parabankCredentials.password || ''}_incorrecta`;
    await loginPage.login(parabankCredentials.username, incorrectPassword);

    await expect(page).not.toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Log Out' })).toHaveCount(0);
    await expect(loginPage.errorMessage).toContainText(
      /The username and password could not be verified/i
    );
  });

  test('permite iniciar sesión con credenciales configuradas', async ({
    page,
    loginPage,
    parabankCredentials,
  }) => {
    test.skip(
      !parabankCredentials.username || !parabankCredentials.password,
      'Configura PARABANK_USERNAME y PARABANK_PASSWORD en .env para ejecutar este caso.'
    );

    await loginPage.login(parabankCredentials.username, parabankCredentials.password);

    await expect(page).toHaveURL(/overview\.htm/);
    await expect(page.getByRole('link', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  });
});
