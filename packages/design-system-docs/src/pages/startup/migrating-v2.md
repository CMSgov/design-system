---
title: Migrating to v2
weight: 11
---

The CMS Design System v2 release introduces several breaking changes, and this migration guide outlines high-level steps to upgrade. See the [release notes](https://github.com/CMSgov/design-system/releases/tag/core-2.0.0) for a detailed list of changes.

## NPM packages

The `core`, `support`, `layout` npm packages have been deprecated and replaced with a new consolidated package [`@cmsgov/design-system`](https://www.npmjs.com/package/@cmsgov/design-system). This is now the only dependency you need to use the design system and you can simply replace the old packages with `@cmsgov/design-system` in your `package.json`.

Old usage:

```
  "dependencies": {
    "@cmsgov/design-system-core": "^3.7.0",
    "@cmsgov/design-system-support": "^3.7.0",
    "@cmsgov/design-system-layout": "^3.7.0",
    ...
  }
```

New usage:

```
  "dependencies": {
    "@cmsgov/design-system": "^2.0.0",
    ...
  }
```

## Folder structure

The `dist` folder structure has been updated for the `@cmsgov/design-system` npm package. We recommend only importing files from the `dist` directory moving forward.

```
└── @cmsgov/design-system/dist
    ├── components/
    │   └── index.js      Compiled JS (CommmonJS)
    ├── css/
    │   └── index.css     Compiled CSS
    ├── esnext/
    │   └── index.esm.js  Compiled JS (ES Module)
    ├── fonts/
    ├── images/
    └── scss/             Uncompiled CSS
```

### Importing SCSS/CSS

If you were importing Sass directly from our packages’ `src` directories, we recommended updating your import paths to import from `dist`.

We previously did not distribute the Sass files in our packages’ `dist` directories, so you likely had an import path that looked like this:

```
@import "~@cmsgov/design-system-core/src/index";
```

In CMSDS v2, it will be changed to

```
@import "~@cmsgov/design-system/dist/scss/index";
```

Imports to `@cmsgov/design-system-layout` or `@cmsgov/design-system-support` are now included in the main `scss` entry point. If you would like to only import specific styles, see the `@cmsgov/design-system` [`README.md`](https://github.com/CMSgov/design-system/blob/master/packages/design-system/README.md#file-structure) for more info on our SASS architecture.

See the [theming page]({{root}}/startup/theming/) for more specific information on overriding the default Sass variables or CSS declarations.

### Importing Javascript

V2 adds support for an ES module version of our JS, which can be found in the `dist/esnext` directory. Our `package.json` has been updated to point to the new ES module entry point when possible, so for most users this won't require any change. See the documentation on [importing React components]({{root}}/startup/components/#named-imports) for more information on importing Javascript and ES module support.

Your project also should not contain any `src` folder imports for React components. While JavaScript files were always available in the `src` directory before, it was never recommended to import the source version directly.

## Fonts and Images

Fonts and images are now stored in `@cmsgov/design-system/dist/fonts` and `@cmsgov/design-system/dist/images`. Previously they were stored in `@cmsgov/design-system/fonts` and `@cmsgov/design-system/images`.

If you’re using a tool like webpack to collect the images and fonts during your app’s build process, you will need to update the appropriate path variables. A typical Sass import might have looked like this:

```
$font-path: "~@cmsgov/design-system-core/fonts";
$image-path: "~@cmsgov/design-system-core/images";
```

When migrating to v2, it will need to be changed to:

```
$font-path: "~@cmsgov/design-system/dist/fonts";
$image-path: "~@cmsgov/design-system/dist/images";
```

## A note on versioning

When we decided to publish our new NPM packages for this release, we chose to start at `v2.0.0` even though our old NPM packages were at `v3.7.0`. The main reason for this is that our past v2 and v3 major releases didn't introduce breaking changes to our design system according to our [SemVer guidelines](https://github.com/CMSgov/design-system/blob/master/guides/RELEASE-PROCESS.md#versioning). These releases were also not aligned with our product communication and marketing, and were limited to developer usage.

With this major release, we are correcting past inconsistencies and unifying our versioning across NPM packages, our Sketch library, and product communication. Because we still have the same Github repo and release notes, we will be adopting a new naming convention for our release tags going forward; the version number will be prefixed with `core-` (i.e. `core-2.0.0`).

This was a difficult decision to make, but we believe this will make things more consistent and simpler going forward.
