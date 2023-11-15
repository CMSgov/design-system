import { test, expect } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';
import themes from '../../themes.json';
import expectNoAxeViolations from './expectNoAxeViolations';

const storySkipList = [
  'components-dialog--prevent-scroll-example', // Redundant
  'components-dropdown--option-groups', // Redundant in its unopened state
  'components-dropdown--html-option-groups', // Redundant
  'components-dropdown--html-options', // Redundant
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
  // Skip all web components for now
  'web-components-alert--default',
  'web-components-badge--default',
  'web-components-button--default',
  'web-components-dropdown--default',
  'web-components-usabanner--default',
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

      test.describe(`with ${theme} theme`, () => {
        let page;

        test.beforeAll(async ({ browser, browserName }) => {
          const context = await browser.newContext();
          page = await context.newPage();
          await page.goto(`${storyUrl}&globals=theme:${theme}`);
        });

        test(`matches snapshot`, async () => {
          await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`, { fullPage: true });
        });

        test(`passes a11y checks`, async ({ browserName }) => {
          test.skip(browserName !== 'chromium', 'Only run bother a11y tests in one browser');

          switch (story.id) {
            case 'components-drawer--drawer-default':
            case 'components-drawer--drawer-with-sticky-positioning':
              await page.waitForTimeout(1000);
              break;
            default:
              // Slight delay needed for all tests to account for false positives with color-contrast
              await page.waitForTimeout(100);
              break;
          }

          await expectNoAxeViolations(page);
        });
      });
    });
  });
});
