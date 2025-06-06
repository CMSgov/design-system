/**
 * This config is for testing the storybook docs, which don't need to run in all the browsers.
 *
 * To debug these in a browser, run the following command:
 *
 * ```
 * npx playwright test --config tests/browser/storybook-docs.config.ts --headed --debug
 * ```
 */

import { config } from './playwright.config';
import { defineConfig, devices } from '@playwright/test';

config.snapshotPathTemplate = 'snapshots/storybook-docs/{arg}{ext}';
config.testMatch = 'storybook-docs.test.ts';
config.outputDir = './test-results/storybook-docs';
config.testIgnore = undefined; // Was previously ignoring the storybook-docs tests
config.projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
];

export default defineConfig(config);
