module.exports = {
  rootDir: '../../',
  testURL: 'http://localhost',
  globalSetup: '<rootDir>/tools/jest/e2e.global-setup.js',
  globalTeardown: '<rootDir>/tools/jest/e2e.global-teardown.js',
  setupFiles: ['<rootDir>/tools/jest/e2e.polyfills.js'],
  testMatch: ['<rootDir>/packages/core/src/**/?*.e2e.test.js'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  }
};
