import { test, expect } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';
import themes from '../../themes.json';

const storySkipList = [
  'components-dialog--prevent-scroll-example',
  'components-dropdown--option-groups',
  'components-dropdown--html-option-groups',
  'components-dropdown--html-options',
  'components-dropdown--controlled', // Redundant
  'components-idletimeout--default',
  'components-skipnav--default-skip-nav',
  'components-skipnav--skip-nav-example',
  'components-tabs--controlled', // Redundant
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
      const storyNotInTheme = !story.importPath.includes(themes[theme].packageName);
      const storyNotInCore = !story.importPath.includes(themes['core'].packageName);
      const storyIsDocPage = story.name === 'Docs';

      if (themes[theme].incomplete || storyIsDocPage) return;

      // Don't capture theme-specific components outside their themes, all themes get core components
      if (storyNotInTheme && storyNotInCore) return;

      // During smoke tests, only take screenshots in core of core components
      if (isSmokeTest && (theme !== 'core' || storyNotInCore)) return;

      test(`with ${theme} theme`, async ({ page }) => {
        await page.goto(`${storyUrl}&globals=theme:${theme}`);
        await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`, { fullPage: true });
      });
    });
  });
});
