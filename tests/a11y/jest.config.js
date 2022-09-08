const path = require('path');
const { execSync } = require('child_process');
const chalk = require('chalk');
const log = require('fancy-log');

process.env.NODE_ENV = 'test';

const headless = !process.argv.includes('--headless=false');
const skipBuild = process.argv.includes('--skipBuild=true');

let system = 'core';
if (process.argv.includes('healthcare')) {
  system = 'healthcare';
} else if (process.argv.includes('medicare')) {
  system = 'medicare';
}

if (skipBuild) {
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
let sb;
try {
  sb = require('../../storybook-static/stories.json');
} catch (error) {
  console.error('Error loading storybook-static/stories.json');
  throw error;
}

const storybookTests = Object.keys(sb.stories).map((key) => {
  return [`${sb.stories[key].title} ${sb.stories[key].story}`, key];
});

module.exports = {
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  testMatch: [path.join(__dirname, '*.a11y.test.[jt]s?(x)')],
  globalSetup: path.join(__dirname, 'jest.global-setup.js'),
  globalTeardown: path.join(__dirname, 'jest.global-teardown.js'),
  testEnvironment: path.join(__dirname, 'jest.environment.js'),
  testEnvironmentOptions: {
    browser: 'chrome',
    chromeOptions: headless ? ['--headless', '--window-size=1024,768'] : [],
  },
  globals: {
    storybookTests: storybookTests,
  },
};
