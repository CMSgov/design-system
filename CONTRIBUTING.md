## Running locally

### Package management

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps ensure everyone is using the same package versions. If you've used NPM before, you'll have no trouble using Yarn.

[**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

#### Install dependencies

```
yarn bootstrap
```

The `bootstrap` command runs [`yerna`](https://github.com/palantir/yerna) which allows us to have multiple packages within the same repo. Yerna installs all our dependencies and links any cross-dependencies.

_Note_: `yerna` will become obsolete once [Lerna](https://lernajs.io/) [is merged into Yarn](https://github.com/yarnpkg/yarn/issues/946#issuecomment-264597575).

### Scripts

- `yarn run build` compiles everything and makes things production-ready
- `yarn run prerelease` increments the package versions. Read the [Versioning](/CMSgov/design-system/wiki/Versioning) wiki page for more info.
- `yarn run start` runs a Browsersync server for the documentation, and compiles a file when it changes.
- `yarn test` runs all tests using [Jest](https://facebook.github.io/jest/).

### Coding guidelines

The CSS coding guidelines for this project try to stay as consistent with [those used by 18F](https://github.com/18F/stylelint-rules). In some cases we've made the decision to be more strict than 18F, using some of [GitHub's stylelint guidelines](https://github.com/primer/stylelint-config-primer). You can [view a full list of stylelint rules here](https://stylelint.io/user-guide/rules).

JavaScript coding guidelines are enforced using the [default ESLint ruleset](https://github.com/eslint/eslint/blob/master/conf/eslint.json), along with [Nava's default ruleset](https://github.com/navahq/eslint-config-nava). You can [view a full list of ESLint rules here](http://eslint.org/docs/rules/).

These should be treated as guides — rules can be modified according to project needs.
