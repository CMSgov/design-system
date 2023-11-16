/**
 * This config is for testing the storybook docs, which don't need to run in all the browsers
 */

import { default as config } from './playwright.config';
import { devices } from '@playwright/test';

config.snapshotPathTemplate = 'snapshots/storybook-docs/{arg}{ext}';
config.testMatch = 'storybook-docs.test.ts';
config.testIgnore = undefined; // Was previously ignoring the storybook-docs tests
config.projects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
];

export default config;
