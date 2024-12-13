import { test, expect } from '@playwright/test';
import { describeByTheme, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Button hover', async ({ page }) => {
    await page.goto(storyUrl('components-button--default', theme));
    await page.locator('text=Your button text here').hover();
    await expect(page).toHaveScreenshot(`button--hover--${theme}.png`, { fullPage: true });
  });

  test('Button focus', async ({ page }) => {
    await page.goto(storyUrl('components-button--default', theme));
    await page.locator('text=Your button text here').focus();
    await expect(page).toHaveScreenshot(`button--focus--${theme}.png`, { fullPage: true });
  });

  test('Button click', async ({ page }) => {
    await page.goto(storyUrl('components-button--default', theme));
    await page.locator('text=Your button text here').click();
    await expect(page).toHaveScreenshot(`button--click--${theme}.png`, { fullPage: true });
  });
});
