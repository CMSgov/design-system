module.exports = {
  // Flag used by the core CMS design system, should be false for child design systems
  core: true,
  // Flag for whether this package exists in our monorepo
  monorepo: true,
  // The relative path to the directory containing the design system package `src`. The design system build files will be saved here under "dist".
  sourceDir: './packages/design-system',
  // Flag enabling typescript support. When `true`, .ts/.tsx files will be compilied and typescript definition files will be generated. Requires tsconfig.json to be defined.
  typescript: true,
  // Flag enabling minification of SVG files in `src/images/` using svgo.
  minifySvg: true,
  // The URL root path for the published docs site. I.e. if your docs site is hosted at www.domain.com/design/ your rootPath would be `design`. `rootPath` is only used when building for production.
  rootPath: '',
  // Name of the design system. This replaces the {{name}} template in documentation content.
  name: 'CMS Design System',
  // The URL for your GitHub repository. This replaces the {{github}} template in documentation content.
  githubUrl: 'https://github.com/CMSgov/design-system',
  // The name of your design system NPM package. This replaces the {{npm}} template in documentation content.'
  npmPackage: '@cmsgov/design-system',
};
