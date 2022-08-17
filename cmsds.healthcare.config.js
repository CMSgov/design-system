module.exports = {
  // Flag for whether this package exists in our monorepo
  monorepo: true,
  // The relative path to the directory containing the design system package `src`. The design system build files will be saved here under "dist".
  sourceDir: './packages/ds-healthcare-gov',
  // The relative path to the directory containing the doc site `src`. The doc site build files will be saved here under "dist".
  rootPath: 'design-system/healthcare',
  // Name of the design system. This replaces the {{name}} template in documentation content.
  name: 'HealthCare.gov Design System',
  // The URL for your GitHub repository. This replaces the {{github}} template in documentation content.
  githubUrl: 'https://github.com/CMSgov/design-system',
  // The name of your design system NPM package. This replaces the {{npm}} template in documentation content.'
  npmPackage: '@cmsgov/ds-healthcare-gov',
  // Flag enabling typescript support. When `true`, .ts/.tsx files will be compilied and typescript definition files will be generated. Requires tsconfig.json to be defined.
  typescript: true,
};
