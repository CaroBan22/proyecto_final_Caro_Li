// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  testMatch: [
    '**/parabank-*.spec.js',
    '**/auth/*.spec.js',
    '**/registration/*.spec.js',
    '**/accounts/*.spec.js',
    '**/transfers/*.spec.js',
  ],

  fullyParallel: !process.env.CI,
  forbidOnly: !!process.env.CI,

  // Evitar repetir operaciones bancarias.
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  maxFailures: process.env.CI ? 1 : 0,

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],
    ['json', {
      outputFile: 'results.json',
    }],
    ['allure-playwright', {
      resultsDir: 'allure-results',
    }],
  ],

  use: {
    baseURL:
      process.env.BASE_URL ||
      'https://parabank.parasoft.com/parabank/',

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});