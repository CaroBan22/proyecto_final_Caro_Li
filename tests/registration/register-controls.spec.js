import { test, expect } from '../fixtures.js';
import controls from '../../test-data/register-controls.json';

test.describe('Validaciones intermedias del registro', () => {
  for (const { id, name, field, value, error } of controls) {
    test(`${id}: ${name}`, async ({ registerPage }) => {
      const page = registerPage.page;
      const fieldError = page.locator(`[id="${field}.errors"]`);
      const lastNameError = page.locator('[id="customer.lastName.errors"]');
      await registerPage.submit();
      await expect(fieldError).toHaveText(error);
      await expect(lastNameError).toHaveText('Last name is required.');

      await registerPage.field(field).fill(value);
      // El apellido, la contraseña y otros campos obligatorios permanecen vacíos:
      // no se completa un alta de cliente en ninguna de las dos solicitudes.
      await registerPage.submit();
      await expect(fieldError).toHaveCount(0);
      await expect(lastNameError).toHaveText('Last name is required.');
      await expect(registerPage.field(field)).toHaveValue(value);
      await expect(page.getByRole('link', { name: 'Log Out', exact: true })).toHaveCount(0);
    });
  }
});
