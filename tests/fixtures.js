import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

import { AccountsPage } from '../pages/AccountsPage.js';
import { AccountDetailsPage } from '../pages/AccountDetailsPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { TransferPage } from '../pages/TransferPage.js';

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

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
  accountsPage: async ({ loggedInPage }, use) => {
    await use(new AccountsPage(loggedInPage));
  },
  accountDetailsPage: async ({ loggedInPage }, use) => {
    await use(new AccountDetailsPage(loggedInPage));
  },
  transferPage: async ({ loggedInPage }, use) => {
    const transferPage = new TransferPage(loggedInPage);
    await transferPage.goto();
    await use(transferPage);
  },
  bankStorageState: [async ({ browser }, use) => {
    if (!process.env.PARABANK_USERNAME || !process.env.PARABANK_PASSWORD) {
      throw new Error('Configura PARABANK_USERNAME y PARABANK_PASSWORD.');
    }
    const context = await browser.newContext({ baseURL: process.env.BASE_URL || 'https://parabank.parasoft.com/parabank/' });
    try {
      const page = await context.newPage();
      const login = new LoginPage(page);
      await login.goto();
      await login.login(process.env.PARABANK_USERNAME, process.env.PARABANK_PASSWORD);
      await expect(page).toHaveURL(/overview\.htm/);
      await expect(login.successMessage).toBeVisible();
      await use(await context.storageState());
    } finally { await context.close(); }
  }, { scope: 'worker' }],
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