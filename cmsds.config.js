module.exports = {
  // The relative path to your main design-system package.
  sourceDir: './packages/design-system',
  // The relative paths to your docs-package directory. The doc site build files will be saved to the "dist" directory of this directory.
  docsDir: './packages/design-system-docs',
  // Flag enabling typescript support. When `true`, .ts/.tsx files will be compilied and typescript definition files will be generated. Requires tsconfig.json to be defined.
  typescript: true,
  // Sets the domain path for the docs site. I.e. if your docs site is hosted at www.domain.com/design/ your rootPath would be `design/
  rootPath: '',

  // Name of the design system. This replaces the {{name}} template in documentation content.
  name: 'CMS Design System',
  // The URL for your GitHub repository. This replaces the {{github}} template in documentation content.
  githubUrl: 'https://github.com/CMSgov/design-system',
  // The name of your design system NPM package. This replaces the {{npm}} template in documentation content.'
  npmPackage: '@cmsgov/design-system',

  // Flag used by the core CMS design system, should be false for child design systems
  core: true,
};
