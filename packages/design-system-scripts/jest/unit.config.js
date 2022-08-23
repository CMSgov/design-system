const path = require('path');

module.exports = (rootDir, core) => ({
  rootDir,
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  // TODO: Find more robust solution for resolving `setupTests.js` considering `rootDir` can change
  setupFilesAfterEnv: core ? [`<rootDir>/../setupTests.js`] : [`<rootDir>/setupTests.js`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    'dist/',
    'node_modules/',
    '.+\\.a11y\\.test\\.[jt]s(x)?$',
    '.+\\.e2e\\.test\\.[jt]s(x)?$',
    'docs/public/',
    'docs/static',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'design-system-scripts',
    'docs/public/',
    'docs/static',
  ],
  transformIgnorePatterns: ['node_modules(?!/@cmsgov)'],
  // Add moduleNameMapper for core CMSDS to resolve imports from @cmsgov/design-system to packages/design-system
  moduleNameMapper: core
    ? {
        '^@cmsgov/design-system/(.*)$': `<rootDir>/${path.relative(
          rootDir,
          'packages/design-system/$1'
        )}`,
        '^@cmsgov/design-system$': `<rootDir>/${path.relative(
          rootDir,
          'packages/design-system/src/components/index'
        )}`,
      }
    : {},
});
