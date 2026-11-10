import { test, expect } from './fixture.js';

test('AUTH-OUT-01: cierra sesión y muestra el formulario de acceso', async ({
  loggedInPage,
}) => {
  await loggedInPage.getByRole('link', { name: 'Log Out' }).click();

  await expect(
    loggedInPage.getByRole('button', { name: 'Log In' })
  ).toBeVisible();

  await expect(
    loggedInPage.getByRole('link', { name: 'Log Out' })
  ).toHaveCount(0);

  await expect(loggedInPage).not.toHaveURL(/overview\.htm/);
});