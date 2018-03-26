module.exports = {
  rootDir: '../../',
  globalSetup: '<rootDir>/tools/jest/e2e.global-setup.js',
  globalTeardown: '<rootDir>/tools/jest/e2e.global-teardown.js',
  setupTestFrameworkScriptFile: '<rootDir>/tools/jest/e2e.test-setup.js',
  setupFiles: ['<rootDir>/tools/jest/e2e.polyfills.js'],
  testEnvironment: '<rootDir>/tools/jest/e2e.test-environment.js',
  testMatch: ['<rootDir>/e2e/**/?*.test.js'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  }
};
