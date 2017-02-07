# CMSGov Design System

> A robust UI component library and styleguide that is living, tested, importable, and iterable. The goal is to promote consistency, speed up productivity, establish a collaborative workflow and shared vocabulary between everyone, provide helpful documentation, and serve as a future-friendly foundation.


## Installation

**Warning: These installation instructions won't work until the package is published to NPM, or we make this repo public. In the meantime, follow the instructions in [CONTRIBUTING.md](CONTRIBUTING.md) to use a local copy of the package.**

```
npm install --save cmsgov-design-system
```

The component library is now installed as a dependency. You can use the un-compiled files found in the `src/` directory or the compiled files in the `dist/` directory.

## Code reference
<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
├── dist                  Compiled files
│   ├── fonts
│   └── styles            CSS stylesheets
└── src                   Un-compiled files
    ├── fonts
    ├── scripts
    |   └── components    React/ES6 components
    │       └── __tests__ JS Spec files for files in the components directory
    └── styles            .less stylesheets
        ├── components    Component-specific stylesheets
        └── utils         .less utility files (variables/mixins)
```

## Contributing to the code base

For complete instructions on how to contribute code, please read [CONTRIBUTING.md](CONTRIBUTING.md)
