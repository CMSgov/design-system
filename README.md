# CMSGov Design System

> A robust UI component library and styleguide that is living, tested, importable, and iterable. The goal is to promote consistency, speed up productivity, establish a collaborative workflow and shared vocabulary between everyone, provide helpful documentation, and serve as a future-friendly foundation.


## Installation

**Warning: These installation instructions won't work until the package is published to NPM, or we make this repo public. In the meantime, follow the instructions in [CONTRIBUTING.md](CONTRIBUTING.md) to use a local copy of the package.**

```
npm install --save cmsgov-design-system
```

The component library is now installed as a dependency. You can import the unprocessed source files found in the `src/` directory or the compiled files in the `dist/` directory.

## Code reference
<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
├── config
│   └── gulp              Build tasks
├── dist                  Compiled files
│   ├── fonts
│   └── styles            CSS stylesheets
├── docs                  Documentation site
└── src                   Un-compiled files
    ├── fonts
    ├── scripts
    |   └── components    React/ES6 components
    │       └── __tests__ JS Spec files for files in the components directory
    └── styles            Sass stylesheets
        ├── components    Designed UI units
        ├── generics      Far reaching selectors
        ├── layouts       Structural patterns; No cosmetics.
        ├── settings      Globally-available settings and config options
        ├── tools         Helper functions and public mixins
        ├── trumps        Overrides, helpers and utilities
        └── vendor        Third-party libraries
```

## Contributing to the code base

For complete instructions on how to contribute code, please read [CONTRIBUTING.md](CONTRIBUTING.md)
