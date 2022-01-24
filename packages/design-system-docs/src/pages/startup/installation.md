---
title: Installation
weight: 0
---

How you implement the design system depends on the needs of your project and your workstyle. We highly recommend implementing the design system with `npm`, as it allows you to easily update the design system version, but we also provide a direct download if `npm` will not work for you or your project.

- [Install the `{{npm}}` package]({{root}}/startup/installation/#install-using-npm) if your project uses `npm` for package management.

- [Download the design system]({{root}}/startup/installation/#download-zip) if you are not familiar with `npm` and package management.

## Install using npm

Simply add the `{{npm}}` package to your `package.json` to install it as a dependency.

```
npm install --save {{npm}}@latest

yarn add {{npm}}@latest
```

The [{{npm}}](https://www.npmjs.com/package/{{npm}}) package includes:

- Pre-compiled SCSS files
- Compiled CSS files
- Compiled React components (CommonJS and ES modules)
- Typescript definition files
- Fonts and image

### Package file structure

The `dist` folder contains all the necessary files in the design system, your project should not be importing anything from `src`.

```
└── dist
    ├── components/
    │   └── index.js        Compiled JS entry point (CommmonJS)
    ├── css/
    │   └── index.css       Compiled CSS entry point
    ├── esnext/
    │   └── index.esm.js    Compiled JS entry point (ES Module)
    ├── fonts/
    ├── images/
    ├── scss/
    │   ├── base/           Base styles, HTML element selectors
    │   ├── components/     Component styles
    │   ├── settings/       Variables, mixins, and functions
    │   ├── utilities/      Utility classes for individual CSS properties
    │   └── index.scss      Precompiled SCSS entry point
    └── types/              Typescript definition files
```

## Download zip

<a href="{{root}}/download.zip">Download the zip file</a> from the latest release and extract the zip file to see the following folder structure. Like the `npm` package, the contents of `download/design-system/dist` contain design system code and assets.

```
└── download
    ├── design-assets/      Design system assets (Sketch files, fonts, designer assets)
    └── design-system/      Design system package (code, fonts, images)
        └── dist/
```

Copy the files and folders from `download/design-system/dist` to a relevant place in your project’s code base. Here is an example structure for how this might look:

```
└──example-project/
    ├── assets/
    │   ├── ds-2.0.0/       Renamed design system package
    │   ├── stylesheets/
    │   ├── images/
    │   └── javascript/
    └── index.html
```

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub]({{github}}/issues).
