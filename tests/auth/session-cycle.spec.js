import { test, expect } from '../fixtures.js';
import { LoginPage } from '../../pages/LoginPage.js';

test('AUTH-SES-01: vuelve a entrar después de cerrar sesión',
  async ({ loggedInPage: page, credentials }) => {
    const login = new LoginPage(page);

    await test.step('Cerrar sesión', async () => {
      await page.getByRole('link', {
        name: 'Log Out',
        exact: true,
      }).click();

      await expect(login.usernameInput).toBeVisible();
      await expect(login.passwordInput).toBeVisible();

      await expect(page.getByRole('link', {
        name: 'Log Out',
        exact: true,
      })).toHaveCount(0);
    });

    await test.step('Volver a entrar', async () => {
      await login.login(
        credentials.username,
        credentials.password,
      );

      await expect(page).toHaveURL(/overview\.htm/);
      await expect(login.successMessage).toBeVisible();
    });
  });