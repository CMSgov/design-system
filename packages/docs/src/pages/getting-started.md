---
title: Getting started
weight: 0
---

<h2 id="installation" class="ds-h2 ds-u-color--primary-darker">Installation</h2>

The design system is available as NPM packages or via a .zip download.

The design system consists of two packages which are installed separately.

The **core** package includes the bulk of the design system:

- Base styles
- Utility classes
- Sass/CSS and React components
- Sass mixins and variables
- Fonts and images

```
npm install --save @cmsgov/design-system-core
```

The **layout** package includes:

- Responsive flexbox grid framework

```
npm install --save @cmsgov/design-system-layout
```

#### Fonts and images

Once you've downloaded the core package, copy the design system's `fonts` and `images` directories into the same directory as your site's CSS.

By default, the design system expects a file structure like this:

```
├── Your site's public assets directory/
    ├── bundle.css
    ├── fonts/
    └── images/
```

You can manually copy these directories, or you could integrate this step into your build process. [Here's an example of how this step could be accomplished using a Gulp task](https://github.com/CMSgov/design-system/blob/master/examples/react-app/Gulpfile.js).

You can change the default paths by overriding the following Sass variables:

- `$font-path`
- `$image-path`

<h2 id="usage" class="ds-h2 ds-u-color--primary-darker">Usage</h2>

We offer two versions of design system assets: a minified + compiled version (located in a `dist` directory), and an un-minified + non-compiled version (located in a `src` directory). Use the minified version in production environments. Use the un-minified version in a development environment to debug in the browser, or if you'd like to manage the un-compiled files with your own build system.

Below are examples of the various ways you can reference the design system's styles and components:

### Styles

<h4 class="ds-h4 ds-u-font-size--base">Minified CSS</h4>

The easiest way to add the design system's styles to your site is by referencing its minified CSS.

1. Copy the design system's `dist/css` folder into a relevant place in your code base — likely a directory where you keep third-party libraries. In the example below, our directory is `css/vendor`.
1. Add a `<link>` to the stylesheet in your site's `<head>`

For example:

```html
<link rel="stylesheet" src="/css/vendor/design-system-core/index.css" />
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/article/index.html)

<h4 class="ds-h4 ds-u-font-size--base">Sass</h4>

If you're already using Sass to style your site, another way to include the design system's styles is by importing its un-minified Sass file.

1. First, make sure your build system is configured so that the `node_modules` directory is in the list of Sass [`includePaths`](https://github.com/sass/node-sass#includepaths).
2. Add the following to your Sass file:
  ```css
  @import '@cmsgov/design-system-core/src/index';
  ```

To override any of the design system's Sass variables, include the variable definitions _before_ the line where the design system is imported. For example:

```css
@import 'variable-overrides';
@import '@cmsgov/design-system-core/src/index';
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/react-app/src/index.scss)

<h4 class="ds-h4 ds-u-font-size--base">Applying styles to your page</h4>

Once your page is loading the design system's CSS, you can then begin applying its styling to your pages. Below is an example of a project applying the [base-level of styles]({{root}}/style/base) and a [utility class]({{root}}/utilities/).

```html
<html>
<head>
  <link rel="stylesheet" src="/css/vendor/design-system-core/index.css" />
</head>
<body class="ds-base">
  <h1 class="ds-u-font-size--title">Hello world</h1>
</body>
</html>
```

[Learn about the naming conventions]({{root}}/guidelines/code-conventions)

### React components

The examples below assume you've installed the design system using NPM and have already setup your build system.

<h4 class="ds-h4 ds-u-font-size--base">Default imports</h4>

Individual components can be imported from their individual export file.

```jsx
import Button from '@cmsgov/design-system-core/dist/components/Button/Button';
```

<h4 class="ds-h4 ds-u-font-size--base">Named imports</h4>

Components can also be imported using the shorter syntax below.

<div class="ds-c-alert ds-c-alert--warn ds-u-margin-bottom--2 ds-u-font-size--small">
  <div class="ds-c-alert__body">
    <h3 class="ds-c-alert__heading ds-u-font-size--base">Performance note</h3>
    <p class="ds-c-alert__text">
      This approach may result in a much larger file than you intend. Depending on what module bundler you use, all of the design system's React components may be included in the bundled file even if you didn't specifically import them. This can be avoided by enabling features like [tree shaking in Webpack](https://webpack.js.org/guides/tree-shaking/).
    </p>
  </div>
</div>

```jsx
import { Button } from '@cmsgov/design-system-core';
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/react-app/src/index.js)

<h2 id="examples" class="ds-h2 ds-u-color--primary-darker">Examples</h2>

Additional examples of the design system in use can be viewed on GitHub. These projects demonstrate the various ways you can incorporate the design system into your development process and various use cases.

<a href="https://github.com/CMSgov/design-system/tree/master/examples/" class="ds-c-button">Browse example projects</a>