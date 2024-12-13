import { test, expect } from '@playwright/test';
import { describeByTheme, sleep, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Autocomplete select hover', async ({ page }) => {
    await page.goto(storyUrl('components-autocomplete--default', theme));
    const elem = page.getByRole('combobox');
    await elem.type('c');
    await sleep(100);
    await elem.press('ArrowDown');
    await expect(page).toHaveScreenshot(`autocomplete--type--${theme}.png`, { fullPage: true });
  });

  test('Autocomplete ItemGroups interaction', async ({ page }) => {
    await page.goto(storyUrl('components-autocomplete--item-groups', theme));

    const elem = page.getByRole('combobox');
    await elem.type('a');
    await sleep(100);

    await elem.press('ArrowDown');
    await sleep(100);
    await elem.press('ArrowDown');

    await expect(page).toHaveScreenshot(`autocomplete-itemgroups--interaction--${theme}.png`, {
      fullPage: true,
    });
  });
});
