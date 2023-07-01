import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-single-input-date-field--with-picker';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`DateField with picker interaction: ${theme}`, async ({ page }) => {
    await page.goto(`${storyUrl}&globals=theme:${theme}`);
    await page.getByRole('button').click();
    await expect(page).toHaveScreenshot(`datefield--picker-interaction--${theme}.png`, {
      fullPage: true,
    });
  });
});
