module.exports = {
  setupFiles: [
    '<rootDir>/tools/jest/polyfills.js',
    '<rootDir>/tools/jest/setupEnzyme.js'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/examples/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/*/node_modules/',
    '<rootDir>/packages/themes/*/node_modules/',
    '<rootDir>/packages/generator-cmsgov/generators/app/templates/'
  ]
};
