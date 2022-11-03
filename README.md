# CMS Design System

> The design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the [U.S. Web Design System](https://designsystem.digital.gov/) and extends it to support additional CSS and React components, utility classes, and a grid framework to allow teams to quickly prototype and build accessible, responsive, production-ready websites.

test

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

You're currently at the root of a monorepo containing multiple NPM packages located in the [`packages` directory](packages/). View the `README.md` in each of these for additional details.

| Name                                                       | Description                                                                                                                                                                                                                              |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CMS Design System](packages/design-system)                | The core CSS, JS, and React components for the design system. <br> [![@cmsgov/design-system](https://img.shields.io/npm/v/@cmsgov/design-system.svg?label=@cmsgov%2Fdesign-system)](https://www.npmjs.com/package/@cmsgov/design-system) |
| [Healthcare.gov Design System](packages/ds-healthcare-gov) | Design system used by application teams at healthcare.gov <br> [![npm](https://img.shields.io/npm/v/@cmsgov/ds-healthcare-gov.svg?label=@cmsgov%2Fds-healthcare-gov)](https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov)           |
| [Medicare.gov Design System](packages/ds-medicare-gov)     | Design system used by application teams at medicare.gov <br> [![npm](https://img.shields.io/npm/v/@cmsgov/ds-medicare-gov.svg?label=@cmsgov%2Fds-medicare-gov)](https://www.npmjs.com/package/@cmsgov/ds-medicare-gov)                   |
| [CMSDS Documentation](packages/docs)                       | Gatsby based CMSDS Documentation site.                                                                                                                                                                                                   |

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
  - `yarn build:healthcare` to build the Healthcare.gov Design System
  - `yarn build:medicare` to build the Medicare.gov Design System
- `yarn build:storybook:docs && yarn build:docs`
  - Builds the docs site statically
- `yarn storybook`
  - Starts storybook for easier local development for the core package
  - `yarn storybook:healthcare` starts storybook for healthcare stories & styles
  - `yarn storybook:medicare` starts storybook for medicare stories & styles
- `yarn test`
  - Runs JS unit tests
  - Runs a11y accessibility tests against core storybook stories
- `yarn test:unit`
  - Runs JS unit tests for all packages
  - `yarn test:unit:update` updates [Jest snapshots](http://facebook.github.io/jest/docs/en/snapshot-testing.html)
- `yarn test:a11y`
  - Runs accessibility tests for design-system package only
  - `yarn test:a11y:healthcare` to run the Healthcare.gov Design System's accessibility tests
  - `yarn test:a11y:medicare` to run the Medicare.gov Design System's accessibility tests
- `yarn test:browser`
  - Runs visual regression tests using [Playwright](https://playwright.dev/). See [Visual regression testing](#visual-regression-testing) section below for details.
  - Note that you need to build Storybook statically (`yarn build:storybook`) before you can run the tests
  - `yarn test:browser:update` updates reference screenshots used for visual regression testing. Update these only when we expect the visual changes
  - `yarn test:browser --project <name>` runs only one of the named projects found in [playwright.config.ts](/tests/browser/playwright.config.ts)
- `yarn lint`
  - Runs just the linting portion of the tests, eslint and stylelint
- `yarn deploy-demo`
  - Builds the doc site locally and deploys it to a branch-specific path on GitHub Pages. The terminal will display the URL where the demo was deployed to after it is done running.
- `yarn release`
  - Bumps package versions and tags a release commit. Read our [release guide on Confluence](https://confluence.cms.gov/x/CAsuK) for more info.

### Visual regression testing

We use [Playwright](https://playwright.dev/) to test our components for visual regressions. It uses our existing Storybook stories, taking screenshots of them within a docker container and comparing those screenshots with ones previously taken and committed to version control. The tests assume that Storybook has been built to `./storybook-static` using `yarn build:storybook`.

Running the browser tests locally requires that you be signed into Docker.

1. Open the Docker app, and make sure you're signed in (Docker Desktop requires a license now)
2. Run `yarn test:browser` to begin comparing component images
   1. If differences are detected and unexpected, evaluate your changes - we only want to update and commit references when we expect the visual changes detected
   2. If differences are detected and expected, run `yarn test:browser:update`

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
