/**
 * This config sets up interaction VRT tests in the codebase, we only need to
 * change the testDir and testMap keys in the main playwright config.
 *
 * To debug these in a browser, run the following command:
 *
 * ```
 * yarn playwright test --config tests/browser/interaction.config.ts --headed --debug --ignore-snapshots
 * ```
 *
 * The `--ignore-snapshots` is important if you don't want it to fail the tests, because the
 * snapshots are taken inside a Docker container rather than on the host machine.
 */

import { default as config } from './playwright.config';

config.snapshotPathTemplate = 'snapshots/examples/{arg}/{arg}--{projectName}{ext}';
config.testMatch = /examples\.test\.ts/;
config.webServer = {
  command: 'yarn http-server -p 8080 examples',
  port: 8080,
  cwd: '../../',
};

export default config;
