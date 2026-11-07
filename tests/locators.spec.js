import { test, expect } from '@playwright/test';

test('mapeo de elementos', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/locators');

  const button = page.getByRole('button', { name: 'Add Item' });
  await expect(button).toBeVisible();

  const contactLink = page.getByRole('link', { name: 'Contact' });
  await expect(contactLink).toBeVisible();

  const byText = page.getByText('Locators Test page for Automation Testing', {
    exact: true,
  });
  await expect(byText).toBeVisible();

  const hotDeal = page.getByText('Hot Deal');
  await expect(hotDeal).toBeVisible();

  const byLabel = page.getByLabel('Choose a country');
  await expect(byLabel).toBeVisible();

  const byPlaceholder = page.getByPlaceholder('Search the site');
  await expect(byPlaceholder).toBeVisible();

  const byAltText = page.getByAltText('User avatar');
  await expect(byAltText).toBeVisible();

  const byTitle = page.getByTitle('Refresh content');
  await expect(byTitle).toBeVisible();
});
