import { test, expect } from '../fixtures.js';

test.describe.configure({ retries: 0 });

test('TRANSFER-01: formulario disponible para el cliente autenticado', async ({ transferPage }) => {
  await expect(transferPage.amount).toBeVisible();
  await expect(transferPage.fromAccount.locator('option').first()).toBeAttached();
  await expect(transferPage.toAccount.locator('option').first()).toBeAttached();
  await expect(transferPage.submitButton).toBeVisible();
});

test.describe('Transferencias con movimiento de saldo', () => {
  test.skip(process.env.RUN_BANK_MUTATIONS !== 'true', 'Activar solo con cuentas dedicadas.');
test('CP-06: transfiere entre dos cuentas de prueba configuradas', async ({ transferPage }) => {
  const from = process.env.PARABANK_FROM_ACCOUNT;
  const to = process.env.PARABANK_TO_ACCOUNT;
  if (!from || !to || from === to) throw new Error('Configura dos cuentas de prueba distintas.');
  test.info().annotations.push({ type: 'operación', description: 'Transferencia de USD 1.00; no reintentar automáticamente.' });
  await transferPage.fill({ amount: '1.00', from, to });
  await transferPage.submit();
  await expect(transferPage.confirmation).toBeVisible();
  await expect(transferPage.resultAmount).toHaveText('$1.00');
  await expect(transferPage.resultFrom).toHaveText(from);
  await expect(transferPage.resultTo).toHaveText(to);
});

});
