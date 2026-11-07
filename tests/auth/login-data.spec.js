import { test, expect } from './fixture.js';
import dataLogin from '../../test-data/data-login.json';

test.describe('Validación de campos obligatorios', () => {
  for (const { id, name, username, password, error } of dataLogin) {
    test(`${id}: ${name}`, async ({ page, loginPage }) => {
      await loginPage.login(username, password);

      await expect(loginPage.errorMessage).toHaveText(error);
      await expect(
        page.getByRole('link', { name: 'Log Out' })
      ).toHaveCount(0);
      await expect(page).not.toHaveURL(/overview\.htm/);
    });
  }
});