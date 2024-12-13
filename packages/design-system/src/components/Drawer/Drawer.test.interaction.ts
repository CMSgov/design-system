import { test, expect } from '@playwright/test';
import { describeByTheme, sleep, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Drawer open', async ({ page }) => {
    await page.goto(storyUrl('components-drawer--default', theme));
    const elem = page.getByRole('button');
    await elem.click();
    await sleep(100);
    await expect(page).toHaveScreenshot(`drawer--open--${theme}.png`, { fullPage: true });
  });
});
