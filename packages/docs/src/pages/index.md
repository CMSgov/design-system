---
title: Getting started
weight: -100
---

You can download a .zip of the design system directly from GitHub's [Releases](CMSgov/design-system/releases) page, however we suggest using a package manager like NPM or Yarn to install the design system package if you're working on a real world project. This way you can easily update the package when there's a new release.

```
npm install --save @cmsgov/design-system-core
```

or if you're using Yarn:

```
yarn add @cmsgov/design-system-core
```

## Usage

### Styles and React components

Source files can be imported from the `src` directory. Transpiled files can be found in the `dist` directory.

Below are examples of the various ways you can reference the design system's styles and React components:

###### Import all Sass styles

```scss
@import 'node_modules/@cmsgov/design-system-core/src/index';
```

###### Link to transpiled CSS

```html
<link rel="stylesheet" src="node_modules/@cmsgov/design-system-core/dist/index.css" />
```

###### Import JSX component

```jsx
import {Button} from '@cmsgov/design-system-core';
...
<Button>Foo</Button>;
```

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

### Fonts and images

The design system expects its fonts and images to be located in the same directory as its CSS. If you reference the CSS by its `node_modules` path, there's nothing else you need to do.

However, if you move the design system's CSS file or import the Sass file into your project's stylesheet, you'll need to copy the `files` and `images` directories into the directory where your CSS lives.

Sass variables exist for customize the expect directories:

- `$font-path`
- `$image-path`

[**View example projects**](https://github.com/CMSgov/design-system/tree/master/examples/) to see additional ways you can use the design system and incorporate it into your process.