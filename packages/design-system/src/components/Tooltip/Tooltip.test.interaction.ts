import { test, expect } from '@playwright/test';
import { describeByTheme, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Tooltip interaction', async ({ page }) => {
    await page.goto(storyUrl('components-tooltip--interactive-content', theme));
    await page.getByRole('button').click();
    await page.getByRole('dialog').waitFor();
    await expect(page).toHaveScreenshot(`tooltip--open-interactive--${theme}.png`);
  });
});
