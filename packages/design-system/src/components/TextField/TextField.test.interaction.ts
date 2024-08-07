import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-textfield--single-line-field';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  // focus
  test(`Button focus: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    await page.getByRole('textbox').focus();
    await expect(page).toHaveScreenshot(`textbox--focus--${theme}.png`, { fullPage: true });
  });
});
