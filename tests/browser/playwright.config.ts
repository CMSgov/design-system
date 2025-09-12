/**
 * To debug these in a browser, run the following command:
 *
 * ```
 * npx playwright test --config tests/browser/storybook-docs.config.ts --headed --debug --ignore-snapshots
 * ```
 *
 * The `--ignore-snapshots` is important if you don't want it to fail the tests, because the
 * snapshots are taken inside a Docker container rather than on the host machine.
 */

import type { PlaywrightTestConfig } from '@playwright/test';
import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI && JSON.parse(process.env.CI));
const isSmokeTest = Boolean(process.env.SMOKE && JSON.parse(process.env.SMOKE));

const allProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },

  /* Test against mobile viewports. */
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  // {
  //   name: 'Mobile Safari',
  //   use: { ...devices['iPhone 12'] },
  // },

  /* Test in forced-colors mode */
  {
    name: 'chromium-forced-colors',
    use: { ...devices['Desktop Chrome'], contextOptions: { forcedColors: 'active' as const } },
  },

  /* Test against branded browsers. */
  // {
  //   name: 'Microsoft Edge',
  //   use: {
  //     channel: 'msedge',
  //   },
  // },
  // {
  //   name: 'Google Chrome',
  //   use: {
  //     channel: 'chrome',
  //   },
  // },
];

const smokeTestProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const config: PlaywrightTestConfig = {
  testDir: './',
  testIgnore: [
    'storybook-docs.test.ts',
    'examples.test.ts',
    '**/__snapshots__/**',
    'custom-reporter.test.ts',
  ],
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  snapshotPathTemplate: 'snapshots/stories/{arg}--{projectName}{ext}',
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: isCI ? 15000 : 5000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: isCI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['./custom-reporter.ts']],
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: './test-results/playwright',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: isSmokeTest ? smokeTestProjects : allProjects,

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npx http-server -p 6006 storybook-static',
    port: 6006,
    cwd: '../../',
  },
};

export default defineConfig(config);
