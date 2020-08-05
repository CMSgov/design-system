---
title: Using Sass/CSS
weight: 1
---

## Using SCSS

If your project is already using Sass/SCSS, you can include the design system's styles by importing precompiled SCSS files from NPM.

1. First, make sure your build system is configured so that the `node_modules` directory is in the list of Sass [`includePaths`](https://github.com/sass/node-sass#includepaths).
2. Add the following to your Sass file:

```css
@import '{{npm}}/dist/scss/index';
```

3. [Ensure fonts and images are rendered correctly.]({{root}}/startup/sass-and-css/#using-fonts-and-images)

## Using CSS

If your project does not use Sass/SCSS, add the design system styles by referencing its minified CSS.

1. Copy the `dist/css/index.css` file into a relevant place in your code base — likely a directory where you keep third-party libraries. In the example below, our directory is `css/vendor`.
2. Add a `<link>` to the stylesheet in your site's `<head>`

For example:

```html
<link rel="stylesheet" src="/css/vendor/design-system/index.css" />
```

3. [Ensure fonts and images are rendered correctly.]({{root}}/startup/sass-and-css/#using-fonts-and-images)

## Using fonts and images

By default, the design system expects a file structure like this:

```
└── Your site's build folder/
    ├── images/
    ├── fonts/
    └── css/
      └── index.css/
```

You can manually copy the image and font directories, or you could integrate this step into your build process.

- [Here's an example of copying assets using Gulp](https://github.com/CMSgov/design-system/blob/master/examples/react-app/Gulpfile.js).
- [Here's an example of copy assets using Webpack](https://github.com/CMSgov/design-system/blob/master/examples/webpack-demo/webpack.config.js).

Alternatively if your project uses Webpack or Create React App, you can [configure the bundler to process the assets]({{root}}/startup/sass-and-css/#setting-asset-paths-to-node_modules).

### Overriding asset paths

If you are using Sass/SCSS, you can change the default asset paths by overriding the `$font-path` and `$image-path` Sass variables.

For example, if your project build directory file structure looked like this:

```
└── Your site's build folder/
    ├── images/
    ├── fonts/
    └── index.css
```

The asset paths would have to be redefined like so:

```css
$font-path: './fonts';
$image-path: './image';
```

Without overriding these variables, it's possible that your fonts and images will not render correctly in your project.

#### Setting asset paths to `node_modules`

If your project uses Webpack or Create React App, you can set the asset paths directly to the fonts and image folders in your `node_modules`.

```css
$font-path: '~{{npm}}/dist/fonts';
$image-path: '~{{npm}}/dist/images';
```

This approach is recommended, as you no longer have to copy assets into your project. It does however require some additional configuration.

For Create React App projects, simply add the following to your `.env`. This will allow Create React App's Webpack configuration to know to process the fonts and images in `node_modules`.

```
SASS_PATH="node_modules"
```

If you have your own custom Webpack configuration, you need to use [`file-loader`](https://webpack.js.org/loaders/file-loader/) and [`resolve-url-loader`](https://github.com/bholloway/resolve-url-loader) to copy assets into your build folder and inject the correct URLS to your build files.

## Applying styles to your page

Once your page is loading the design system's CSS, you can then begin applying its styling to your pages. Below is an example of a project applying the [base-level of styles]({{root}}/styles/base) and a [utility class]({{root}}/utilities/overview).

```html
<html>
  <head>
    <link rel="stylesheet" src="/css/vendor/design-system/index.css" />
  </head>
  <body class="ds-base">
    <h1 class="ds-u-font-size--title">Hello world</h1>
  </body>
</html>
```

[Learn about the naming conventions]({{root}}/guidelines/code-conventions)

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub]({{github}}/issues).
