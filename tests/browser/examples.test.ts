import { test, expect } from '@playwright/test';

const DOMAIN = 'http://localhost:8080';

test.describe('cdn-html-css', () => {
  test('prop table matches snapshot', async ({ page }) => {
    await page.goto(`${DOMAIN}/cdn-html-css`);
    await expect(page).toHaveScreenshot('cdn-html-css.png', { fullPage: true });
  });
});
