import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  credentials: async ({}, use) => {
    await use({
      username: process.env.PARABANK_USERNAME,
      password: process.env.PARABANK_PASSWORD,
    });
  },

  loggedInPage: async ({ page, loginPage, credentials }, use) => {
    if (!credentials.username || !credentials.password) {
      throw new Error(
        'Configura PARABANK_USERNAME y PARABANK_PASSWORD en .env.'
      );
    }

    await loginPage.login(credentials.username, credentials.password);
    await expect(page).toHaveURL(/overview\.htm/);
    await expect(loginPage.successMessage).toBeVisible();

    await use(page);
  },
});

export { expect };