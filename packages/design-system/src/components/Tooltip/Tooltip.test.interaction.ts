import { test } from '@playwright/test';
import { describeByTheme, expectScreenshot, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Tooltip interaction', async ({ page }) => {
    await page.goto(storyUrl('components-tooltip--interactive-content', theme));
    await page.getByRole('button').click();
    await page.getByRole('dialog').waitFor();
    await expectScreenshot(page, `tooltip--open-interactive--${theme}.png`, { fullPage: false });
  });
});
