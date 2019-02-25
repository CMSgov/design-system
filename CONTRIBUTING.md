## Welcome!

We're excited you're considering contributing to our design system. If you have a question, noticed a bug, or have suggestions, then please submit an issue or create a pull request.

One of our goals is to ensure a welcoming environment for all contributors. Please take a look at our [Code of Conduct](CODE_OF_CONDUCT.md) to learn more.

Below you'll find information on how to setup a local development environment and how to contribute code to the design system.

### Additional information

In **[our Wiki](https://github.com/CMSgov/design-system/wiki)** you can find additional information like:

* Pattern proposal process
* Coding guidelines
* Guiding principles
* How to write documentation
* etc.

## Running locally

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps ensure everyone is using the same package versions. If you've used NPM before, you'll have no trouble using Yarn.

[**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

### Getting started

1. `yarn install`
   * This will also run [Lerna](https://lernajs.io/) `bootstrap` which allows us to have multiple packages within the same repo (a monorepo). Lerna installs all our dependencies and symlinks any cross-dependencies.
1. `yarn start`

_Note_: When you create a Git commit, any staged scripts will be automatically ran through ESLint and Prettier. If the linter catches an error, your commit will fail. This is a feature, not a bug :)

### Scripts

These scripts can all be run from the root level of the repo:

* `yarn start`
  * Starts local server running the documentation site
  * Regenerates documentation when files change
* `yarn build`
  * Compile/transpile/uglify everything and makes things release-ready.
* `yarn bump`
  * Increments package versions. Read "[Versioning](https://github.com/CMSgov/design-system/wiki/Versioning)" for more info.
* `yarn generate`
  * Generates the necessary files for a new core component
  * Alias: `yarn g`
* `yarn test:unit`
  * Runs JS unit tests
* `yarn test:e2e`
  * Builds documentation pages, starts webserver and headless Chrome browser
  * Runs JS e2e tests
  * Quits webserver and Chrome headless browser
* `yarn test:e2e:skipBuild`
  * Skips building documentation pages, starts webserver and headless Chrome browser
  * Runs JS e2e tests
  * Quits webserver and Chrome headless browser
* `yarn test`
  * Runs JS unit tests
  * Runs JS e2e tests
  * Lints JS using ESLint
  * Lints Sass using stylelint
* `yarn update-snapshots`
  * Updates [Jest snapshots](http://facebook.github.io/jest/docs/en/snapshot-testing.html)
* `yarn lint`
  * Runs just the linting portion of the tests

#### Theme scripts

You can also use the following scripts to [preview and build a theme](https://github.com/CMSgov/design-system/wiki/site-packages-and-themes):

* `yarn start:theme`
* `yarn build:theme`

These scripts will also place the documentation into a `docs` subdirectory in your theme's directory.

If you have multiple directories inside of `packages/themes`, you can specify which theme to use by passing the scripts the name of the folder. For example: `yarn start:theme my-theme-folder-name`

If your documentation site will be uploaded to a subdirectory (ie. example.com/design-system), you can set its root path by passing the `--root` option. For example: `yarn build:theme --root design-system`

## Submitting a pull request

Here are a few guidelines to follow when submitting a pull request:

* Branch off of `master`: `git checkout -b username/branch-name`
* Commit your changes
* Make a pull request against the `master` branch

## Licenses and attribution

### A few parts of this project are not in the public domain

For complete attribution and licensing information for parts of the project that are not in the public domain, see `LICENSE.md`.

### The rest of this project is in the public domain

The rest of this project is in the worldwide public domain.

This project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

### Contributions will be released into the public domain

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.
