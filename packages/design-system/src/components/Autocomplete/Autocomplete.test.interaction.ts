import { test } from '@playwright/test';
import {
  describeByTheme,
  expectScreenshot,
  sleep,
  storyUrl,
} from '../../../../../tests/browser/interactionHelpers';

describeByTheme((theme) => {
  test('Autocomplete select hover', async ({ page }, workerInfo) => {
    test.skip(
      workerInfo.project.name === 'chromium-forced-colors',
      'Input caret breaks this VRT in forced-colors mode'
      // https://github.com/microsoft/playwright/issues/15211
    );

    await page.goto(storyUrl('components-autocomplete--default', theme));
    const elem = page.getByRole('combobox');
    await elem.type('c');
    await sleep(100);
    await elem.press('ArrowDown');
    await expectScreenshot(page, `autocomplete--type--${theme}.png`);
  });

  test('Autocomplete ItemGroups interaction', async ({ page }, workerInfo) => {
    test.skip(
      workerInfo.project.name === 'chromium-forced-colors',
      'Input caret breaks this VRT in forced-colors mode'
      // https://github.com/microsoft/playwright/issues/15211
    );

    await page.goto(storyUrl('components-autocomplete--item-groups', theme));

    const elem = page.getByRole('combobox');
    await elem.type('a');
    await sleep(100);

    await elem.press('ArrowDown');
    await sleep(100);
    await elem.press('ArrowDown');

    await expectScreenshot(page, `autocomplete-itemgroups--interaction--${theme}.png`);
  });
});
