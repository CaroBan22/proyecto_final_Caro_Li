import { test, expect } from '../fixtures.js';

test('CP-05: consulta una cuenta y sus detalles', async ({ accountsPage, accountDetailsPage }) => {
  await expect(accountsPage.heading).toBeVisible();
  await expect(accountsPage.accountLinks.first()).toBeVisible();
  const id = (await accountsPage.accountLinks.first().innerText()).trim();
  await accountsPage.openAccount(id);
  await expect(accountDetailsPage.heading).toBeVisible();
  await expect(accountDetailsPage.accountId).toHaveText(id);
  await expect(accountDetailsPage.balance).toContainText('$');
});

test('CUENTAS-02: consulta con sesión guardada, sin repetir login', async ({ savedSessionPage: page }) => {
  await page.goto('./overview.htm');
  await expect(page.getByRole('heading', { name: 'Accounts Overview', exact: true })).toBeVisible();
  await expect(page.locator('#accountTable tbody a').first()).toBeVisible();
});
