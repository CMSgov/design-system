# Medicare.gov Design System

[![npm](https://img.shields.io/npm/v/@cmsgov/ds-medicare-gov.svg?label=@cmsgov%2Fds-medicare-gov)](https://www.npmjs.com/package/@cmsgov/ds-medicare-gov)

[>> **View the full documentation site here** <<](https://github.cms.gov/pages/MedicareGov/mgov-design-system/)

The _Medicare.gov Design System_ contains shared design and front-end development resources for Medicare.gov applications, and is built on top of the [CMS Design System](https://design.cms.gov/) (CMSDS). As a _child design system_, it inherits base styles, components, and guidance from the CMS Design System, while also adding its own features and customizations.

## Usage

`yarn add @cmsgov/ds-medicare-gov`

For full documentation on installation and usage in your Medicare.gov product, please refer to [our documentation site](https://github.cms.gov/pages/MedicareGov/mgov-design-system/startup/installation/).

## Contributing

This site-wide design system has a much smaller group of users than the core CMS Design System. It's up to us to make it useful for our apps. It is a place to share code and collaborate across teams. It is our collective source of truth for design. If you want to contribute but need help getting started, shout in the [`#mgov-design-system` Slack channel](https://cmsgov.slack.com/archives/C010T7LE5RC) on the CMS Slack or open up an issue on this repo.

## Running locally
  * Install the latest stable version of [Node.js](https://nodejs.org/)
  * Install Node.js via Node Version Manager [nvm](https://github.com/creationix/nvm) (recommended but not required). Run `nvm use` to easily use the correct node version for this repository. 
  * Install [Yarn](https://yarnpkg.com/docs/install) for package management. Yarn helps to ensure everyone is using the same package versions.

### Getting started

1. `yarn install`
1. `yarn start` - Will run the site locally at http://localhost:3000/


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

## Building on top of the CMS Design System


As a child design system, the Medicare.gov Design System shares the same tooling and organization as the CMSDS. For more information on how to extend and customize SASS, JS, and documentation, check out the [child design system example and its documentation](https://github.com/CMSgov/design-system/tree/master/examples/child-design-system).

### Updating the CMS Design System in the Medicare Design System

The Medicare Design System depends on updates from the CMSDS. It is good practice to update the MDS when there are new releases to the CMSDS. Monitor the [CMSDS repository](https://github.com/CMSgov/design-system/releases) for the latest release. Follow these steps to update the CMSDS version in the Medicare Design System:
- Update the following packages in the package.json file to the latest CMSDS version number.
 - devDependencies
  - `@cmsgov/design-system-docs`
  - `@cmsgov/design-system-scripts`
 - dependencies
  - `@cmsgov/design-system`
- Run `Yarn install`
- Make sure your yarn.lock file is updated.
- Run `yarn start` to verify there are no breaking changes.

## Design assets

You can find the Medicare design system Sketch file and related fonts in the [design-assets folder](https://github.com/CMSgov/mgov-design-system/tree/master/design-assets).

You can also view the [Medicare InVision Design System Manager design assets](https://cms.invisionapp.com/dsm/cms/medicare?mode=edit). 

---
### Additional links

- For more information on the original Design System, check out [its GitHub page](https://github.com/cmsgov/design-system).

## Who’s using the Medicare.gov design system

The design system is currently being applied to some pages on Medicare.gov and project teams are actively working to apply the design system consistently across additional Medicare products.

* [Medicare Plan Compare](https://www.medicare.gov/plan-compare/).
