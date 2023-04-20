import expectNoAxeViolations from './expectNoAxeViolations';
import { test } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';
import themes from '../../themes.json';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Object.values(stories).forEach((story) => {
  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;
    Object.keys(themes).forEach((theme) => {
      if (themes[theme].incomplete) return;
      // right now medicare is not doing a11y testing
      if (theme === 'medicare') return;

      // Don't take screenshots of theme-specific components outside of their themes
      const isCoreStory = story.importPath.includes('design-system');
      if (!isCoreStory && !story.importPath.includes(themes[theme].packageName)) return;

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
