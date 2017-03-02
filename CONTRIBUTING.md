## Development process

1. Branch off of `staging`: `git checkout -b username/branch-name`.
1. Commit your changes
1. Make a pull request against the `staging` branch and format your pull request description using the following format:
  - **Added:** for new features or components.
  - **Changed:** for changes in existing functionality or design.
  - **Deprecated:** for once-stable features or components removed in upcoming releases.
  - **Removed:** for deprecated features or components removed in this release.
  - **Fixed:** for any bug fixes.

## Running locally

### Package management

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps ensure everyone is using the same package versions. If you've used NPM before, you'll have no trouble using Yarn.

[**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

#### Install build process dependencies

```
yarn install
```

#### Install package dependencies

```
yarn bootstrap
```

The `bootstrap` command runs [`yerna`](https://github.com/palantir/yerna) which allows us to have multiple packages within the same repo. Yerna installs all our dependencies and links any cross-dependencies.

_Note_: `yerna` will become obsolete once [Lerna](https://lernajs.io/) [is merged into Yarn](https://github.com/yarnpkg/yarn/issues/946#issuecomment-264597575).

### Scripts

- `yarn run start` - You'll want to run this when you're developing components. It compiles Sass, transpiles JavaScript, and runs a local documentation instance where you can preview changes.
- `yarn run build` - compile/transpile/uglify everything and makes things release-ready.
- `yarn run prerelease` - increments package versions. Read "[Versioning](https://github.com/CMSgov/design-system/wiki/Versioning)" for more info.
- `yarn test` - tests the codebase.

### Coding guidelines

The CSS coding guidelines for this project try to stay as consistent with [those used by 18F](https://github.com/18F/stylelint-rules). In some cases we've made the decision to be more strict than 18F, using some of [GitHub's stylelint guidelines](https://github.com/primer/stylelint-config-primer). You can [view a full list of stylelint rules here](https://stylelint.io/user-guide/rules).

JavaScript coding guidelines are enforced using the [default ESLint ruleset](https://github.com/eslint/eslint/blob/master/conf/eslint.json), along with [Nava's default ruleset](https://github.com/navahq/eslint-config-nava). You can [view a full list of ESLint rules here](http://eslint.org/docs/rules/).

These should be treated as guides — rules can be modified according to project needs.
