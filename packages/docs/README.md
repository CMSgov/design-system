# CMS Design System Documentation Site

The Gatsby-powered documentation site for the CMS family of design systems.

## Development

### Scripts

The following scripts can be run from the `packages/docs` folder.

`yarn install`
Installs dependencies for the doc site. Only needs to be run on first spin up of the project, or if new dependencies are installed.

`yarn develop`
Runs the site locally at `http:localhost:8000/`
Also runs the GraphiQL playground at `http://localhost:800/___graphql`.

`yarn build`
This builds a production-ready version of the site that can be deployed.

The following scripts can be run from the root directory.

`yarn install`
Installs dependencies for all packages. Only needs to be run on first spin up of the project, or if new dependencies are installed.

`yarn start:gatsby`
Runs the site locally at `http:localhost:8000/`
Also runs the GraphiQL playground at `http://localhost:800/___graphql`.

`yarn build:gatsby`
This builds a production-ready version of the site that can be deployed.

`yarn serve:gatsby`
This serves the files built from `yarn build:gatsby`.

`yarn build-storybook:gatsby`
This build storybook in production mode and moves files to `packages/docs` to be served as a sub-route of the documentation site.

## Project Structure

Some directories are specific to Gatsby and details can be found on [this Gatsby documentation page](https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/).

These directories include

- `src/pages`: files in this directory automatically become pages with paths based on file names
- `src/templates`: templates for programmatically creating pages
- `static`: files in this folder will be copied to the `public` folder untouched

Additional directories that are not Gatsby specific include:

- `src/components`: these are component only used for the documentation site
- `src/styles`: documentation site-specific styles
- `content`: Contains markdown for site page content
