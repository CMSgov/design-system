const usePreact = Boolean(process.env.PREACT && JSON.parse(process.env.PREACT));
const useWebComponents = Boolean(process.env.WC && JSON.parse(process.env.WC));
const type = useWebComponents ? 'wc' : 'react';

const preactModuleMapper =
  usePreact || useWebComponents
    ? {
        '^react$': 'preact/compat',
        '^react-dom/test-utils$': 'preact/test-utils',
        '^react-dom$': 'preact/compat',
        '^react/jsx-runtime$': 'preact/jsx-runtime',
      }
    : {};

const conditionalWebComponentsConfig = useWebComponents
  ? {
      testMatch: [
        '<rootDir>/packages/design-system/src/components/web-components/**/*.test.[jt]s(x)?',
        '<rootDir>/packages/ds-medicare-gov/src/components/web-components/**/*.test.[jt]s(x)?',
        '<rootDir>/tests/browser/custom-reporter.test.ts',
      ],
    }
  : {
      testPathIgnorePatterns: [
        '<rootDir>/packages/design-system/src/components/web-components',
        '<rootDir>/packages/ds-medicare-gov/src/components/web-components',
        '<rootDir>/tests/browser/',
      ],
    };

module.exports = {
  rootDir: '../..',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  setupFilesAfterEnv: [`<rootDir>/tests/unit/setupTests.js`],
  testPathIgnorePatterns: [
    'dist/',
    'node_modules/',
    '.+\\.a11y\\.test\\.[jt]s(x)?$',
    '.+\\.e2e\\.test\\.[jt]s(x)?$',
    'docs/public/',
    'docs/static',
  ],
  ...conditionalWebComponentsConfig,
  coverageDirectory: `<rootDir>/tests/unit/coverage-data`,
  reporters: [
    'default',
    ['<rootDir>/tests/unit/testsReporter.js', { type }],
    ['<rootDir>/tests/unit/coverageReporter.js', { file: `coverage-summary-${type}.json`, type }],
  ],
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['node_modules(?!/@cmsgov)'],
  moduleNameMapper: {
    '^@cmsgov/design-system$': '<rootDir>/packages/design-system/src/components/index',
    ...preactModuleMapper,
  },
};
