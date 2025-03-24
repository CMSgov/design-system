import { test, BrowserContext, Page } from '@playwright/test';
import { entries as storiesObject } from '../../storybook-static/index.json';
import themes from '../../themes.json';
import { expectNoAxeViolations } from './expectNoAxeViolations';
import { expectScreenshot } from './expectScreenshot';

const storySkipList = [
  'components-autocomplete--async-items', // Redundant
  'components-dialog--default', // Doesn't show the open dialog
  'components-dialog--prevent-scroll-example', // Doesn't show the open dialog
  'components-dialog--use-dialog-example', // Doesn't show the open dialog
  'components-drawer--default', // Doesn't show the open drawer
  'components-drawer--backdrop-click-exits', // Also doesn't show the open drawer
  'components-dropdown--option-groups', // Redundant in its unopened state
  'components-dropdown--html-option-groups', // Redundant
  'components-dropdown--html-options', // Redundant
  'components-dropdown--controlled', // Redundant
  'components-helpdrawer--default', // Redundant
  'components-hint--default', // Captured by individual form fields
  'components-icons--available-icons', // Flakey test prone to failing CI
  'components-idletimeout--default',
  'components-inlineerror--default', // Captured by individual form fields
  'components-label--default', // Captured by individual form fields
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
  'web-components-ds-accordion-item--default', // Redundant
  'web-components-ds-modal-dialog--default', // Doesn't show the open dialog
  'web-components-ds-modal-dialog--prevent-scroll-example', // Doesn't show the open dialog
  'web-components-ds-autocomplete--groups-and-standalone-items', // Redundant
  'web-components-ds-autocomplete--item-groups', // Redundant
  'web-components-ds-autocomplete--async-items', // Redundant
  'web-components-ds-drawer--with-backdrop-click-exits', // Doesn't show the open drawer
];

const storyUseAxeLegacyModeList = [
  'web-components-ds-tabs--default',
  'web-components-ds-tabs--disabled',
  'web-components-ds-drawer--default',
];

const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));
const a11yTestProjects = ['chromium', 'Mobile Chrome'];

const stories = Object.values(storiesObject).filter((story) => story.name !== 'Docs');
const themeKeys = Object.keys(themes).filter((key) => !themes[key].incomplete);

stories.forEach((story) => {
  if (storySkipList.includes(story.id)) return;

  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;

    themeKeys.forEach((theme) => {
      const storyNotInTheme = !story.importPath.includes(themes[theme].packageName);
      const storyNotInCore =
        !story.importPath.includes(themes['core'].packageName) &&
        !story.importPath.includes('packages/docs');

      // Don't capture theme-specific components outside their themes, all themes get core components
      if (storyNotInTheme && storyNotInCore) return;

      // During smoke tests, only take screenshots in core of core components
      if (isSmokeTest && (theme !== 'core' || storyNotInCore)) return;

      test.describe(`with ${theme} theme`, () => {
        let browserContext: BrowserContext;
        let page: Page;

        test.beforeAll(async ({ browser }) => {
          browserContext = await browser.newContext();
          page = await browserContext.newPage();
          await page.goto(`${storyUrl}&globals=theme:${theme}`);
        });

        test.afterAll(async () => {
          await browserContext.close();
        });

        test(`matches snapshot`, async () => {
          await expectScreenshot(page, `${story.id}-${theme}.png`);
        });

        test(`passes a11y checks`, async ({ browser }, workerInfo) => {
          test.skip(
            !a11yTestProjects.includes(workerInfo.project.name),
            "Don't run redundant a11y tests"
          );
          test.skip(
            theme === 'medicare',
            'Temporarily skipping medicare a11y tests until we can fix them'
          );

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
          const shouldUseAxeLegacyMode = storyUseAxeLegacyModeList.includes(story.id);
          await expectNoAxeViolations(page, shouldUseAxeLegacyMode);
        });
      });
    });
  });
});
