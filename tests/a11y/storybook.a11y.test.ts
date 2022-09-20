import expectNoAxeViolations from './expectNoAxeViolations';
import { test } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';

const themes = ['core', 'healthcare' /* 'medicare' */];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Object.values(stories).forEach((story) => {
  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;

    themes.forEach((theme) => {
      if (theme !== 'healthcare' && story.importPath.includes('ds-healthcare-gov')) return;
      if (theme !== 'medicare' && story.importPath.includes('ds-medicare-gov')) return;

      test(`with ${theme} theme`, async ({ page }) => {
        await page.goto(`${storyUrl}&globals=theme:${theme}`);

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
  });
});
