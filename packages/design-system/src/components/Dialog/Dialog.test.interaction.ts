import { test } from '@playwright/test';
import { describeByTheme, expectScreenshot, sleep, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Dialog open', async ({ page }) => {
    await page.goto(storyUrl('components-dialog--default', theme));
    const elem = page.getByRole('button');
    await elem.click();
    await sleep(100);
    await expectScreenshot(page, `dialog--open--${theme}.png`);
  });
});
