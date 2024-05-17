import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-dialog--default';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`Dialog open: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    const elem = page.getByRole('button');
    await elem.click();
    await sleep(100);
    await expect(page).toHaveScreenshot(`dialog--open--${theme}.png`, { fullPage: true });
  });
});
