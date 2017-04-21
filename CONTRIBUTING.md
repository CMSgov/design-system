## Running locally

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps ensure everyone is using the same package versions. If you've used NPM before, you'll have no trouble using Yarn.

[**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

### Getting started

1. `yarn install`
1. `yarn bootstrap:yarn`

The `bootstrap:yarn` command runs [`yerna`](https://github.com/palantir/yerna) which allows us to have multiple packages within the same repo (a monorepo). Yerna installs all our dependencies and links any cross-dependencies. If you're using `npm` rather than `yarn`, there is also a `bootstrap:npm` command.

_Note_: `yerna` will become obsolete once [Lerna](https://lernajs.io/) [is merged into Yarn](https://github.com/yarnpkg/yarn/issues/946#issuecomment-264597575).

### Scripts

Additional scripts exist and can all be run from the root level of the repo:

- `yarn run start` - You'll want to run this when you're developing components. It compiles Sass, transpiles JavaScript, and runs a local documentation instance where you can preview changes.
- `yarn run build` - compile/transpile/uglify everything and makes things release-ready.
- `yarn run bump` - increments package versions. Read "[Versioning](https://github.com/CMSgov/design-system/wiki/Versioning)" for more info.
- `yarn run generate` - Generates the necessary files for a new core component
  - `yarn run g` - Alias for `yarn run generate`
- `yarn test` - tests and lints the codebase.

## Development process

1. Branch off of `staging`: `git checkout -b username/branch-name`.
1. Commit your changes
1. Make a pull request against the `staging` branch and format your pull request description using the following format:
  - **Added:** for new features or components. _Include a screenshot for new visual elements._
  - **Changed:** for changes in existing functionality or design. If the change was visual, _include a comparison screenshot showing the before and after the visual change._
  - **Deprecated:** for once-stable features or components removed in upcoming releases.
  - **Removed:** for deprecated features or components removed in this release.
  - **Fixed:** for any bug fixes.

## Merging pull requests

#### Staging

Use the "**Squash and merge**" option when merging pull requests into the `staging` branch. This keeps our history clean and makes it easier on us when it comes time to create a new release.

#### Master

Use the "**Create a merge commit**" option when merging `staging` into `master`. If the pull request includes a version bump, set the commit title to the version number and include the PR # in the commit description.

## Additional guidelines

**[Please view the Wiki](https://github.com/CMSgov/design-system/wiki)** for additional information like:

- Coding guidelines
- Guiding principles
- How to write documentation
- etc.