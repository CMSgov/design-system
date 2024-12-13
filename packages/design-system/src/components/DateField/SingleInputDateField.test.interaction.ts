import { test, expect } from '@playwright/test';
import { describeByTheme, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('DateField with picker interaction', async ({ page }) => {
    await page.goto(storyUrl('components-singleinputdatefield--with-picker', theme));
    await page.getByRole('button').click();
    await expect(page).toHaveScreenshot(`datefield--picker-interaction--${theme}.png`, {
      fullPage: true,
    });
  });
});
