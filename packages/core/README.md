# CMSGov Design System

A UI component library and styleguide that is living, tested, importable, and iterable. The goal is to promote consistency across agency websites, speed up productivity, and serve as a future-friendly foundation.

## Installation

**Important:** The NPM package is currently a private package. In order to install it you must have access to the package.

```
npm login
npm install --save @nava/cmsgov-design-system-core
```

## Usage

Uncompiled files can be imported from the `src` directory. Compiled files can be found in the `dist` directory.

```js
import {Button} from '@nava/cmsgov-design-system-core'
```

```css
@import '{{node_modules}}/@nava/cmsgov-design-system-core/src/styles/all';
```

## Directory reference
<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
├── dist                CSS
└── src                 Sass and JSX
    ├── fonts
    ├── components      Sass for designed UI units and JS for React components
    │   ├── Button
    │   └── etc...
    ├── generics        Far reaching selectors
    ├── layouts         Structural patterns; No cosmetics.
    ├── settings        Globally-available settings and config options
    ├── tools           Helper functions and public mixins
    ├── utilities       Overrides and helpers
    └── vendor          Third-party libraries
```
