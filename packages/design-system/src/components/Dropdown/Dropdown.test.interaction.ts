import { test, expect } from '@playwright/test';
import themes from '../../../../../themes.json';

const storyUrl = (theme: string, id: string) =>
  `http://localhost:6006/iframe.html?viewMode=story&id=${id}&globals=theme:${theme}`;

Object.keys(themes).forEach((theme) => {
  if (themes[theme].incomplete) return;

  test(`Dropdown open: ${theme}`, async ({ page }) => {
    await page.goto(storyUrl(theme, 'components-dropdown--default'));
    await page.getByRole('combobox').click();
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot(`dropdown--open--${theme}.png`, { fullPage: true });
  });

  test(`Dropdown open with option groups: ${theme}`, async ({ page }) => {
    await page.goto(storyUrl(theme, 'components-dropdown--option-groups'));
    await page.getByRole('combobox').click();
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot(`dropdown-optgroups--open--${theme}.png`, {
      fullPage: true,
    });
  });
});
