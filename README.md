# CMSGov Design System

> A UI component library and styleguide that is living, tested, importable, and iterable. The goal is to promote consistency across agency websites, speed up productivity, and serve as a future-friendly foundation.


## Installation

**Warning: These installation instructions won't work until the package is published to NPM, or we make this repo public. In the meantime, follow the instructions in [CONTRIBUTING.md](CONTRIBUTING.md) to use a local copy of the package.**

```
npm install --save @nava/design-system-core
```

Uncompiled files can be imported from the `src` directory. Compiled files can be found in the `dist` directory.

## Developing

For complete instructions on how setup a local development environment to contribute to the design system, please read [CONTRIBUTING.md](CONTRIBUTING.md)

## Directory reference
<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
├── config
│   └── gulp                        Build tasks for all packages
└── packages
    ├── core                        Core CSS and React components
    │   ├── dist                    Compiled files
    │   └── src                     Un-compiled files
    │       ├── fonts
    │       ├── scripts
    │       │   └── components      React components
    │       └── styles              Sass stylesheets
    │           ├── components      Designed UI units
    │           ├── generics        Far reaching selectors
    │           ├── layouts         Structural patterns; No cosmetics.
    │           ├── settings        Globally-available settings and config options
    │           ├── tools           Helper functions and public mixins
    │           ├── trumps          Overrides, helpers and utilities
    │           └── vendor          Third-party libraries
    └── docs                        Documentation site
```
