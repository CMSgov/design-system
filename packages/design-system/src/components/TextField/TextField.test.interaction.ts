import { test, expect } from '@playwright/test';
import { describeByTheme, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Button focus', async ({ page }) => {
    await page.goto(storyUrl('components-textfield--single-line-field', theme));
    await page.getByRole('textbox').focus();
    await expect(page).toHaveScreenshot(`textbox--focus--${theme}.png`, { fullPage: true });
  });
});
