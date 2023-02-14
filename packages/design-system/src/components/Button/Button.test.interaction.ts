import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-button--default';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  // hover
  test(`Button hover: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    await page.locator('text=Your button text here').hover();
    await expect(page).toHaveScreenshot(`button--hover--${theme}.png`, { fullPage: true });
  });

  // focus
  test(`Button focus: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    await page.locator('text=Your button text here').focus();
    await expect(page).toHaveScreenshot(`button--focus--${theme}.png`, { fullPage: true });
  });

  // click
  test(`Button click: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    await page.locator('text=Your button text here').click();
    await expect(page).toHaveScreenshot(`button--click--${theme}.png`, { fullPage: true });
  });
});
