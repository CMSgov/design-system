---
title: Migrating to v4
weight: 11
---

CMS Design System v4 introduces several breaking changes, and this migration guide will outline high-level steps to upgrade to the latest version.

## NPM packages

The `core`, `support`, `layout` npm packages have been deprecated and replaced with a new consolidated package [`@cmsgov/design-system`](https://www.npmjs.com/package/@cmsgov/design-system). This is now the only dependency you need to use the design system and you can simply replace the old packages with `@cmsgov/design-system` in your `package.json`.

```
  "dependencies": {
    // "@cmsgov/design-system-core": "^3.6.0",
    // "@cmsgov/design-system-support": "^3.6.0",
    // "@cmsgov/design-system-layout": "^3.6.0",
    "@cmsgov/design-system": "^4.0.0",
    ...
  }

```

## Importing JavaScript and Sass

Moving forward in v4, we will not be distributing a `src` directory in the `npm` package. We will only have a `dist` directory. If you were importing JavaScript or Sass directly from our packages’ `src` directories, you’ll have to update your import paths.

For JavaScript imports, this will likely result in no changes. While JavaScript files were always available in the `src` directory before, it was never recommended to import the source version directly, so your project likely will not contain any `src` folder imports for React components.

For your Sass imports, this will require a change for everyone. We previously did not distribute the Sass files in our packages’ `dist` directories, so you likely had an import path that looked like this:

```
@import "~@cmsgov/design-system-core/src/index.scss";
```

In v4, it will need to be changed to

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

When migrating to v4, it will need to be changed to:

```
$font-path: "~@cmsgov/design-system/dist/fonts";
$image-path: "~@cmsgov/design-system/dist/images";
@import "~@cmsgov/design-system/dist/index.scss";
```
