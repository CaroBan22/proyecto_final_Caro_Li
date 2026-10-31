import { test, expect } from '@playwright/test';

test.describe('Formulario de acceso y registro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('muestra los campos de usuario y contraseña y el botón de inicio de sesión', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

  test('muestra el enlace de registro', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Register' })).toBeVisible();
  });

  test('abre el formulario de registro', async ({ page }) => {
    await page.getByRole('link', { name: 'Register' }).click();

    await expect(page.locator('input[name="customer.firstName"]')).toBeVisible();
    await expect(page.locator('input[name="customer.lastName"]')).toBeVisible();
  });
});
