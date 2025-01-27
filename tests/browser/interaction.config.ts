/**
 * This config sets up interaction VRT tests in the codebase, we only need to
 * change the testDir and testMap keys in the main playwright config.
 *
 * To debug these in a browser, run the following command:
 *
 * ```
 * npx playwright test --config tests/browser/interaction.config.ts --headed --debug --ignore-snapshots
 * ```
 *
 * The `--ignore-snapshots` is important if you don't want it to fail the tests, because the
 * snapshots are taken inside a Docker container rather than on the host machine.
 */

import { config } from './playwright.config';
import { defineConfig } from '@playwright/test';

config.snapshotPathTemplate = 'snapshots/stories-interaction/{arg}--{projectName}{ext}';
config.testDir = '../../packages/';
config.testIgnore = ['**/docs/**', '**/design-system-tokens/**'];
config.testMatch = /.*test\.interaction\.ts/;

export default defineConfig(config);
