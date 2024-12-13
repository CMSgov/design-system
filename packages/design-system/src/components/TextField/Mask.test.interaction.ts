import { test, expect } from '@playwright/test';
import { describeByTheme, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Mask partial text entry', async ({ page }, workerInfo) => {
    test.skip(
      workerInfo.project.name === 'chromium-forced-colors',
      'Input caret breaks this VRT in forced-colors mode'
      // https://github.com/microsoft/playwright/issues/15211
    );

    await page.goto(storyUrl('components-textfield--label-masked-ssn', theme));
    const elem = page.locator('input.ds-c-field');
    await elem.type('22', { delay: 220 });
    await expect(page).toHaveScreenshot(`mask--text-entry--${theme}.png`);
  });

  test('Mask partial text entry and exit', async ({ page }) => {
    await page.goto(storyUrl('components-textfield--label-masked-ssn', theme));
    const elem = page.locator('input.ds-c-field');
    await elem.type('221', { delay: 220 });
    await elem.press('Tab');
    await expect(page).toHaveScreenshot(`mask--text-entry-and-exit--${theme}.png`);
  });
});
