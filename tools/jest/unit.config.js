module.exports = {
  rootDir: '../../',
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/tools/jest/polyfills.js', '<rootDir>/tools/jest/setupEnzyme.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/examples/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/*/node_modules/',
    '<rootDir>/packages/themes/*/node_modules/',
    '.+\\.e2e\\.test\\.js$'
  ],
  moduleNameMapper: {
    '^@cmsgov/design-system-core/(.*)$': '<rootDir>/packages/design-system/src/$1',
    '^@cmsgov/design-system-core$': '<rootDir>/packages/design-system/src/index.js'
  }
};
