import { test, expect } from '@playwright/test';

// Ejercicio local: la demora varía y la espera fija puede resultar insuficiente.
// No usa ParaBank, credenciales ni operaciones bancarias.
test('FLAKY-DEMO: una pausa fija no garantiza que lleguen los datos', async ({ page }) => {
  await page.setContent('<p role="status">Cargando</p>');
  await page.evaluate(() => {
    setTimeout(() => { document.querySelector('[role="status"]').textContent = 'Listo'; }, 200 + Math.random() * 800);
  });
  await page.waitForTimeout(550);
  expect(await page.getByRole('status').textContent()).toBe('Listo');
});

test('CP-ESPERA-DEMO: esperar el estado reemplaza la pausa fija', async ({ page }) => {
  await page.setContent('<p role="status">Cargando</p>');
  await page.evaluate(() => {
    setTimeout(() => { document.querySelector('[role="status"]').textContent = 'Listo'; }, 200 + Math.random() * 800);
  });
  await expect(page.getByRole('status')).toHaveText('Listo');
});
