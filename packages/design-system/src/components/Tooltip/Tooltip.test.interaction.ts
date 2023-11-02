import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-tooltip--interactive-content';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`Tooltip interaction: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    await page.getByRole('button').click();
    await page.getByRole('dialog').waitFor();
    await expect(page).toHaveScreenshot(`tooltip--open-interactive--${theme}.png`);
  });
});
