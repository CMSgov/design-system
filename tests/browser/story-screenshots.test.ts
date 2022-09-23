import { test, expect } from '@playwright/test';
import { stories } from '../../storybook-static/stories.json';

const themes = ['core', 'healthcare', 'medicare'];
const storySkipList = [
  'components-idle-timeout--default',
  'components-skip-nav--default-skip-nav',
  'components-skip-nav--skip-nav-example',
  'foundations-layout-grid--equal-widths',
  'foundations-layout-grid--column-spanning',
  'foundations-layout-grid--fit-to-content',
  'foundations-layout-grid--responsive-columns',
  'patterns-one-column-page-layout--one-column-page-layout',
];

const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

Object.values(stories).forEach((story) => {
  if (storySkipList.includes(story.id)) return;

  test.describe(`${story.title}/${story.name}`, () => {
    const storyUrl = `http://localhost:6006/iframe.html?viewMode=story&id=${story.id}`;
    const isHealthcareStory = story.importPath.includes('ds-healthcare-gov');
    const isMedicareStory = story.importPath.includes('ds-medicare-gov');

    themes.forEach((theme) => {
      // Don't take screenshots of theme-specific components outside of their themes
      if (isHealthcareStory && theme !== 'healthcare') return;
      if (isMedicareStory && theme !== 'medicare') return;

      // For smoke tests, only capture core components in the core theme and theme-specific
      // components in their native theme
      if (
        isSmokeTest &&
        !(
          theme === 'core' ||
          (isHealthcareStory && theme === 'healthcare') ||
          (isMedicareStory && theme === 'medicare')
        )
      ) {
        return;
      }

      test(`with ${theme} theme`, async ({ page }) => {
        await page.goto(`${storyUrl}&globals=theme:${theme}`);
        await expect(page).toHaveScreenshot(`${story.id}-${theme}.png`);
      });
    });
  });
});
