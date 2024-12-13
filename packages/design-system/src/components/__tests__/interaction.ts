import { test } from '@playwright/test';
import themes from '../../../../../themes.json';

export { expectScreenshot } from '../../../../../tests/browser/expectScreenshot';

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function storyUrl(storyId: string, theme: string = 'core'): string {
  return `http://localhost:6006/iframe.html?viewMode=story&id=${storyId}&globals=theme:${theme}`;
}

export function describeByTheme(callback: (theme: string) => any): void {
  Object.keys(themes).forEach((theme) => {
    if (themes[theme].incomplete) return;

    test.describe(theme, () => callback(theme));
  });
}
