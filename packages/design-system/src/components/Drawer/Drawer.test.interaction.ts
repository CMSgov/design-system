import { test } from '@playwright/test';
import {
  describeByTheme,
  expectScreenshot,
  sleep,
  storyUrl,
} from '../../../../../tests/browser/interactionHelpers';

describeByTheme((theme) => {
  test('Drawer open', async ({ page }) => {
    await page.goto(storyUrl('components-drawer--default', theme));
    const elem = page.getByRole('button');
    await elem.click();
    // Work what might be a Playwright bug. Animations are supposed to be disabled by
    // default when taking a screenshot, but it doesn't seem to be working for this
    // component. Animation takes 300ms.
    await sleep(320);
    await expectScreenshot(page, `drawer--open--${theme}.png`);
  });
});
