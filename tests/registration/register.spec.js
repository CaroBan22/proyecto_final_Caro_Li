import { test, expect } from '../fixtures.js';
import cases from '../../test-data/register-data.json';

test('REG-01: el registro vacío identifica los campos obligatorios', async ({ registerPage }) => {
  await registerPage.submit();
  for (const { field, error } of cases) {
    await expect(registerPage.page.locator(`[id="${field}.errors"]`)).toHaveText(error);
  }
  await expect(registerPage.field('customer.username')).toBeVisible();
});
