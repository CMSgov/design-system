# CMS Design System

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

You're currently at the root of a monorepo containing multiple NPM packages located in the [`packages` directory](packages/). View the `README.md` in each of these for additional details.

| Name                                                       | Description                                                                                                                                                                                                                              |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CMS Design System](packages/design-system)                | The core CSS, JS, and React components for the design system. <br> [![@cmsgov/design-system](https://img.shields.io/npm/v/@cmsgov/design-system.svg?label=@cmsgov%2Fdesign-system)](https://www.npmjs.com/package/@cmsgov/design-system) |
| [Healthcare.gov Design System](packages/ds-healthcare-gov) | Design system used by application teams at healthcare.gov <br> [![npm](https://img.shields.io/npm/v/@cmsgov/ds-healthcare-gov.svg?label=@cmsgov%2Fds-healthcare-gov)](https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov)           |
| [Medicare.gov Design System](packages/ds-medicare-gov)     | Design system used by application teams at medicare.gov <br> [![npm](https://img.shields.io/npm/v/@cmsgov/ds-medicare-gov.svg?label=@cmsgov%2Fds-medicare-gov)](https://www.npmjs.com/package/@cmsgov/ds-medicare-gov)                   |
| [CMSDS Documentation](packages/docs)                       | Gatsby based CMSDS Documentation site.                                                                                                                                                                                                   |

## Running locally

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps to ensure everyone is using the same package versions. [**Install Yarn**](https://yarnpkg.com/cli/install), if you don't have it yet.

_Note_: When you create a Git commit, any staged scripts will be automatically ran through ESLint and Prettier. If the linter catches an error, your commit will fail. This is a feature, not a bug :)

### Scripts

These scripts can all be run from the root level of the repo:

- `yarn install`
  - Note that because we use [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/), our design system packages are symlinked in the root `node_modules` directory to be used directly by our other packages. This means that the `ds-healthcare-gov` package always uses the most up-to-date version of our local `design-system` package, and so on.
- `yarn build`
  - Compiles everything and makes things release-ready
  - Building is required to get TypeScript completion for the core package in child design system packages
- `yarn build:{core,cmsgov,healthcare,medicare}`
  - Builds a specific brand of the design system and its corresponding package
- `yarn build:docs`
  - Statically builds a copy of the doc site
  - You can then serve it with `yarn serve:docs`
- `yarn build:storybook`
  - Statically builds a copy of Storybook to `./storybook-static`
  - You can then serve it with `yarn serve:storybook`
  - For development, just use `yarn storybook`
- `yarn build:examples`
  - Statically builds a copy of the example projects in `./examples`
  - You can then serve them with `yarn serve:examples`
  - Alternatively you can build and run individual examples. See the README in [examples directory](examples/) for more details.
- `yarn start`
  - Starts local server running the documentation site
  - Regenerates documentation when files change
  - **Before** running `start` run the `build` command
- `yarn storybook`
  - Starts storybook for easier local development for the core package
  - `yarn storybook:react` starts Storybook with React instead of Preact
- `yarn test`
  - Alias of `yarn test:unit`
- `yarn test:unit`
  - Runs JS unit tests for all packages
  - `yarn test:unit -u` updates [Jest snapshots](http://facebook.github.io/jest/docs/en/snapshot-testing.html)
  - `yarn test:unit:preact` runs the unit tests in Preact mode
  - `yarn test:unit:wc` runs the unit tests for the web components, which have to run in Preact mode
- `yarn test:browser`
  - Runs accessibility and visual-regression tests using [Playwright](https://playwright.dev/). See [Visual regression testing](#visual-regression-testing) section below for details. This is the base command that defaults to the basic tests that cover Storybook stories, but we have several different kinds of browser tests under different sub-commands.
  - Note that this command will [accept any arguments that Playwright accepts](https://playwright.dev/docs/test-cli).
  - `yarn test:browser -u` updates reference screenshots used for visual regression testing. Update these only when we expect the visual changes. You can use this argument on any of the browser-test sub-commands to update snapshots for specific kinds of tests.
  - `yarn test:browser --no-build` will skip building the tests' pre-requisites. This is useful if you've already done it and haven't made any changes to the source.
  - `yarn test:browser --grep "Alert"` will only run tests with "Alert" in the name.
  - `yarn test:browser:interaction` runs VRT interaction tests to validate visual state of components after interaction.
  - `yarn test:browser:examples` runs VRT tests for our example projects.
  - `yarn test:browser:storybook-docs` checks for regressions in prop tables in storybook docs.
  - `yarn test:browser:all` runs all of our visual regression tests.
- `yarn lint`
  - Runs just the linting portion of the tests, eslint and stylelint
- `yarn type-check`
  - Checks static TypeScript types. Note that the core package must build successfully for downstream type checks to work.
- `yarn deploy-demo`
  - Builds the doc site locally and deploys it to a branch-specific path on GitHub Pages. The terminal will display the URL where the demo was deployed to after it is done running.
- `yarn release`
  - Interactive script that bumps package versions, tags a release commit, drafts notes, and more. Read our [release guide on Confluence](https://confluence.cms.gov/x/CAsuK) for more info.
  - Note that you need to [have GPG configured with git and GitHub](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account) so it can sign the release tags.
- `yarn release:notes`
  - Interactive script that generates draft release notes and associated ticket information from [GitHub Milestones](https://github.com/CMSgov/design-system/milestones) in the CMSDS public repository.
- `yarn release:patch`
  - Interactive script that collects the merge commits from pull requests associated with a given milestone and cherry-picks them onto the current branch (use with release branch)

### Visual regression testing

We use [Playwright](https://playwright.dev/) to test our components for visual regressions. We have several suites of visual regression tests, but our main suite uses Storybook stories as references. These tests will load a story or other reference material, take a screenshot within a docker container (for consistency), and compare those screenshots with ones previously taken and committed to version control.

Tests can be run in a docker container or out, but we only check in VRT reference images taken inside the docker container, because taking them outside of a container will produce inconsistent results from machine to machine. The reason you might run them outside of docker is if you're working on the tests themselves and want to run in headful mode so you can see what's happening and troubleshoot Note that updating the visual regression test reference images locally requires that you be signed into Docker.

There are a lot of tests, so it can be helpful to constrain the tests you run locally by [using Playwright's `--grep` argument](https://playwright.dev/docs/test-cli).

#### Updating the visual regression tests with Docker:

1. Open the Docker app, and make sure you're signed in (Docker Desktop requires a license now).
2. Run `yarn test:browser` to begin comparing component images
   1. If differences are detected and unexpected, evaluate your changes - we only want to update and commit references when we expect the visual changes detected.
   2. If differences are detected and expected, run `yarn test:browser -u`, verify the changes, and then commit them.

#### Development outside of Docker:

- Run any of the browser-test sub-commands with the `--no-docker` flag, like `yarn test:browser:examples --no-docker`.
- If you've never installed Playwright, running the `yarn test:browser` command will prompt you to install it, which you will want to do. The reason we don't need it installed when running it in Docker is because the Docker image contains all of its own dependencies.
- Because snapshots will probably fail outside of the Docker container, pass `--ignore-snapshots` if you want to just see that the tests execute properly.
- You can turn off headless mode by using Playwright's `--headed` flag.
- Playwright's `--debug` flag is another helpful argument because it will pause and allow you to step through the tests.
- Don't forget that you can run a subset of tests by using Playwright's `--grep` argument.
- Remember that passing `--no-build` will skip re-building the source material like Storybook stories if you haven't made any changes to them and are only changing the tests themselves.
- Here's an example of a command you might run to debug the dropdown tests: `yarn test:browser:interaction --no-docker --no-build --headed --debug --ignore-snapshots --grep "Dropdown"`

## Design Assets

As of {MONTH}, 2024 the CMS Design System is using Figma as its primary design software. Designs existing in Sketch will continue to exist for a period of time. No new designs will be represented in Sketch, and links to Sketch design files will remain on the Doc Site until all teams are using Figma.

The CMS Design System provides a Figma file and library containing components, styles, and design tokens. These assets are regularly updated alongside the codebase, and updates are automatically synced for designers using the Figma Library, across all CMS brands.

We use Figma's multi-mode variable system to define theme variants for each of our theme-level tokens. These theme-level tokens can be used in our shared design library. Tokens can be edited by developers comfortable with JSON, and by designers using Figma's variable tables. Changes to tokens can be synced both ways: from the code repository to Figma, and from Figma to the code repository.

## Examples

Examples of the design system in use can be found in the [`examples` directory](examples/).

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) document to learn about contributing to the design system, and our coding guidelines.

## Contact

To get in touch with the CMS Design System team, please visit [design.cms.gov/contact](https://design.cms.gov/contact) for a list of ways to contact us.

One of our goals is to ensure a welcoming environment for all contributors. Please take a look at our [Code of Conduct](CODE-OF-CONDUCT.md) to learn more.
