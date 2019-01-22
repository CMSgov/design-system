---
title: Installation
weight: 0
---

The design system is available as NPM packages or via a <a href="https://github.com/CMSgov/design-system/archive/v1.30.0.zip">.zip download</a>.

The design system consists of two packages which are installed separately.

The [**core** package](https://www.npmjs.com/package/@cmsgov/design-system-core) includes the bulk of the design system:

* Base styles
* Utility classes
* Sass/CSS and React components
* Sass mixins and variables
* Fonts and images

```
npm install --save @cmsgov/design-system-core
```

The [**layout** package](https://www.npmjs.com/package/@cmsgov/design-system-layout) includes:

* Responsive flexbox grid framework

```
npm install --save @cmsgov/design-system-layout
```

<h3 id="need-help" class="ds-h3 ds-u-color--primary-darker">Need more information on NPM?</h2>
<p class="ds-c-alert__text">Learn more about using packages and NPM at <a href="https://www.npmjs.com/">npmjs.org</a>.</p>

<h2>Usage</h2>

We offer two versions of design system assets: a minified + compiled version (located in a `dist` directory), and an un-minified + non-compiled version (located in a `src` directory). Use the minified version in production environments. Use the un-minified version in a development environment to debug in the browser, or if you'd like to manage the un-compiled files with your own build system.

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub](https://github.com/CMSgov/design-system/issues).
