import { test } from '@playwright/test';
import { describeByTheme, expectScreenshot, sleep, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Drawer open', async ({ page }) => {
    await page.goto(storyUrl('components-drawer--default', theme));
    const elem = page.getByRole('button');
    await elem.click();
    await sleep(100);
    await expectScreenshot(page, `drawer--open--${theme}.png`);
  });
});
