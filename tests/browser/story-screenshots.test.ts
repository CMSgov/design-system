import { test, expect } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';

const themes = ['core', 'healthcare', 'medicare'];
const storySkipList = [
  'components-idle-timeout--default',
  'components-skip-nav--default-skip-nav',
  'components-skip-nav--skip-nav-example',
];

const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

Object.values(stories).forEach((story) => {
  if (storySkipList.includes(story.id)) return;

  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;

    themes.forEach((theme) => {
      if (theme !== 'healthcare' && story.importPath.includes('ds-healthcare-gov')) return;
      if (theme !== 'medicare' && story.importPath.includes('ds-medicare-gov')) return;
      if (theme !== 'core' && isSmokeTest) return;

      test(`with ${theme} theme`, async ({ page }) => {
        await page.goto(`${storyUrl}&globals=theme:${theme}`);
        await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`);
      });
    });
  });
});
