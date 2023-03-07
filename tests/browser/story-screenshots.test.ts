import { test, expect } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';
import themes from '../../themes.json';

const storySkipList = [
  'components-dialog--prevent-scroll-example',
  'components-idle-timeout--default',
  'components-skip-nav--default-skip-nav',
  'components-skip-nav--skip-nav-example',
  'foundations-layout-grid--equal-widths',
  'foundations-layout-grid--column-spanning',
  'foundations-layout-grid--fit-to-content',
  'foundations-layout-grid--responsive-columns',
  'patterns-one-column-page-layout--one-column-page-layout',
  'healthcare-privacysettingslink--default',
  'healthcare-privacysettingslink--custom-content',
];

const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

Object.values(stories).forEach((story) => {
  if (storySkipList.includes(story.id)) return;

  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;

    Object.keys(themes).forEach((theme) => {
      if (themes[theme].incomplete) return;

      // Don't capture theme-specific components outside their themes
      if (
        !story.importPath.includes(themes[theme].packageName) &&
        !story.importPath.includes(themes['core'].packageName)
      )
        return;

      // During smoke tests, only take screenshots in core of core components
      if (isSmokeTest && theme !== 'core') return;

      test(`with ${theme} theme`, async ({ page }) => {
        await page.goto(`${storyUrl}&globals=theme:${theme}`);
        await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`, { fullPage: true });
      });
    });
  });
});
