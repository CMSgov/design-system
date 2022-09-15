import { test, expect } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';

const themes = ['core', 'healthcare', 'medicare'];
const storySkipList = [
  'components-idle-timeout--default',
  'components-skip-nav--default-skip-nav',
  'components-skip-nav--skip-nav-example',
];

Object.values(stories).forEach((story) => {
  if (storySkipList.includes(story.id)) return;

  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;

    themes.forEach((theme) => {
      test(`with ${theme} theme`, async ({ page }) => {
        await page.goto(`${storyUrl}&globals=theme:${theme}`);
      });
    });
  });
});
