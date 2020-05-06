const path = require('path');

module.exports = (rootDir) => ({
  rootDir,
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  setupFilesAfterEnv: [`<rootDir>/${path.relative(rootDir, 'setupTests.js')}`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: ['dist/', 'node_modules/', '.+\\.e2e\\.test\\.js$'],
  transformIgnorePatterns: ['node_modules(?!/@cmsgov)'],
});
