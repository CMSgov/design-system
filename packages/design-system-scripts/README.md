This package contains shared scripts and tooling for CMS design systems. It includes scripts for the following:

- Compiling & minifying design system files
- Building & watching documentation site files
- Running unit & a11y tests

## Installation

This package is intended to be used with the `design-system-docs` package.

```
npm install --save @cmsgov/design-system-docs
npm install --save @cmsgov/design-system-scripts
```

## Usage

Run the design system scripts using the `cmsds` command:

```
yarn cmsds
npx cmsds
```

Use the `--help` option to see the full list of available commands, or a specific command’s options

```
yarn cmsds --help
yarn cmsds build --help
```

Available commands:

- `yarn cmsds build` - Builds the JavaScript and Sass for your main design system package.
- `yarn cmsds build-docs` - Builds your main design system package and its corresponding documentation site.
- `yarn cmsds start` - Builds and hosts the documentation site, automatically rebuilds and refreshes when changes are detected
- `yarn cmsds test` - Runs unit tests
- `yarn cmsds test:a11y` - Runs end to end tests

See the npm scripts in our [package.json](https://github.com/CMSgov/design-system/blob/main/package.json) for an example of how these scripts are used in the core CMS Design System.

## Bugs and contributions

Please [submit an issue on GitHub](https://github.com/CMSgov/design-system) for any bugs or feature requests.

You can also read our [CONTRIBUTING.md](https://github.com/CMSgov/design-system/blob/main/CONTRIBUTING.md) document to learn about setting up a local development environment, contributing to the design system, and our coding guidelines.
