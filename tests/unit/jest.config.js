module.exports = {
  rootDir: '../../packages',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  // TODO: Find more robust solution for resolving `setupTests.js` considering `rootDir` can change
  setupFilesAfterEnv: [`<rootDir>/../setupTests.js`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
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
};
