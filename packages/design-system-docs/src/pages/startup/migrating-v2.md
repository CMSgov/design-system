---
title: Migrating to v2
weight: 11
---

CMS Design System v2 introduces several breaking changes, and this migration guide will outline high-level steps to upgrade to the latest version.

## NPM packages

The `core`, `support`, `layout` npm packages have been deprecated and replaced with a new consolidated package [`@cmsgov/design-system`](https://www.npmjs.com/package/@cmsgov/design-system). This is now the only dependency you need to use the design system and you can simply replace the old packages with `@cmsgov/design-system` in your `package.json`.

```
  "dependencies": {
    // "@cmsgov/design-system-core": "^3.6.0",
    // "@cmsgov/design-system-support": "^3.6.0",
    // "@cmsgov/design-system-layout": "^3.6.0",
    "@cmsgov/design-system": "^2.0.0",
    ...
  }

```

## Importing JavaScript and Sass

Moving forward in v2, we will be distributing `sass` files in the `dist` directory in the `@cmsgov/design-system` npm package. If you were importing JavaScript or Sass directly from our packages’ `src` directories, it's recommended you update your import paths to import from `dist`.

For JavaScript imports, this will likely result in no changes. While JavaScript files were always available in the `src` directory before, it was never recommended to import the source version directly, so your project likely will not contain any `src` folder imports for React components.

For your Sass imports, we recommend everyone to update your import paths. We previously did not distribute the Sass files in our packages’ `dist` directories, so you likely had an import path that looked like this:

```
@import "~@cmsgov/design-system-core/src/index.scss";
```

In v2, it will be changed to

```
@import "~@cmsgov/design-system/dist/index.scss";
```

## Fonts and Images

Fonts and images are now stored in `@cmsgov/design-system/dist/fonts` and `@cmsgov/design-system/dist/images`. Previously they were stored in `@cmsgov/design-system/fonts` and `@cmsgov/design-system/images`.

If you’re using a tool like webpack to collect the images and fonts during your app’s build process, you will need to update the appropriate path variables. A typical Sass import might have looked like this:

```
$font-path: "~@cmsgov/design-system-core/fonts";
$image-path: "~@cmsgov/design-system-core/images";
@import "~@cmsgov/design-system-core/src/index.scss";
```

When migrating to v2, it will need to be changed to:

```
$font-path: "~@cmsgov/design-system/dist/fonts";
$image-path: "~@cmsgov/design-system/dist/images";
@import "~@cmsgov/design-system/dist/index.scss";
```

## A note on versioning

When we decided to publish our new NPM packages for this release, we chose to start at `v2.0.0` even though our old NPM packages were at `v3.7.0`. The main reason for this is that our past v2 and v3 major releases didn't introduce breaking changes to our design system according to our [SemVer guidelines](https://github.com/CMSgov/design-system/blob/master/guides/RELEASE-PROCESS.md#versioning). These releases were not aligned with our product communication and marketing, and were limited to developer usage.

With this major release, we have an opportunity to correct past inconsistencies, and unify our versioning across NPM packages, our Sketch library, and product communication. Because we still have the same Github repo and release notes, we will be adopting a new naming convention for our release tags going forward; the version number will prefixed with `core-` (i.e. `core-2.0.0`).

This was a difficult decision to make, but we believe this will make things more consistent and simpler going forward.
