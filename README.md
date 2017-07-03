# CMS.GOV Design System

> A shared set of design and development resources for creating accessible and consistent websites. The design system includes things like principles, high-level guidelines (UX conventions, UI code conventions, etc), UI components, documentation, tools, resources, and more.

You're currently at the root of a monorepo which contains multiple projects in the `packages` directory. The root of this project has code related to the development and build process, so it's probably not that useful to you unless you're a contributor.

**This repo includes the following packages. View the README in each of these for additional details.**

### Public packages

These packages are published to NPM and can be installed. View each package's README for installation instructions.

#### [Core](packages/core/)

This directory contains the core CSS and React components for the design system.

```
npm install @cmsgov/design-system-core
```

#### [Layout](packages/layout/)

This directory contains a responsive flexbox grid framework.

```
npm install @cmsgov/design-system-layout
```

### Internal packages

These packages are only project dependencies, so they're not published to NPM for other projects to use.

#### [Documentation site](packages/docs/)

This directory contains code related to the documentation website. Unless you're a contributor, this directory isn't that interesting to you.

#### [Component Yeoman generator](packages/generator-cmsgov/)

A [Yeoman](http://yeoman.io/) generator used in the development process. Again, unless you're a contributor, this directory isn't that interesting to you.

## Examples

Examples of the design system in use can be found in the [`examples` directory](examples/).

## Contributing

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) document to learn about setting up a local development environment, contributing to the design system, and our coding guidelines.