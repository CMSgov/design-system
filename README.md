# CMS Design System [![Build Status](https://travis-ci.org/CMSgov/design-system.svg?branch=master)](https://travis-ci.org/CMSgov/design-system)

> The design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the U.S. Web Design Standards and extends it to support additional CSS and React components, utility classes, and a grid framework to allow teams to quickly prototype and build accessible, responsive, production-ready websites.

## Packages

You're currently at the root of a monorepo which contains multiple NPM packages in the `packages/` directory.

The following packages are in this repo, view the README in each of these for additional details.

### Public packages 👀

These packages are published to NPM and can be installed. View each package's README for installation instructions.

#### [Core](packages/core/)

[![npm](https://img.shields.io/npm/v/@cmsgov/design-system-core.svg?label=@cmsgov%2Fdesign-system-core)](https://www.npmjs.com/package/@cmsgov/design-system-core)

The core CSS and React components for the design system. Includes the Support package.

#### [Support](packages/support/)

[![npm](https://img.shields.io/npm/v/@cmsgov/design-system-support.svg?label=@cmsgov%2Fdesign-system-support)](https://www.npmjs.com/package/@cmsgov/design-system-support)

Sass variables, mixins, and functions. Included in the Core package.

#### [Layout](packages/layout/)

[![npm](https://img.shields.io/npm/v/@cmsgov/design-system-layout.svg?label=@cmsgov%2Fdesign-system-layout)](https://www.npmjs.com/package/@cmsgov/design-system-layout)

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