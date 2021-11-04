module.exports = {
  // The relative path to the directory containing the design system package `src`. The design system build files will be saved here under "dist".
  sourceDir: './',
  // The relative path to the directory containing the doc site `src`. The doc site build files will be saved here under "dist".
  docsDir: './docs',
  // Flag enabling typescript support. When `true`, .ts/.tsx files will be compilied and typescript definition files will be generated. Requires tsconfig.json to be defined.
  typescript: true,
  // The URL root path for the published docs site. I.e. if your docs site is hosted at www.domain.com/design/ your rootPath would be `design`. `rootPath` is only used when building for production.
  rootPath: 'mgov-design-system',

  // Name of the design system. This replaces the {{name}} template in documentation content.
  name: 'Medicare.gov Design System',
  // The URL for your GitHub repository. This replaces the {{github}} template in documentation content.
  githubUrl: 'https://github.com/CMSgov/mgov-design-system',
  // The name of your design system NPM package. This replaces the {{npm}} template in documentation content.'
  npmPackage: '@cmsgov/ds-medicare-gov',
};
