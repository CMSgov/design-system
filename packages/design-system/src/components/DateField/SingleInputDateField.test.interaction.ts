import { test } from '@playwright/test';
import {
  describeByTheme,
  expectScreenshot,
  storyUrl,
} from '../../../../../tests/browser/interactionHelpers';

describeByTheme((theme) => {
  test('DateField with picker interaction', async ({ page }) => {
    await page.goto(storyUrl('components-singleinputdatefield--with-picker', theme));
    await page.getByRole('button').click();
    await expectScreenshot(page, `datefield--picker-interaction--${theme}.png`);
  });
});
