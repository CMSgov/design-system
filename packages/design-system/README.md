This package contains the following design system assets:

- Base styles
- Utility classes
- Sass/CSS and React components
- Sass mixins and variables
- Responsive flexbox grid framework
- Fonts and images

## Installation

```
npm install --save @cmsgov/design-system
```

## Usage

The source files included are written in Sass (`.scss`). You can add your `node_modules` directory to your Sass [`includePaths`](https://github.com/sass/node-sass#includepaths) and import the file like this:

```css
@import '@cmsgov/design-system/dist/index.scss';
```

or import the transpiled CSS:

```css
@import '@cmsgov/design-system/dist/index.css';
```

[Please view the documentation site for additional information.](https://design.cms.gov/)

## Examples

Examples of the design system in use can be found in the [`examples` directory](https://github.com/CMSgov/design-system/tree/master/examples) on GitHub.

## Bugs and contributions

Please [submit an issue on GitHub](https://github.com/CMSgov/design-system) for any bugs or feature requests.

You can also read our [CONTRIBUTING.md](https://github.com/CMSgov/design-system/blob/master/CONTRIBUTING.md) document to learn about setting up a local development environment, contributing to the design system, and our coding guidelines.

## File Structure

The design system follows a variation of [ITCSS](http://thomasbyttebier.be/blog/less-css-mess) (Inverted Triangle architecture for CSS). The goal is to write CSS in [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) order.

<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
└── dist
    ├── fonts
    ├── images
    ├── index.css       Compiled CSS
    ├── index.js        Compiled JSS
    ├── index.scss      Uncompiled SCSS
    ├── components      React component source, test & example files
    │   ├── Button
    │   └── etc...
    ├── utilities       Utility classes for modifying individual CSS properties
    │   └── text-color
    │   └── etc...
    └── styles
        ├── settings    Global variables, mixins, and functions
        ├── grid        Responsive flexbox grid utilities
        ├── typography
        └── etc...
```
