This package contains the following design system assets:

- Base styles
- Utility classes
- Sass/CSS and React components
- Sass mixins and variables
- Fonts and images

## Installation

```
npm install --save @cmsgov/design-system-core
```

## Usage

The source files included are written in Sass (`.scss`). You can add your `node_modules` directory to your Sass [`includePaths`](https://github.com/sass/node-sass#includepaths) and import the file like this:

```css
@import "@cmsgov/design-system-core/src/index";
```

or import the transpiled CSS:

```css
@import "@cmsgov/design-system-core/dist/index.css";
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
├── dist                Compiled CSS and JS
├── fonts
├── images
└── src                 Non-compiled Sass and JSX
    ├── base            Base HTML styles
    ├── components      Sass and React components
    │   ├── Button
    │   └── etc...
    ├── generics        Far reaching selectors
    └── utilities       Functional CSS classes to apply individual traits
```
