import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-textfield--label-masked-ssn';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`Mask partial text entry: ${theme}`, async ({ page }, workerInfo) => {
    test.skip(
      workerInfo.project.name === 'chromium-forced-colors',
      'Input caret breaks this VRT in forced-colors mode'
      // https://github.com/microsoft/playwright/issues/15211
    );

    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    const elem = page.locator('input.ds-c-field');
    await elem.type('22', { delay: 220 });
    await expect(page).toHaveScreenshot(`mask--text-entry--${theme}.png`, { caret: 'hide' });
  });

  test(`Mask partial text entry and exit: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    const elem = page.locator('input.ds-c-field');
    await elem.type('221', { delay: 220 });
    await elem.press('Tab');
    await expect(page).toHaveScreenshot(`mask--text-entry-and-exit--${theme}.png`, {
      caret: 'hide',
    });
  });
});
