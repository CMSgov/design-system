const path = require('path');

module.exports = (rootDir) => ({
  rootDir,
  testURL: 'http://localhost',
  setupFiles: [`<rootDir>/${path.relative(rootDir, __dirname)}/polyfills.js`],
  setupFilesAfterEnv: [`<rootDir>/${path.relative(rootDir, __dirname)}/setupEnzyme.js`],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/*/dist/',
    '<rootDir>/*/node_modules/',
    '.+\\.e2e\\.test\\.js$',
  ],
  moduleNameMapper: {
    //  '^@cmsgov/design-system/(.*)$': '<rootDir>/packages/design-system/src/$1',
    //  '^@cmsgov/design-system$': '<rootDir>/packages/design-system/src/index.js'
  },
});
