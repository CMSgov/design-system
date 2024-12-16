import { test } from '@playwright/test';
import {
  describeByTheme,
  expectScreenshot,
  storyUrl,
} from '../../../../../tests/browser/interactionHelpers';

describeByTheme((theme) => {
  test('Button hover', async ({ page }) => {
    await page.goto(storyUrl('components-button--default', theme));
    await page.locator('text=Your button text here').hover();
    await expectScreenshot(page, `button--hover--${theme}.png`);
  });

  test('Button focus', async ({ page }) => {
    await page.goto(storyUrl('components-button--default', theme));
    await page.locator('text=Your button text here').focus();
    await expectScreenshot(page, `button--focus--${theme}.png`);
  });

  test('Button click', async ({ page }) => {
    await page.goto(storyUrl('components-button--default', theme));
    await page.locator('text=Your button text here').click();
    await expectScreenshot(page, `button--click--${theme}.png`);
  });
});
