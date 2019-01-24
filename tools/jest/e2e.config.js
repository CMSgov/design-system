module.exports = {
  rootDir: '../../',
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/tools/jest/e2e.polyfills.js'],
  testMatch: ['<rootDir>/packages/core/src/e2e/**/?*.e2e.test.js'],
  transform: {
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest'
  }
};
