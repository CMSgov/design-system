# CMS Design System [![Build Status](https://travis-ci.org/CMSgov/design-system.svg?branch=master)](https://travis-ci.org/CMSgov/design-system)

> The design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the U.S. Web Design Standards and extends it to support additional CSS and React components, utility classes, and a grid framework to allow teams to quickly prototype and build accessible, responsive, production-ready websites.

## Packages

You're currently at the root of a monorepo which contains multiple NPM packages located in [`packages` directory](packages/). View the `README.md` in each of these for additional details.

| Name                         | Description                                                                                                                                                                                                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Core](packages/core/)       | The core CSS and React components for the design system. Includes the Support package. <br> [![@cmsgov/design-system-core](https://img.shields.io/npm/v/@cmsgov/design-system-core.svg?label=@cmsgov%2Fdesign-system-core)](https://www.npmjs.com/package/@cmsgov/design-system-core) |
| [Layout](packages/layout/)   | A responsive flexbox grid framework. <br> [![@cmsgov/design-system-layout](https://img.shields.io/npm/v/@cmsgov/design-system-layout.svg?label=@cmsgov%2Fdesign-system-layout)](https://www.npmjs.com/package/@cmsgov/design-system-layout)                                           |
| [Support](packages/support/) | Sass variables, mixins, and functions. Included in the Core package. <br> [![@cmsgov/design-system-support](https://img.shields.io/npm/v/@cmsgov/design-system-support.svg?label=@cmsgov%2Fdesign-system-support)](https://www.npmjs.com/package/@cmsgov/design-system-support)       |

**Internal packages**

These packages are project dependencies, mostly focused around the design system's developer tooling and documentation.

| Name                                                         | Description                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Documentation site](packages/docs/)                         | This directory contains code related to the documentation website. Unless you're a contributor, this directory isn't that interesting to you.                                                                                                                                                                  |
| [ESLint config](packages/eslint-config-design-system/)       | The ESLint rules we use to lint the design system's JS and React components <br> [![@cmsgov/eslint-config-design-system](https://img.shields.io/npm/v/@cmsgov/eslint-config-design-system.svg?label=@cmsgov%2Feslint-config-design-system)](https://www.npmjs.com/package/@cmsgov/eslint-config-design-system) |
| [Stylelint config](packages/stylelint-config-design-system/) | The Stylelint rules we use to lint the design system's Sass <br> [![@cmsgov/stylelint-config-design-system](https://img.shields.io/npm/v/@cmsgov/stylelint-config-design-system.svg?label=@cmsgov%2Fstylelint-config-design-system)](https://www.npmjs.com/package/@cmsgov/stylelint-config-design-system)     |
| [Yeoman generator](packages/generator-cmsgov/)               | A [Yeoman](http://yeoman.io/) generator used in the development process. Again, unless you're a contributor, this directory isn't that interesting to you.                                                                                                                                                     |

## Examples

Examples of the design system in use can be found in the [`examples` directory](examples/).

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) document to learn about contributing to the design system, and our coding guidelines.

## Running locally

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps to ensure everyone is using the same package versions. [**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

### Getting started

1. `yarn install`
   - This will also run [Lerna](https://lernajs.io/) `bootstrap` which allows us to have multiple packages within the same repo (a monorepo). Lerna installs all our dependencies and symlinks any cross-dependencies.
1. `yarn start`

_Note_: When you create a Git commit, any staged scripts will be automatically ran through ESLint and Prettier. If the linter catches an error, your commit will fail. This is a feature, not a bug :)

### Scripts

These scripts can all be run from the root level of the repo:

- `yarn start`
  - Starts local server running the documentation site
  - Regenerates documentation when files change
- `yarn build`
  - Compile/transpile/uglify everything and makes things release-ready.
- `yarn bump`
  - Increments package versions. Read "[Versioning](/guides/RELEASE-PROCESS.md#versioning)" for more info.
- `yarn generate`
  - Generates the necessary files for a new core component
  - Alias: `yarn g`
- `yarn test`
  - Runs JS unit tests
  - Lints JS using ESLint
  - Lints Sass using stylelint
- `yarn test:e2e`
  - Runs end to end tests
- `yarn test:e2e packages/core/Autocomplete`
  - Runs a single end to end test, this example runs Autocomplete
- `yarn test:watch`
  - Runs JS unit tests and will continue to run tests as files change
- `yarn update-snapshots`
  - Updates [Jest snapshots](http://facebook.github.io/jest/docs/en/snapshot-testing.html)
- `yarn lint`
  - Runs just the linting portion of the tests

#### Theme scripts

You can also use the following scripts to [build and preview a theme](https://design.cms.gov/startup/site-package/):

- `yarn start:theme`
- `yarn build:theme`

These scripts will also place the documentation into a `docs` subdirectory in your theme's directory.

If you have multiple directories inside of `packages/themes`, you can specify which theme to use by passing the scripts the name of the folder. For example: `yarn start:theme my-theme-folder-name`

If your documentation site will be uploaded to a subdirectory (ie. example.com/design-system), you can set its root path by passing the `--root` option. For example: `yarn build:theme --root design-system`

### Visual regression testing

We're using [backstopJS](https://github.com/garris/BackstopJS) for visual regression testing. Here's how to run the tests.

- Install backstopJS `yarn install`
- Run the site locally `yarn start`
- In a new terminal window run the backstop tests `backstop test`
  - This will test the local CMSDS documentation site against the CMSDS production documentation site
- After the tests run an html report will open in your browser showing passed and failed tests
- When introducing a visual change, run `backstop approve` to commit new reference files after confirming the change with `backstop test`

**Note:** Use `backstop reference` to update and replace all reference files.

## Contact

To contact the CMS Design System product owners, please email `WPMG_Web@cms.hhs.gov`

One of our goals is to ensure a welcoming environment for all contributors. Please take a look at our [Code of Conduct](CODE-OF-CONDUCT.md) to learn more.
