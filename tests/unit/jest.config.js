const usePreact = Boolean(process.env.PREACT && JSON.parse(process.env.PREACT));
const useWebComponents = Boolean(process.env.WC && JSON.parse(process.env.WC));
const preactModuleMapper =
  usePreact || useWebComponents
    ? {
        '^react$': 'preact/compat',
        '^react-dom/test-utils$': 'preact/test-utils',
        '^react-dom$': 'preact/compat',
        '^react/jsx-runtime$': 'preact/jsx-runtime',
        '^@testing-library/react-hooks$': '@testing-library/preact-hooks',
      }
    : {};

const conditionalWebComponentsConfig = useWebComponents
  ? {
      testMatch: ['<rootDir>/design-system/src/components/web-components/**/*.test.[jt]s(x)?'],
    }
  : { testPathIgnorePatterns: ['<rootDir>/design-system/src/components/web-components'] };

module.exports = {
  rootDir: '../../packages',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  setupFiles: [require.resolve('react-app-polyfill/stable')],
  setupFilesAfterEnv: [`<rootDir>/../tests/unit/setupTests.js`],
  testPathIgnorePatterns: [
    'dist/',
    'node_modules/',
    '.+\\.a11y\\.test\\.[jt]s(x)?$',
    '.+\\.e2e\\.test\\.[jt]s(x)?$',
    'docs/public/',
    'docs/static',
  ],
  ...conditionalWebComponentsConfig,
  coverageDirectory: `<rootDir>/../tests/unit/coverage-data`,
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['node_modules(?!/@cmsgov)'],
  moduleNameMapper: {
    // Remap imports for core to the src directory so we don't have to build first
    '^@cmsgov/design-system$': '<rootDir>/design-system/src/components/index',
    ...preactModuleMapper,
  },
};
