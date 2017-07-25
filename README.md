# CMS.GOV Design System

> A shared set of design and development resources for creating accessible and consistent websites. The design system includes things like principles, high-level guidelines (UX conventions, UI code conventions, etc), UI components, documentation, tools, resources, and more.

## Packages

You're currently at the root of a monorepo which contains multiple NPM packages in the `packages/` directory.

The following packages are in this repo, view the README in each of these for additional details.

### Public packages 👀

These packages are published to NPM and can be installed. View each package's README for installation instructions.

#### [Core](packages/core/)

[![npm](http://img.shields.io/npm/v/@cmsgov/design-system-core.svg?label=@cmsgov%2Fdesign-system-core)](https://www.npmjs.com/package/@cmsgov/design-system-core)

The core CSS and React components for the design system. Includes the Support package.

#### [Support](packages/support/)

[![npm](http://img.shields.io/npm/v/@cmsgov/design-system-support.svg?label=@cmsgov%2Fdesign-system-support)](https://www.npmjs.com/package/@cmsgov/design-system-support)

Sass variables, mixins, and functions. Included in the Core package.

#### [Layout](packages/layout/)

[![npm](http://img.shields.io/npm/v/@cmsgov/design-system-layout.svg?label=@cmsgov%2Fdesign-system-layout)](https://www.npmjs.com/package/@cmsgov/design-system-layout)

A responsive flexbox grid framework.

### Internal packages 🔒

These packages are only project dependencies, so they're not published to NPM for other projects to use.

#### [Documentation site](packages/docs/)

This directory contains code related to the documentation website. Unless you're a contributor, this directory isn't that interesting to you.

#### [Component Yeoman generator](packages/generator-cmsgov/)

A [Yeoman](http://yeoman.io/) generator used in the development process. Again, unless you're a contributor, this directory isn't that interesting to you.

## Examples

Examples of the design system in use can be found in the [`examples` directory](examples/).

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) document to learn about setting up a local development environment, contributing to the design system, and our coding guidelines.