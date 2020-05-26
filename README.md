# CMS Design System [![Build Status](https://travis-ci.org/CMSgov/design-system.svg?branch=master)](https://travis-ci.org/CMSgov/design-system)

> The design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the [U.S. Web Design System](https://designsystem.digital.gov/) and extends it to support additional CSS and React components, utility classes, and a grid framework to allow teams to quickly prototype and build accessible, responsive, production-ready websites.

## Contents

- [Packages](#packages)
- [Running locally](#running-locally)
  - [Getting started](#getting-started)
  - [Scripts](#scripts)
  - [Visual regression testing](#visual-regression-testing)
- [Design assets](#design-assets)
- [Examples](#examples)
- [Contributing](#contributing)
- [Contact](#contact)

## Packages

You're currently at the root of a monorepo containing multiple NPM packages located in the [`packages` directory](packages/). Unless you're a contributor or a child design system maintainer, you can ignore the `@cmsgov/design-system-docs` and `@cmsgov/design-system-scripts` packages, as they are mostly focused on the design system's developer tooling and documentation. View the `README.md` in each of these for additional details.

| Name                                                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CMS Design System](packages/design-system)                | The core CSS, JS, and React components for the design system. <br> [![@cmsgov/design-system](https://img.shields.io/npm/v/@cmsgov/design-system.svg?label=@cmsgov%2Fdesign-system)](https://www.npmjs.com/package/@cmsgov/design-system)                                                                                                                                                                                                                       |
| [Design System Documentation](packages/design-system-docs) | Markdown files containing documentation for the core design system site. These files are used by `@cmsgov/design-system-scripts` to generate our documentation site. <br> [![@cmsgov/design-system](https://img.shields.io/npm/v/@cmsgov/design-system.svg?label=@cmsgov%2Fdesign-system-docs)](https://www.npmjs.com/package/@cmsgov/design-system-docs)                                                                                                      |
| [Design System Scripts](packages/design-system-docs)       | Scripts for compiling, testing, and linting design system assets. Also contains scripts for building and serving the documentation site. This is used internally by the core CMS design system team, but is made publicly for child design systems. <br> [![@cmsgov/design-system-scripts](https://img.shields.io/npm/v/@cmsgov/design-system-scripts.svg?label=@cmsgov%2Fdesign-system-scripts)](https://www.npmjs.com/package/@cmsgov/design-system-scripts) |

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
- `yarn release`
  - Increments package versions and publishes npm packages. Read our [Release Process guide](/guides/RELEASE-PROCESS.md) for more info.
- `yarn test`
  - Runs JS unit tests
  - Runs Prettier for formatting
  - Lints JS using ESLint
  - Lints Sass using stylelint
- `yarn test:e2e`
  - Runs end to end tests
- `yarn update-snapshots`
  - Updates [Jest snapshots](http://facebook.github.io/jest/docs/en/snapshot-testing.html)
- `yarn lint`
  - Runs just the linting portion of the tests

### Visual regression testing

In addition to unit and e2e tests, we're using [backstopJS](https://github.com/garris/BackstopJS) for visual regression testing. Here's how to run the tests.

- Install backstopJS `yarn install`
- Run the site locally `yarn start`
- In a new terminal window run the backstop tests `backstop test`
  - This will test the local CMSDS documentation site against the CMSDS production documentation site
- After the tests run an html report will open in your browser showing passed and failed tests
- When introducing a visual change, run `backstop approve` to commit new reference files after confirming the change with `backstop test`

**Note:** Use `backstop reference` to update and replace all reference files.

## Design Assets

The CMS Design System provides a Sketch file and Sketch Library containing components, styles, and symbols. These are regularly updated alongside our code, and updates are automatically synced for designers using the Sketch Library.

[Read more on using Sketch with the CMS Design System](/design-assets/README.md)

## Examples

Examples of the design system in use can be found in the [`examples` directory](examples/).

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) document to learn about contributing to the design system, and our coding guidelines.

## Contact

To contact the CMS Design System product owners, please email `WPMG_Web@cms.hhs.gov`

One of our goals is to ensure a welcoming environment for all contributors. Please take a look at our [Code of Conduct](CODE-OF-CONDUCT.md) to learn more.
