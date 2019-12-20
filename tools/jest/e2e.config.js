const headless = process.env.HEADLESS ? JSON.parse(process.env.HEADLESS) : true;
const browser = headless ? 'chrome' : process.env.BROWSER || 'chrome';
const chromeOptions = headless && {
  args: ['--headless', '--window-size=1024,768', '--no-sandbox', '--disable-dev-shm-usage']
};

const validBrowsers = ['chrome', 'firefox', 'safari', 'ie', 'edge'];
if (!validBrowsers.includes(browser)) {
  console.error(`Environment variable "BROWSER" has an invalid value of "${browser}".`);
  console.error('Please use one of the following strings for "BROWSER":');
  console.error(validBrowsers.map(b => `  - "${b}"`).join('\n'));
  process.exit(1);
}

module.exports = {
  rootDir: '../../',
  testURL: 'http://localhost',
  globalSetup: '<rootDir>/tools/jest/e2e.global-setup.js',
  globalTeardown: '<rootDir>/tools/jest/e2e.global-teardown.js',
  setupFiles: ['<rootDir>/tools/jest/e2e.polyfills.js'],
  testMatch: ['<rootDir>/packages/core/src/**/?*.e2e.test.js'],
  testEnvironment: '<rootDir>/tools/jest/e2e.environment.js',
  testEnvironmentOptions: {
    browser,
    chromeOptions
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  }
};
