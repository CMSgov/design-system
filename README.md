# CMS Design System [![Build Status](https://travis-ci.org/CMSgov/design-system.svg?branch=master)](https://travis-ci.org/CMSgov/design-system)

> The design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the U.S. Web Design Standards and extends it to support additional CSS and React components, utility classes, and a grid framework to allow teams to quickly prototype and build accessible, responsive, production-ready websites.

## Packages

You're currently at the root of a monorepo which contains multiple NPM packages in the `packages/` directory. The following packages located in the [`packages` directory](packages/) of this repo. View the `README.md` in each of these for additional details.

| Name | Description |
| ---- | ----------- |
| [Core](packages/core/) | The core CSS and React components for the design system. Includes the Support package. <br> [![@cmsgov/design-system-core](https://img.shields.io/npm/v/@cmsgov/design-system-core.svg?label=@cmsgov%2Fdesign-system-core)](https://www.npmjs.com/package/@cmsgov/design-system-core)
| [Layout](packages/layout/) | A responsive flexbox grid framework. <br> [![@cmsgov/design-system-layout](https://img.shields.io/npm/v/@cmsgov/design-system-layout.svg?label=@cmsgov%2Fdesign-system-layout)](https://www.npmjs.com/package/@cmsgov/design-system-layout)
| [Support](packages/support/) | Sass variables, mixins, and functions. Included in the Core package. <br> [![@cmsgov/design-system-support](https://img.shields.io/npm/v/@cmsgov/design-system-support.svg?label=@cmsgov%2Fdesign-system-support)](https://www.npmjs.com/package/@cmsgov/design-system-support) |

**Internal packages**

These packages are project dependencies, mostly focused around the design system's developer tooling and documentation.

| Name | Description |
| ---- | ----------- |
| [Documentation site](packages/docs/) | This directory contains code related to the documentation website. Unless you're a contributor, this directory isn't that interesting to you. |
| [ESLint config](packages/eslint-config-design-system/) | The ESLint rules we use to lint the design system's JS and React components <br> [![@cmsgov/eslint-config-design-system](https://img.shields.io/npm/v/@cmsgov/eslint-config-design-system.svg?label=@cmsgov%2Feslint-config-design-system)](https://www.npmjs.com/package/@cmsgov/eslint-config-design-system) |
| [Stylelint config](packages/stylelint-config-design-system/) | The Stylelint rules we use to lint the design system's Sass <br> [![@cmsgov/stylelint-config-design-system](https://img.shields.io/npm/v/@cmsgov/stylelint-config-design-system.svg?label=@cmsgov%2Fstylelint-config-design-system)](https://www.npmjs.com/package/@cmsgov/stylelint-config-design-system) |
| [Yeoman generator](packages/generator-cmsgov/) | A [Yeoman](http://yeoman.io/) generator used in the development process. Again, unless you're a contributor, this directory isn't that interesting to you. |

## Examples

Examples of the design system in use can be found in the [`examples` directory](examples/).

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) document to learn about setting up a local development environment, contributing to the design system, and our coding guidelines.