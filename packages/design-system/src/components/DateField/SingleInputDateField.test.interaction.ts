import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const sbID = 'components-singleinputdatefield--with-picker';
const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${sbID}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`DateField with picker interaction: ${theme}`, async ({ page }) => {
    // Make sure it always takes a screenshot of the same calendar view by
    // giving it a static toDate in the past
    const storyArgs = '&args=toDate:1676498194272';
    await page.goto(`${storyUrl}${storyArgs}&globals=theme:${theme}`);
    await page.getByRole('button').click();
    await expect(page).toHaveScreenshot(`datefield--picker-interaction--${theme}.png`, {
      fullPage: true,
    });
  });
});
