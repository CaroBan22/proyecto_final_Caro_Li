import { test, expect } from '../fixtures.js';

test.describe('Esperas condicionales en cuentas', () => {
  test('CP-ESPERA-04: espera la respuesta del servicio y muestra sus cuentas', async ({ accountsPage, loggedInPage: page }) => {
    // Terminar la carga del login antes de observar una nueva navegación.
    await expect(accountsPage.accountLinks.first()).toBeVisible();
    // Registrar antes de navegar evita perder una respuesta rápida.
    const pendingResponse = page.waitForResponse(response => {
      const url = new URL(response.url());
      return url.origin === new URL(page.url()).origin
        && /^\/parabank\/services_proxy\/bank\/customers\/\d+\/accounts$/.test(url.pathname)
        && response.request().method() === 'GET';
    });
    await accountsPage.goto();
    const response = await pendingResponse;
    expect(response.status(), 'Respuesta del servicio de cuentas').toBe(200);
    const accounts = await response.json();
    expect(Array.isArray(accounts), 'El servicio devuelve una lista').toBe(true);
    expect(accounts.length, 'La cuenta de prueba debe tener cuentas bancarias').toBeGreaterThan(0);
    const expectedIds = accounts.map(account => String(account.id)).sort();
    await expect.poll(async () => (await accountsPage.accountLinks.allTextContents()).map(id => id.trim()).sort()).toEqual(expectedIds);
  });

  test('CP-ESPERA-01: espera una lista de cuentas cargada mediante expect.poll', async ({ accountsPage }) => {
    await expect(accountsPage.heading).toBeVisible();
    await expect.poll(() => accountsPage.accountLinks.count()).toBeGreaterThan(0);
    await expect(accountsPage.accountLinks.first()).toHaveText(/^\d+$/);
  });

  test('CP-ESPERA-02: espera datos coherentes de cuenta mediante toPass', async ({ accountsPage, accountDetailsPage }) => {
    await expect(accountsPage.accountLinks.first()).toBeVisible();
    const id = (await accountsPage.accountLinks.first().innerText()).trim();
    const row = accountsPage.table.locator('tbody tr').filter({
      has: accountsPage.page.getByRole('link', { name: id, exact: true }),
    });
    const summaryBalance = row.locator('td').nth(1);
    // La sincronización comprueba formato y coherencia; no impone saldo positivo.
    await expect(summaryBalance).toHaveText(/^-?\$[\d,]+\.\d{2}$/);
    const expectedBalance = (await summaryBalance.innerText()).trim();
    await accountsPage.openAccount(id);
    // Solo se reintentan lecturas: nunca repetir un envío transaccional dentro de toPass.
    await expect(async () => {
      await expect(accountDetailsPage.heading).toBeVisible();
      await expect(accountDetailsPage.accountId).toHaveText(id);
      await expect(accountDetailsPage.balance).toHaveText(expectedBalance);
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
