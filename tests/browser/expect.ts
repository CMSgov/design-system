import { Page, expect as baseExpect } from '@playwright/test';

export const expect = baseExpect.extend({
  toHaveScreenshot(page: Page, filename: string, options: any = {}) {
    return baseExpect(page).toHaveScreenshot(filename, {
      fullPage: true,
      maxDiffPixels: 1,
      ...options,
    });
  },
});
