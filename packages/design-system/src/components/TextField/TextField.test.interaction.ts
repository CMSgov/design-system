import { test } from '@playwright/test';
import { describeByTheme, expectScreenshot, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Button focus', async ({ page }) => {
    await page.goto(storyUrl('components-textfield--single-line-field', theme));
    await page.getByRole('textbox').focus();
    await expectScreenshot(page, `textbox--focus--${theme}.png`);
  });
});
