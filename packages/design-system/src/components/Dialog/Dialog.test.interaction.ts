import { test, expect } from '@playwright/test';
import { describeByTheme, sleep, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Dialog open', async ({ page }) => {
    await page.goto(storyUrl('components-dialog--default', theme));
    const elem = page.getByRole('button');
    await elem.click();
    await sleep(100);
    await expect(page).toHaveScreenshot(`dialog--open--${theme}.png`, { fullPage: true });
  });
});
