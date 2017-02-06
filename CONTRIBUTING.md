## Running locally

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps ensure that we're all using the same package versions. If you've used NPM before, you'll have no trouble using Yarn.

[**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

Then, install all dependencies:

```
yarn install
```

The following examples detail a few npm/yarn commands that alias our grunt tasks and that are useful throughout local development:

- `yarn run build` compiles the Less files into CSS and copies static assets into the `dist` directory
- `yarn run watch` watches for any changes that happen in the `src` directory and rebuilds the package if any changes are made.

### Using the local package version

You can symlink the package into a project directory by running the following commands:

1. Within this package's directory, run: `yarn link`
1. Within the project directory where you want to use this package, run `yarn link hcgov-pattern-library`

Now your project is using the local version of the pattern library package, allowing you to update or add components and immediately see the changes in your project.

### Coding guidelines

The CSS coding guidelines for this project try to stay as consistent with [those used by 18F](https://github.com/18F/stylelint-rules). In some cases we've made the decision to be even more strict than 18F, using some of [GitHub's stylelint guidelines](https://github.com/primer/stylelint-config-primer). You can [view a full list of stylelint rules here](https://stylelint.io/user-guide/rules).

JavaScript coding guidelines are enforced using the [default ESLint ruleset](https://github.com/eslint/eslint/blob/master/conf/eslint.json), along with [Nava's default ruleset](https://github.com/navahq/eslint-config-nava). You can [view a full list of ESLint rules here](http://eslint.org/docs/rules/).

These should be treated as guides — rules can be modified according to project needs.