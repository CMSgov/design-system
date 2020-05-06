const path = require('path');

module.exports = (rootDir) => ({
  rootDir,
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  testMatch: ['<rootDir>/**/*.e2e.test.[jt]s?(x)'],
  globalSetup: `<rootDir>/${path.relative(rootDir, __dirname)}/e2e.global-setup.js`,
  globalTeardown: `<rootDir>/${path.relative(rootDir, __dirname)}/e2e.global-teardown.js`,
  testEnvironment: `<rootDir>/${path.relative(rootDir, __dirname)}/e2e.environment.js`,
  testEnvironmentOptions: {
    browser: 'chrome',
    chromeOptions: process.env.HEADLESS === 'true' && ['--headless', '--window-size=1024,768'],
  },
});
