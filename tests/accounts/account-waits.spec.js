import { test, expect } from '../fixtures.js';

test.describe('Esperas condicionales en cuentas', () => {
  test('CP-ESPERA-01: espera una lista de cuentas cargada mediante expect.poll', async ({ accountsPage }) => {
    await expect(accountsPage.heading).toBeVisible();
    await expect.poll(() => accountsPage.accountLinks.count()).toBeGreaterThan(0);
    await expect(accountsPage.accountLinks.first()).toHaveText(/^\d+$/);
  });

  test('CP-ESPERA-02: espera datos coherentes de cuenta mediante toPass', async ({ accountsPage, accountDetailsPage }) => {
    await expect(accountsPage.accountLinks.first()).toBeVisible();
    const id = (await accountsPage.accountLinks.first().innerText()).trim();
    await accountsPage.openAccount(id);
    // Solo se reintentan lecturas: nunca repetir un envío transaccional dentro de toPass.
    await expect(async () => {
      await expect(accountDetailsPage.heading).toBeVisible();
      await expect(accountDetailsPage.accountId).toHaveText(id);
      await expect(accountDetailsPage.balance).toHaveText(/^\$[\d,]+\.\d{2}$/);
    }).toPass({ timeout: 10000 });
  });

  test('CP-ESPERA-03: abrir una cuenta espera la URL y su contenido', async ({ accountsPage, accountDetailsPage, loggedInPage: page }) => {
    await expect(accountsPage.accountLinks.first()).toBeVisible();
    const id = (await accountsPage.accountLinks.first().innerText()).trim();
    const destination = page.waitForURL(url => url.pathname.endsWith('/activity.htm') && url.searchParams.get('id') === id);
    await accountsPage.openAccount(id);
    await destination;
    await expect(accountDetailsPage.accountId).toHaveText(id);
    await expect(accountDetailsPage.heading).toBeVisible();
  });
});
