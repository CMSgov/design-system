import { expect, Page } from '@playwright/test';

export function expectScreenshot(page: Page, filename: string, options: any = {}) {
  return expect(page).toHaveScreenshot(filename, {
    fullPage: true,
    // Previously we used `maxDiffPixels: 1` to avoid false positives in CI, but this
    // proved to be overly strict—especially after Playwright/browser upgrades where
    // minor rendering differences are expected.
    // Switching this to a small ratio-based threshold which should allow for insignificant pixel-level
    // differences but still catch meaningful visual regressions.
    maxDiffPixelRatio: 0.01,
    ...options,
  });
}
