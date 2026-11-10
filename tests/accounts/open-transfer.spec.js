import { test, expect } from '../fixtures.js';
import { OpenAccountPage } from '../../pages/OpenAccountPage.js';
import { TransferPage } from '../../pages/TransferPage.js';
import { LoginPage } from '../../pages/LoginPage.js';
import bankFlowData from '../../test-data/bank-flow-data.json';

function cents(text) {
  const value = Number(text.replace(/[$,\s]/g, ''));
  if (!Number.isFinite(value)) throw new Error(`Saldo inválido: ${text}`);
  return Math.round(value * 100);
}

async function balance(page, id) {
  await page.goto('./overview.htm');
  const row = page.locator('#accountTable tbody tr').filter({
    has: page.getByRole('link', { name: id, exact: true }),
  });
  await expect(row).toHaveCount(1);
  const cell = row.locator('td').nth(1);
  await expect(cell).toContainText('$');
  return cents(await cell.innerText());
}

test.describe('Apertura y transferencia con saldo', () => {
  test.describe.configure({ retries: 0 });
  test.skip(process.env.RUN_OPEN_ACCOUNT_FLOW !== 'true', 'Activar solo para la ejecución dedicada de apertura y transferencia.');

  for (const scenario of bankFlowData) {
    test(`${scenario.id}: ${scenario.description} y transfiere USD ${scenario.transferAmount} con conciliación`, async ({ loggedInPage: page, credentials }, testInfo) => {
      test.setTimeout(90000);
      const from = process.env.PARABANK_FROM_ACCOUNT;
      if (!from) throw new Error('Configura PARABANK_FROM_ACCOUNT con una cuenta del usuario actual.');
      const amountCents = cents(scenario.transferAmount);
      expect(amountCents, 'Importe positivo de transferencia').toBeGreaterThan(0);
      const initial = await balance(page, from);
      const opening = new OpenAccountPage(page);
      await opening.goto();
      const instruction = await page.locator('#rightPanel').innerText();
      const minimum = instruction.match(/minimum of\s*\$([\d,.]+)/i);
      if (!minimum) throw new Error('No se pudo identificar el depósito mínimo de apertura.');
      const deposit = cents(minimum[1]);
      expect(initial, 'Saldo para depósito de apertura y transferencia configurada').toBeGreaterThanOrEqual(deposit + amountCents);
      await opening.open(from, scenario.accountType);
      await expect(opening.confirmation).toBeVisible();
      await expect(opening.newAccountId).toHaveText(/^\d+$/);
      const to = (await opening.newAccountId.innerText()).trim();
      expect(to).not.toBe(from);
      testInfo.annotations.push({ type: 'cuenta-creada', description: to });

      await expect.poll(() => balance(page, from)).toBe(initial - deposit);
      await expect.poll(() => balance(page, to)).toBe(deposit);
      const transfer = new TransferPage(page);
      await transfer.goto();
      await transfer.fill({ amount: scenario.transferAmount, from, to });
      await transfer.submit();
      await expect(transfer.confirmation).toBeVisible();
      await expect(transfer.resultAmount).toHaveText(`$${scenario.transferAmount}`);
      await expect(transfer.resultFrom).toHaveText(from);
      await expect(transfer.resultTo).toHaveText(to);
      await expect.poll(() => balance(page, from)).toBe(initial - deposit - amountCents);
      await expect.poll(() => balance(page, to)).toBe(deposit + amountCents);
      await test.step('Cerrar sesión y volver a entrar para comprobar persistencia', async () => {
        await page.getByRole('link', { name: 'Log Out', exact: true }).click();
        const login = new LoginPage(page);
        await expect(page.getByRole('heading', { name: 'Customer Login', exact: true })).toBeVisible();
        await expect(login.usernameInput).toBeVisible();
        await expect(login.passwordInput).toBeVisible();
        await expect(page.getByRole('link', { name: 'Log Out', exact: true })).toHaveCount(0);
        await login.login(credentials.username, credentials.password);
        await expect(page).toHaveURL(/overview\.htm/);
        await expect(login.successMessage).toBeVisible();
        await expect.poll(() => balance(page, from)).toBe(initial - deposit - amountCents);
        await expect.poll(() => balance(page, to)).toBe(deposit + amountCents);
      });
      await testInfo.attach('conciliacion', {
        body: JSON.stringify({ scenarioId: scenario.id, accountType: scenario.accountType, from, to, initialCents: initial, openingDepositCents: deposit, transferCents: amountCents, finalFromCents: initial - deposit - amountCents, finalToCents: deposit + amountCents }, null, 2),
        contentType: 'application/json',
      });
    });
  }
});
