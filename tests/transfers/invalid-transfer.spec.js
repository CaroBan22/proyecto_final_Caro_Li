import { test, expect } from '../fixtures.js';
import cases from '../../test-data/invalid-transfers.json';
import { TransferPage } from '../../pages/TransferPage.js';

async function snapshot(page, ids) {
  await page.goto('./overview.htm');
  await expect(page.locator('#accountTable tbody a').first()).toBeVisible();
  const balances = await page.locator('#accountTable tbody tr').allTextContents();
  const activity = {};
  for (const id of ids) {
    await page.goto(`./activity.htm?id=${encodeURIComponent(id)}`);
    await expect(page.locator('#accountId')).toHaveText(id);
    await expect(page.locator('#balance')).toContainText('$');
    // Esperar filas visibles o el estado vacío antes de leer el historial.
    await expect(page.locator('#transactionTable tbody tr').filter({ visible: true }).or(page.getByText('No transactions found.', { exact: true }).filter({ visible: true })).first()).toBeVisible();
    activity[id] = await page.locator('#transactionTable tbody tr').allTextContents();
  }
  return { balances: balances.map(row => row.trim()).sort(), activity };
}

test.describe('Rechazos de transferencia en el servidor', () => {
  test.describe.configure({ retries: 0 });
  test.skip(process.env.RUN_TRANSFER_NEGATIVE !== 'true', 'Activar solo con dos cuentas de prueba dedicadas.');

  for (const { id, name, amount } of cases) {
    test(`${id}: ${name}`, async ({ loggedInPage: page }, testInfo) => {
      test.setTimeout(90000);
      const from = process.env.PARABANK_FROM_ACCOUNT;
      const to = process.env.PARABANK_TO_ACCOUNT;
      if (!from || !to || from === to) throw new Error('Configura PARABANK_FROM_ACCOUNT y PARABANK_TO_ACCOUNT con dos cuentas distintas del usuario.');
      const before = await snapshot(page, [from, to]);
      const transfer = new TransferPage(page);
      await transfer.goto();
      await transfer.fill({ amount, from, to });
      const pending = page.waitForResponse(response => {
        const url = new URL(response.url());
        return url.origin === new URL(page.url()).origin
          && url.pathname.endsWith('/services_proxy/bank/transfer')
          && response.request().method() === 'POST'
          && url.searchParams.get('fromAccountId') === from
          && url.searchParams.get('toAccountId') === to;
      });
      await transfer.submit();
      const response = await pending;
      expect(response.status(), 'Rechazo del importe inválido').toBe(400);
      const error = await response.json();
      expect(error.detail).toContain('amount');
      await expect(transfer.confirmation).toBeHidden();
      await expect(page.locator('#showError')).toBeVisible();
      const after = await snapshot(page, [from, to]);
      expect(after, 'Saldos e historiales conservados').toEqual(before);
      await testInfo.attach('rechazo-transferencia', {
        body: JSON.stringify({ caseId: id, status: response.status(), detail: error.detail, before, after }, null, 2),
        contentType: 'application/json',
      });
    });
  }
});
