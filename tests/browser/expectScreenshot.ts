import { expect, Page } from '@playwright/test';

export function expectScreenshot(page: Page, filename: string, options: any = {}) {
  return expect(page).toHaveScreenshot(filename, {
    fullPage: true,
    // We've been getting odd results in our CI tests where the two images are exactly
    // the same in every way, but Playwright is failing the comparison. We'll try setting
    // the `maxDiffPixels` to 1 and see if we still get those kinds of false positives.
    maxDiffPixels: 1,
    ...options,
  });
}
