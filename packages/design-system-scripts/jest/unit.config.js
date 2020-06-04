const path = require('path');

module.exports = (rootDir, core) => ({
  rootDir,
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  setupFilesAfterEnv: [`<rootDir>/${path.relative(rootDir, 'setupTests.js')}`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['dist/', 'node_modules/', '.+\\.e2e\\.test\\.js$'],
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
