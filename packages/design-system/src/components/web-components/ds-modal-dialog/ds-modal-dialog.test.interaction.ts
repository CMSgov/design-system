import { test, expect } from '@playwright/test';
import { describeByTheme, sleep, storyUrl } from '../../__tests__/interaction';

describeByTheme((theme) => {
  test('Dialog open', async ({ page }) => {
    await page.goto(storyUrl('web-components-ds-modal-dialog--default', theme));
    const elem = page.getByRole('button', { name: /Open Modal/ });

    await elem.click();
    await sleep(100);
    await expect(page).toHaveScreenshot(`ds-modal-dialog--open--${theme}.png`, { fullPage: true });
  });
});
