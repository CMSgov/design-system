import { expect, test } from '@playwright/test';
import {
  describeByTheme,
  expectScreenshot,
  storyUrl,
} from '../../../../../tests/browser/interactionHelpers';

const sleepDuration = 100;

describeByTheme((theme) => {
  test('Autocomplete select hover', async ({ page }, workerInfo) => {
    test.skip(
      workerInfo.project.name === 'chromium-forced-colors',
      'Input caret breaks this VRT in forced-colors mode'
      // https://github.com/microsoft/playwright/issues/15211
    );

    await page.goto(storyUrl('components-autocomplete--default', theme));
    const elem = page.getByRole('combobox');
    await elem.fill('c');
    await elem.press('ArrowDown', { delay: sleepDuration });
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
    await elem.fill('a');
    await elem.press('ArrowDown');
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
    await elem.pressSequentially('ad', { delay: sleepDuration });
    await elem.press('ArrowDown');
    // Note: removing the following line will cause the test to fail as the Autocomplete
    // component is currently written.
    await elem.press('Enter', { delay: sleepDuration });
    await elem.press('Tab');

    const clearButton = page.getByText('Clear search');
    await expect(clearButton).toBeFocused();

    await expect(elem).toHaveValue('Advil');

    await expectScreenshot(page, `autocomplete--keyboard--${theme}.png`);
  });
});
