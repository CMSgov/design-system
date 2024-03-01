import { test, expect } from '@playwright/test';

const DOMAIN = 'http://localhost:8080';

test.describe('cdn-html-css', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/cdn-html-css`);
    await expect(page).toHaveScreenshot('cdn-html-css.png', { fullPage: true });
  });
});

test.describe('cdn-preact', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/cdn-preact`);
    await expect(page).toHaveScreenshot('cdn-preact.png', { fullPage: true });
  });
});

test.describe('cdn-react', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/cdn-react`);
    await expect(page).toHaveScreenshot('cdn-react.png', { fullPage: true });
  });
});

test.describe('cdn-web-components', () => {
  test('matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/cdn-web-components`);
    await expect(page).toHaveScreenshot('cdn-web-components.png', { fullPage: true });
  });
});
