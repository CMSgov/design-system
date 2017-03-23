---
title: Getting started
weight: -100
---

You can download a .zip of the design system directly from GitHub's [Releases](CMSgov/design-system/releases) page, however we suggest using a package manager like NPM or Yarn to install the design system package if you're working on a real world project. This way you can easily update the package when there's a new release.

<div class="ds-c-alert ds-c-alert--warn ds-u-margin-bottom--2">
  <div class="ds-c-alert__body">
    <h3 class="ds-c-alert__heading">Important</h3>
    <p class="ds-c-alert__text">The NPM package is currently a private package. In order to install it you must have access to the package.</p>
  </div>
</div>

```
npm login
npm install --save @cmsgov/design-system-core
```

or if you're using Yarn:

```
yarn login
yarn add @cmsgov/design-system-core
```

## Usage

Source files can be imported from the `src` directory. Transpiled files can be found in the `dist` directory.

#### Import all Sass styles

```scss
@import 'node_modules/@cmsgov/design-system-core/src/index';
```

#### Link to transpiled CSS

```html
<link rel="stylesheet" src="node_modules/@cmsgov/design-system-core/dist/index.css" />
```

#### Import JSX component

```jsx
import {Button} from '@cmsgov/design-system-core';
...
<Button>Foo</Button>;
```

#### Apply base-level of styles and use a utility class

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

## Directory reference
<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
├── dist                Transpiled CSS and fonts
└── src                 Sass and JSX
    ├── base            Base HTML styles (scoped to .ds-base)
    ├── components      Sass and React components
    │   ├── Button
    │   └── etc...
    ├── fonts
    ├── generics        Far reaching selectors
    ├── layouts         Structural patterns; No cosmetics.
    ├── settings        Globally-available settings and config options
    ├── tools           Helper functions and public mixins
    ├── utilities       Functional CSS classes to apply individual traits
    └── vendor          Third-party libraries
```
