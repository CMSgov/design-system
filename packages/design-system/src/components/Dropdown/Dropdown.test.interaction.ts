import { test, expect } from '@playwright/test';
import { describeByTheme, storyUrl } from '../__tests__/interaction';

describeByTheme((theme) => {
  test('Dropdown open', async ({ page }) => {
    await page.goto(storyUrl('components-dropdown--default', theme));
    await page.getByRole('button').click();
    // Cannot figure out an alternative to this wait time
    await page.waitForTimeout(200);
    await page.getByRole('listbox').waitFor();
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot(`dropdown--open--${theme}.png`, { fullPage: true });
  });

  test('Dropdown open with option groups', async ({ page }) => {
    await page.goto(storyUrl('components-dropdown--option-groups', theme));
    await page.getByRole('button').click();
    // Cannot figure out an alternative to this wait time
    await page.waitForTimeout(200);
    await page.getByRole('listbox').waitFor();
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot(`dropdown-optgroups--open--${theme}.png`, {
      fullPage: true,
    });
  });
});

// Don't need to test these in all themes
test('Dropdown scrolls to selected item', async ({ page }) => {
  await page.goto(storyUrl('components-dropdown--default', 'core'));
  await page.getByRole('button').click();
  // Cannot figure out an alternative to this wait time
  await page.waitForTimeout(200);
  await page.getByRole('listbox').waitFor();

  // Select the last item and wait for it to close
  let lastOption = await page.getByRole('option').last();
  // Make sure our test is even valid by verifying that the last item isn't normally visible
  await expect(lastOption).not.toBeInViewport();
  lastOption.click();
  await page.getByRole('listbox').waitFor({ state: 'hidden' });

  // Open it back up and see if the selected item is visible
  await page.getByRole('button').click();
  await page.waitForTimeout(200);
  await page.getByRole('listbox').waitFor();
  lastOption = await page.getByRole('option').last();
  await expect(lastOption).toBeInViewport();
});
