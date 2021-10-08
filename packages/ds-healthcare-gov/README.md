# HealthCare.gov Design System

[![npm](https://img.shields.io/npm/v/@cmsgov/ds-healthcare-gov.svg?label=@cmsgov%2Fds-healthcare-gov)](https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov)

[>> **View the full documentation site here** <<](https://cmsgov.github.io/hcgov-design-system/)

The _HealthCare.gov Design System_ contains shared design and front-end development resources for Healthcare.gov applications, and is built on top of the [CMS Design System](https://design.cms.gov/) (CMSDS). As a _child design system_, it inherits base styles, components, and guidance from the CMS Design System, while also adding its own features and customizations.

## Usage

For documentation on installation and usage, please refer to [our documentation site](https://cmsgov.github.io/hcgov-design-system/startup/installation/).

## Contributing

This site-wide design system has a much smaller group of users than the core CMS Design System. It's up to us to make it useful for our apps. It is a place to share code and collaborate across teams. It is our collective source of truth for design. If you want to contribute but need help getting started, shout in the [`#hcgov-design-system` channel](https://cmsgov.slack.com/archives/C0111BVM1LZ) on the CMS Slack or open up an issue on this repo.

## Running locally

This project uses [Yarn](https://yarnpkg.com/) for package management. Yarn helps to ensure everyone is using the same package versions. [**Install Yarn**](https://yarnpkg.com/docs/install), if you don't have it yet.

### Getting started

1. `yarn install`
1. `yarn start`

_Note_: When you create a Git commit, any staged scripts will be automatically run through ESLint and Prettier. If the linter catches an error, your commit will fail. This is a feature, not a bug :)

### Scripts

These scripts can all be run from the root level of the repo:

- `yarn start`
  - Starts local server running the documentation site
  - Regenerates documentation when files change
- `yarn build`
  - Compiles and processes all the code and assets and copies them to the `dist` directory so that they're ready for distribution and consumption as a package
- `yarn test`
  - Runs JS unit tests
- `yarn test:e2e`
  - Runs end to end tests
- `yarn update-snapshots`
  - Updates [Jest snapshots](http://facebook.github.io/jest/docs/en/snapshot-testing.html)
- `yarn lint`
  - Runs Prettier for formatting
  - Lints JS using ESLint
  - Lints Sass using stylelint
- `yarn gh-pages`
  - Builds the documentation site and publishes it to GitHub Pages
  - Note that it operates from your local version, so whatever version you have checked out will be built and deployed to GitHub Pages
  - See [PUBLISHING.md](PUBLISHING.md) for instructions
- `yarn release`
  - Builds a release and publishes to NPM
  - See [PUBLISHING.md](PUBLISHING.md) for instructions

## Building on top of the CMS Design System

As a child design system, the Healthcare.gov Design System shares the same tooling and organization as the CMSDS. For more information on how to extend and customize SASS, JS, and documentation, check out the [child design system example and its documentation](https://github.com/CMSgov/design-system/tree/master/examples/child-design-system).

## Who’s using the Healthcare.gov design system
The design system is currently being applied to some pages on HealthCare.gov and project teams are actively working to apply the design system consistently across all of HealthCare.gov.

- [Find Local Help](https://localhelp.healthcare.gov/#/)
- [Tax Tools](https://www.healthcare.gov/tax-tool/#/)
- [Window Shop](https://healthcare.gov/see-plans)
