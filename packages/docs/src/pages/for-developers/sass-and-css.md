---
title: Using Sass/CSS
weight: 2
---

<h4 class="ds-h4 ds-u-font-size--base">Minified CSS</h4>

The easiest way to add the design system's styles to your site is by referencing its minified CSS.

1. Copy the design system's `dist/css` folder into a relevant place in your code base — likely a directory where you keep third-party libraries. In the example below, our directory is `css/vendor`.
1. Add a `<link>` to the stylesheet in your site's `<head>`

For example:

```html
<link rel="stylesheet" src="/css/vendor/design-system-core/index.css" />
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/article/index.html)

<h4 class="ds-h4 ds-u-font-size--base" id="sass">Sass</h4>

If you're already using Sass to style your site, another way to include the design system's styles is by importing its un-minified Sass file.

1. First, make sure your build system is configured so that the `node_modules` directory is in the list of Sass [`includePaths`](https://github.com/sass/node-sass#includepaths).
2. Add the following to your Sass file:

```css
@import '@cmsgov/design-system-core/src/index';
```

[Learn how to override and theme Sass variables]({{root}}/guidelines/themes/).

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/react-app/src/styles/index.scss)

<h4 class="ds-h4 ds-u-font-size--base">Applying styles to your page</h4>

Once your page is loading the design system's CSS, you can then begin applying its styling to your pages. Below is an example of a project applying the [base-level of styles]({{root}}/style/base) and a [utility class]({{root}}/utilities/).

```html
<html>
<head>
  <link rel="stylesheet" src="/css/vendor/design-system-core/index.css" />
</head>
<body class="ds-base">
  <h1 class="ds-u-font-size--title">Hello world</h1>
</body>
</html>
```

[Learn about the naming conventions]({{root}}/guidelines/code-conventions)

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub](https://github.com/CMSgov/design-system/issues).
