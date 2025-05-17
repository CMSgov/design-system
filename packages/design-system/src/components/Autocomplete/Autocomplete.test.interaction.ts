import { expect, test } from '@playwright/test';
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

  test('Autocomplete keyboard interaction', async ({ page }, workerInfo) => {
    test.skip(
      workerInfo.project.name === 'chromium-forced-colors',
      'Input caret breaks this VRT in forced-colors mode'
      // https://github.com/microsoft/playwright/issues/15211
    );

    await page.goto(storyUrl('components-autocomplete--default', theme));

    const elem = page.getByRole('combobox');
    await elem.fill('ad');
    await sleep(100);
    await page.keyboard.press('ArrowDown');
    await sleep(100);
    // Note: removing the following line will cause the test to fail as the Autocomplete
    // component is currently written.
    await page.keyboard.press('Enter');
    await sleep(100);
    await page.keyboard.press('Tab');

    const clearButton = page.getByText('Clear search');
    await expect(clearButton).toBeFocused();

    await expect(elem).toHaveValue('Advil');

    await expectScreenshot(page, `autocomplete--keyboard--${theme}.png`);
  });
});
