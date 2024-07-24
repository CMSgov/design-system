import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-drawer--default';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`Drawer open: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    const elem = page.getByRole('button');
    await elem.click();
    await sleep(100);
    await expect(page).toHaveScreenshot(`drawer--open--${theme}.png`, { fullPage: true });
  });
});
