import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-autocomplete--default';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`Autocomplete select  hover: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    const elem = page.getByRole('combobox');
    await elem.type('c');
    await sleep(100);
    await elem.press('ArrowDown');
    await expect(page).toHaveScreenshot(`autocomplete--type--${theme}.png`, { fullPage: true });
  });
});
