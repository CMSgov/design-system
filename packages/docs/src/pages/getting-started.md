---
title: Getting started
weight: 0
---

## Installation

 We suggest using a package manager like NPM or Yarn to install the design system package if you're working on a real world project. This way you can easily update the package when there's a new release.

```
npm install --save @cmsgov/design-system-core
```

or if you're using Yarn:

```
yarn add @cmsgov/design-system-core
```

You can also download a .zip of the design system directly from our [GitHub repo](https://github.com/CMSgov/design-system/releases).

### Fonts and images

Copy the design system's `fonts` and `images` directories into the same directory as your site's CSS.

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

## Usage

Below are examples of the various ways you can reference the design system's styles and React components:

### Styles

#### Using the bundled CSS file

The easiest way to add the design system's styles to your site is by referencing its bundled CSS file.

1. Copy the design system's `dist/css` folder into a relevant place in your code base — likely a directory where you keep third-party libraries. In the example below, our directory is `css/vendor`.
1. Add a `<link>` to the stylesheet in your site's `<head>`

For example:

```html
<link rel="stylesheet" src="css/vendor/design-system-core/index.css" />
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/article/index.html)

#### Using Sass

If you're already using Sass to style your site, another way to include the design system's styles is by importing its main Sass file.

```scss
@import 'node_modules/@cmsgov/design-system-core/src/index';
```

To override any of the design system's Sass variables, include the variable definitions _before_ the line where the design system is imported.

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/react-app/src/index.scss)

#### Applying styling

Once your page is loading the design system's CSS, you can then begin adding its CSS class names to utilize the system. Below is an example of a project applying the base-level of styles and a utility class.

```html
<html>
<head>
  <link rel="stylesheet" src="node_modules/@cmsgov/design-system-core/dist/index.css" />
</head>
<body class="ds-base">
  <h1 class="ds-u-font-size--title">Hello world</h1>
</body>
</html>
```

<a href="{{root}}/guidelines/code-conventions" class="ds-c-button">Learn more about the naming conventions</a>

### React

#### Importing defaults

Individual components can be imported from their individual export file.

```jsx
import Button from '@cmsgov/design-system-core/dist/components/Button/Button';
```

#### Named imports

Components can also be imported using the shorter syntax below.

<div class="ds-c-alert ds-c-alert--warn ds-u-margin-bottom--2">
  <div class="ds-c-alert__body">
    <h3 class="ds-c-alert__heading">A note on performance</h3>
    <p class="ds-c-alert__text">
      This approach may result in a much larger file than you intend. Depending on what module bundler you use, all of the design system's React components may be included in the bundled file even if you didn't specifically import them. This can be avoided by enabling features like [tree shaking in Webpack](https://webpack.js.org/guides/tree-shaking/).
    </p>
  </div>
</div>

```jsx
import {Button} from '@cmsgov/design-system-core';
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/react-app/src/index.js)

## Examples

[**View example projects**](https://github.com/CMSgov/design-system/tree/master/examples/) to see ways you can use the design system and incorporate it into your development process.