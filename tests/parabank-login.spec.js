import { test, expect } from '@playwright/test';

test('muestra los campos de usuario y contraseña y el botón de inicio de sesión', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/');

  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});
test('muestra el enlace de registro', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/');

  await expect(
    page.getByRole('link', { name: 'Register' })
  ).toBeVisible();
});
test('muestra un error al iniciar sesión con credenciales incorrectas', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/');

  await page.locator('input[name="username"]').fill('usuario_invalido');
  await page.locator('input[name="password"]').fill('clave_invalida');
  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('#rightPanel')).toContainText(
    'The username and password could not be verified'
  );
});

test('muestra un mensaje si se inicia sesión con campos vacíos', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/');

  await page.getByRole('button', { name: 'Log In' }).click();

  await expect(page.locator('#rightPanel')).toContainText(
    'Please enter a username and password.'
  );
});

test('abre el formulario de registro', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/');

  await page.getByRole('link', { name: 'Register' }).click();

  await expect(page.locator('input[name="customer.firstName"]')).toBeVisible();
  await expect(page.locator('input[name="customer.lastName"]')).toBeVisible();
});
