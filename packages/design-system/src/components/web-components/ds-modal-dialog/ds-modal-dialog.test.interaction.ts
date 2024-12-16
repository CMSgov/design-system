import { test } from '@playwright/test';
import {
  describeByTheme,
  expectScreenshot,
  sleep,
  storyUrl,
} from '../../../../../../tests/browser/interactionHelpers';

describeByTheme((theme) => {
  test('Dialog open', async ({ page }) => {
    await page.goto(storyUrl('web-components-ds-modal-dialog--default', theme));
    const elem = page.getByRole('button', { name: /Open Modal/ });

    await elem.click();
    await sleep(100);
    await expectScreenshot(page, `ds-modal-dialog--open--${theme}.png`);
  });
});
