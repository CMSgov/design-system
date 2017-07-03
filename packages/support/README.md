This package contains the following design system assets:

- Sass variables, mixins, and functions

These are typically a dependency in the other Sass packages and are a way to share common settings across packages, helping to keep the styles consistent.

## Installation

```
npm install --save @cmsgov/design-system-support
```

## Usage

The source files included are written in Sass (`.scss`). You can add your `node_modules` directory to your Sass [`includePaths`](https://github.com/sass/node-sass#includepaths) and import the file like this:

```css
@import "@cmsgov/design-system-support/index";
```
