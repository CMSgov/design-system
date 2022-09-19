import expectNoAxeViolations from './expectNoAxeViolations';
import { test } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Object.values(stories).forEach((story) => {
  test(`${story.title}/${story.name}`, async ({ page }) => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;
    await page.goto(storyUrl);

    switch (story.id) {
      case 'components-drawer--drawer-default':
      case 'components-drawer--drawer-with-sticky-positioning':
        await sleep(1000);
        break;
      default:
        // Slight delay needed for all tests to account for false positives with color-contrast
        await sleep(100);
        break;
    }

    await expectNoAxeViolations(page);
  });
});
