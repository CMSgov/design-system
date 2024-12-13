const { expect } = require('@playwright/test');
const { toHaveScreenshot } = require('@playwright/test/lib/matchers/toMatchSnapshot.js');

expect.extend({
  toHaveCustomScreenshot(page, screenshotName, options = {}) {
    console.log('hey');
    return toHaveScreenshot.call(this, page, screenshotName, {
      fullPage: true,
      maxDiffPixels: 1,
      ...options,
    });
  },
});
