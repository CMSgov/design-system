import { test } from '@playwright/test';
import { describeByTheme, expectScreenshot, sleep, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Autocomplete select hover', async ({ page }) => {
    await page.goto(storyUrl('components-autocomplete--default', theme));
    const elem = page.getByRole('combobox');
    await elem.type('c');
    await sleep(100);
    await elem.press('ArrowDown');
    await expectScreenshot(page, `autocomplete--type--${theme}.png`);
  });

  test('Autocomplete ItemGroups interaction', async ({ page }) => {
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
