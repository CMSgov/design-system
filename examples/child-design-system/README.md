## Introduction

There are many independent product teams across different contracts and companies that work under the same CMS sites (i.e. Medicare.gov, Healthcare.gov).

These product teams need a shared resource specific to those sites. It’s not possible or desirable for the CMSDS core to cover those site specific case.

This is the reasoning behind creating the CMS design system family which consists of the CMSDS core and child design systems.

## Getting started

1. Download this child design system example folder
1. Run `yarn install` to install dependencies
1. Run `yarn start` to run the doc site locally

**Note:** [See additional design system scripts](https://github.com/CMSgov/design-system/tree/master/packages/design-system-scripts) for for things like building and testing.

### Build files

Design system build files for JS and CSS/SCSS are inside their respective folders.

- JS Build files are transpiled by Babel into ESM in order to support webpack4's [tree shaking optimizations](https://webpack.js.org/guides/tree-shaking/#clarifying-tree-shaking-and-sideeffects)

- Typescript prop docs are automatically generated when the `@react-props` tag is specified.

### Setting up tests

...

## Folder structure

Design system source like (`tsx` files, tests) and doc site files (example files, documentation content) and are separated into `./docs/src` and `./src` folders respectively. The exception to this are typescript docs, which are auto generated from the source files.

### The `src` folder

```
└── src
    ├── components/            // Child ds component folders and files
    │   └── button
    |   |   └── Button.jsx
    |   |   └── Button.test.jsx
    │   └── index.js
    ├── fonts/                 // Includes fonts from the core and child ds
    ├── images/                // Includes images from both the core and child ds
    ├── types/                 // Typescript definition files
    └── styles/
        └── components         // Styles for components
        |   └── Button.scss
        └── settings           // Global styles like color, spacing, or font overrides
        └── index.scss
```

### The `docs` folder

```
└── dist
└── src
    ├── fonts/      // Includes fonts from the core and child ds
    ├── images/     // Includes images from both the core and child ds
    ├── pages/
        └── components      // Component documentation and example files
        |   └── Button.docs.scss                // Documentation for the button component
        |   └── Button.example.html             // HTML example of the button component
        |   └── Button.example.jsx              // React example of the button component
        └── guidelines      // Documentation guideline pages
        └── patterns        // Pattern documentation and example files
        └── startup         // Documentation statup pages
        └── styles          // Styles for the documentation site
        └── utilities       // Utility documentation and example files
```

## Configuring your child design system

In the `cmsds.config.js` file, which can be found at the root of this folder you will see options for configuring the following.
This ensures that the content on the doc site matches up with your child design system naming and code repositories.

| Config       | Default                                                                                                                                                                        | Description                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `githubUrl`  |                                                                                                                                                                                | The URL for your GitHub repository. This replaces the {{github}} template in documentation content.                                           |
| `npmPackage` |                                                                                                                                                                                | The name of your design system NPM package. This replaces the {{npm}} template in documentation content.                                      |
| `name`       |                                                                                                                                                                                | Name of the design system. This replaces the {{name}} template in documentation content.                                                      |
| `sourceDir`  | `./`                                                                                                                                                                           | The relative path to the directory containing the design system package `src`. The design system build files will be saved here under "dist". |
| `docsDir`    | `./docs`                                                                                                                                                                       | The relative path to the directory containing the doc site `src`. The doc site build files will be saved here under "dist".                   |
| `typescript` | `` | Used to enable typescript support. When `true`, .ts/.tsx files will be compilied and typescript definition files will be generated. Requires tsconfig.json to be defined. |

## Writing documentation

By default the pages that exist in the core design system will be a part of the child design system documentation site.
However the content of the page can be changed at the child design system level. For example, to change the landing page of the child design system doc site you would create a markdown page named `index.md` then provide your own content for that particular page. You can see a list of core design system doc site pages here. https://github.com/CMSgov/design-system/tree/master/packages/design-system-docs/src/pages

**Note:** The page name must be identocal and live in the same location in order for it to be overridden at a child design system level.

If you are writing a content only page then you should be creating a Markdown .MD page but if you are writing documentation for a component, pattern or utility you should follow the [format outlined for writing component documentation](https://github.com/CMSgov/design-system/blob/master/guides/WRITING-DOCUMENTATION.md).

### Publishing your child design system doc site

We suggest using GitHub pages `gh-pages` to publish the doc site build files.

### Modifying the design

- (Color variables)[https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/styles/settings/variables/_color.scss]
- (Type variables)[https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/styles/settings/variables/_type.scss]
- (Spacing variables)[https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/styles/settings/variables/_layout.scss]
- (Form variables)[https://github.com/CMSgov/design-system/blob/master/packages/design-system/src/styles/settings/variables/_forms.scss]
