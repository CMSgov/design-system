This package contains the following design system assets:

- Base styles
- Utility classes
- Sass/CSS and React components
- Responsive flexbox grid framework
- Fonts and images
- Sass mixins and variables

## Installation

```
npm install --save @cmsgov/design-system
```

## Usage

The source files included are written in Sass (`.scss`). You can add your `node_modules` directory to your Sass [`includePaths`](https://github.com/sass/node-sass#includepaths) and import the file like this:

```css
@import '@cmsgov/design-system/dist/scss/index';
```

or import the transpiled CSS:

```css
@import '@cmsgov/design-system/dist/css/index';
```

[Please view the documentation site for additional information.](https://design.cms.gov/)

## Examples

Examples of the design system in use can be found in the [`examples` directory](https://github.com/CMSgov/design-system/tree/main/examples) on GitHub.

## Bugs and contributions

Please [submit an issue on GitHub](https://github.com/CMSgov/design-system) for any bugs or feature requests.

You can also read our [CONTRIBUTING.md](https://github.com/CMSgov/design-system/blob/main/CONTRIBUTING.md) document to learn about setting up a local development environment, contributing to the design system, and our coding guidelines.

## File Structure

The design system follows a variation of [ITCSS](http://thomasbyttebier.be/blog/less-css-mess) (Inverted Triangle architecture for CSS). The goal is to write CSS in [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) order.

```
└── @cmsgov/design-system/dist
    ├── components/
    │   └── index.js        Compiled JS entry point (CommmonJS)
    ├── css/
    │   ├── index.css       Compiled CSS rules
    │   └── core-theme.css  Core-theme tokens as CSS variables
    ├── scss/
    │   ├── core-theme.scss Sass version of core-theme tokens
    │   ├── *-tokens.scss   Copy of core-theme.scss for backwards compatability
    ├── fonts/
    │   └── *               Fonts referenced by the design system CSS
    ├── images/
    │   └── *               Images referenced by the design system CSS
    ├── {preact,react}-components/
    │   ├── bundle/         Bundled version of JavaScript components
    │   ├── cjs/            CommonJS compiled version of JavaScript components
    │   ├── esm/            ES Modules compiled version of JavaScript components
    │   └── types/          TypeScript definition files for JavaScript components
    └── web-components
        └── bundle/
            ├── all.js      All web components bundled together (standalone file)
            ├── base.js     Base code necessary for loading individual web component bundles
            └── ds-*.js     Individual web component bundles
```
