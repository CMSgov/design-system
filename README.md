## Installation

```
npm install --save CMSgov/design-system
```

The component library is now installed as a dependency. You can use the un-compiled files found in the `src/` directory or the compiled files in the `dist/` directory.

_Note: Eventually the package will be published to NPM, but for now you'll need to reference the package by its repo, like above._

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
    └── styles            .less stylesheets
        ├── components    Component-specific stylesheets
        └── utils         .less utility files (variables/mixins)
```

## Contributing to the code base

For complete instructions on how to contribute code, please read [CONTRIBUTING.md](CONTRIBUTING.md)