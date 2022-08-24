const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const log = require('fancy-log');

module.exports = (system) => {
  let sb;

  if (process.env.SKIP_BUILD === 'true') {
    log(`${chalk.yellow('Skipping build-storybook and using existing build instead')}`);
  } else {
    log(chalk.green(`Building ${system} storybook instance in ./storybook-static/ ...\n`));
    // formatting for build-storybook script purpose
    system = system == 'core' ? '' : ':' + system;
    execSync(
      process.env.BUILD_COMMAND || `yarn build-storybook${system}`,
      { stdio: 'inherit' },
      (err, stdout, stderr) => {
        if (err) console.error(err.message);
        if (stderr) console.error(err.message);
        console.log('\n');
        log(chalk.green('Build successful! loading story data\n'));
      }
    );
    log(chalk.green('build-storybook complete ✓'));
  }

  log(chalk.green('Reading ./storybook-static/stories.json ...'));
  try {
    sb = require('../../../storybook-static/stories.json');
  } catch {
    console.error('Error loading storybook-static/stories.json');
  }

  const storybookTests = Object.keys(sb.stories).map((key) => {
    return [`${sb.stories[key].title} ${sb.stories[key].story}`, key];
  });

  return {
    testURL: 'http://localhost',
    setupFiles: [require.resolve('react-app-polyfill/stable')],
    testMatch: [`${__dirname}/*.a11y.test.[jt]s?(x)`],
    globalSetup: `${__dirname}/a11y.global-setup.js`,
    globalTeardown: `${__dirname}/a11y.global-teardown.js`,
    testEnvironment: `${__dirname}/selenium.environment.js`,
    testEnvironmentOptions: {
      browser: 'chrome',
      chromeOptions: process.env.HEADLESS === 'true' && ['--headless', '--window-size=1024,768'],
    },
    globals: {
      storybookTests: storybookTests,
    },
  };
};
