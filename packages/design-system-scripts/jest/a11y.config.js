const path = require('path');

module.exports = (rootDir) => ({
  rootDir,
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  testMatch: ['<rootDir>/**/*.a11y.test.[jt]s?(x)'],
  globalSetup: `<rootDir>/${path.relative(rootDir, __dirname)}/a11y.global-setup.js`,
  globalTeardown: `<rootDir>/${path.relative(rootDir, __dirname)}/a11y.global-teardown.js`,
  testEnvironment: `<rootDir>/${path.relative(rootDir, __dirname)}/selenium.environment.js`,
  testEnvironmentOptions: {
    browser: 'chrome',
    chromeOptions: process.env.HEADLESS === 'true' && ['--headless', '--window-size=1024,768'],
  },
});
