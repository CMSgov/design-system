## Introduction

This example shows what a typical child design system repository could look like. It contains custom components, overridden styles, and other additional resources to demonstrate how product teams could use a child design system.

See the [Child Design System documentation page](https://design.cms.gov/startup/child-design-systems/) for more background on what child design systems are, and if you should be using one.

## Getting started

1. Download this child design system example folder
1. Run `yarn install` to install dependencies
1. Run `yarn start` to build the design system package, generate the doc site, and serve it locally

## Folder structure

Design system package source files (`jsx`, `tsx`, tests) and doc site files (example files, documentation content) and are separated into `./src` and `./docs/src` and folders respectively.

### Design system package

```
├── dist                          // Design system build files
└── src
  ├── components/
  │   ├── Button/
  |   |   ├── Button.jsx
  |   |   └── Button.test.jsx
  │   └── index.js                // Main JS entry point
  ├── fonts/                      // Child DS specific fonts
  ├── images/                     // Child DS specific images
  └── styles/
      ├── base/
      ├── components/
      |   └── Button.scss
      ├── settings/               // Variable definitions and overrides
      └── index.scss              // Main SCSS entry point
```

### Documentation site source

```
├── docs/dist                       // Doc site build files
└── docs/src
    ├── pages/                      // Documentation site content organized by navigation sections
    |   ├── components/Button/      // Documentation for the button component
    |   |   ├── Button.docs.scss
    |   |   ├── Button.example.html
    |   |   └── Button.example.jsx
    |   ├── guidelines
    |   ├── patterns
    |   ├── startup
    |   ├── styles
    |   ├── utilities
    |   └── index.md                // Homepage content
    ├── example.scss                // SCSS for HTML/React examples
    └── index.scss                  // SCSS for the main doc site
```

## Developer scripts

Child design systems use the [`@cmsgov/design-system-scripts` package](https://www.npmjs.com/package/@cmsgov/design-system-scripts) (CMSDS scripts)for building files, testing, and other developer tooling. This example's `package.json` has already been configured to use CMSDS scripts via the defined npm scripts.

See the [design system scripts README](https://github.com/CMSgov/design-system/tree/master/packages/design-system-scripts) for the full list of commands and options.

### Configuring CMSDS scripts

The `cmsds.config.js` file contains options for configuring the CMSDS scripts. Most of these options only need to be configured once.
| Config | Default | Description |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sourceDir` | `./` | The relative path to the directory containing the design system package `src`. The design system build files will be saved here under `dist`. |
| `docsDir` | `./docs` | The relative path to the directory containing the doc site `src`. The doc site build files will be saved here under `dist`. |
| `typescript` | `false` | Used to enable typescript support. When `true`, `.ts/.tsx` files will be compiled and typescript definition files will be generated. Requires `tsconfig.json` to be defined. |
| `rootUrl` | | Sets the domain path for the docs site. I.e. if your docs site is hosted at "www.domain.com/design/" your rootPath would be `"design"` |
| `name` | | Name of the design system. This replaces the {{name}} template in documentation content. |
| `githubUrl` | | The URL for your GitHub repository. This replaces the {{github}} template in documentation content. |
| `npmPackage` | | The name of your design system NPM package. This replaces the {{npm}} template in documentation content. |

### Configuring JS

CMSDS scripts compiles JSX/TSX React files using Babel, which can be fully customized via the `babel.config.js` file. To customize babel presets and plugins, simply editing the config file, and the updated config will be used for building both the design system package and the documentation site.

#### CommonJS and ES Modules

In addition to CommonJS, CMSDS scripts supports ES modules, which are outputted in the `dist/esnext` directory. Child Design Systems are also configured as dual packages to support webpack4's [tree shaking optimizations](https://webpack.js.org/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects) while maintaining backwards compatibility. See [React component documentation](https://design.cms.gov/startup/components/#named-imports) for more information.

Because CMSDS scripts will automatically compile React components a second time for ES modules, **`babel.config.js` must be configured to compile CommonJS**. Simply ensure that `modules: false` is not set for the `@babel/preset-env` preset.

### Configuring tests

CMSDS scripts provide scripts to run unit tests and e2e tests with Jest. If you are interested in setting up e2e tests, see the core [CMS Design System](https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/components/Button/Button.e2e.test.js) for examples on how to implement setup and implement e2e tests.

Unit tests need a `setupTests.js` file to be defined in your design system source folder. This file is run before each test file via Jest's `setupFilesAfterEnv` config option](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array), and is used to configure your tests. CMSDS scripts supports 2 options for component testing by default, either [Enzyme](https://enzymejs.github.io/enzyme/) or [React Testing Library](https://testing-library.com/).

### Configuring linting

CMSDS scripts provide a lint script to enforce linter and formatting rules with `prettier`, `eslint` and `stylelint`. All three are easily configurable via their respective config files. The CMSDS team also provides recommended config via the [`@cmsgov/eslint-config-design-system`](http://npmjs.com/package/@cmsgov/eslint-config-design-system) and [`@cmsgov/stylelint-config-design-system`](http://npmjs.com/package/@cmsgov/stylelint-config-design-system) packages.

The CMSDS lint script is also configurable to turn off any of the three linters/formatters. For example, if you aren't interested in using `stylelint`, simply pass the `--disableStylelint` option to the lint script. Run `yarn cmsds lint --help` to see the lint script options for more information.

### Configuring tests

Unit tests need a `setupTests.js` file to be defined in your design system source folder. This file is run before each test file via Jest's `setupFilesAfterEnv` config option](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array), and is used to configure your tests. CMSDS scripts supports 2 options for component testing by default, either [Enzyme](https://enzymejs.github.io/enzyme/) or [React Testing Library](https://testing-library.com/).

## Writing documentation

By default the pages that exist in the core design system will be a part of the child design system documentation site. However, content can be overridden at the child design system level. For example, to change the "Installation" page of the child design system doc site under "Getting Started", create a markdown page named `installation.md` under `docs/src/pages/startup` containing your custom content for that particular page. You can reference all the core design system doc site pages [here](https://github.com/CMSgov/design-system/tree/master/packages/design-system-docs/src/pages).

**Note:** The page name must have the same name and same location as the original page for it to be overridden at a child design system level.

If you are writing a content only page then you should be creating a Markdown (`.md`) file. However if you are writing documentation for a component, pattern or utility you should follow the [KSS format outlined for writing component documentation](https://github.com/CMSgov/design-system/blob/master/guides/WRITING-DOCUMENTATION.md).

We have also provided example documentation for an overridden `Button` component, a new `Card` component, and a new `border-style` utility for reference.

### Publishing your child design system doc site

We suggest publishing the doc site to Github Pages using the [`gh-pages` package](https://www.npmjs.com/package/gh-pages). Once that package is installed, simply run `gh-pages -d ./docs/dist` to publish.
