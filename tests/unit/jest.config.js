module.exports = {
  rootDir: '../../packages',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  setupFilesAfterEnv: [`<rootDir>/../setupTests.js`],
  testPathIgnorePatterns: [
    'dist/',
    'node_modules/',
    '.+\\.a11y\\.test\\.[jt]s(x)?$',
    '.+\\.e2e\\.test\\.[jt]s(x)?$',
    'docs/public/',
    'docs/static',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'design-system-scripts'],
  transformIgnorePatterns: ['node_modules(?!/@cmsgov)'],
  moduleNameMapper: {
    // Remap imports for core to the src directory so we don't have to build first
    '^@cmsgov/design-system$': '<rootDir>/design-system/src/components/index',
  },
};
