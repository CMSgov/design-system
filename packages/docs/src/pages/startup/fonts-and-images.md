---
title: Fonts and Images
weight: 1
---

Once you've downloaded the core package, copy the design system's `fonts` and `images` directories into the same directory as your site's CSS directory.

By default, the design system expects a file structure like this:

```
├── Your site's public assets directory/
    ├── css/
    ├── images/
    └── fonts/
```

You can manually copy these directories, or you could integrate this step into your build process.
- [Here's an example of how this step could be accomplished using a Gulp task](https://github.com/CMSgov/design-system/blob/master/examples/react-app/Gulpfile.js).
- [Here's an example of how this step could be accomplished using Webpack](https://github.com/CMSgov/design-system/blob/master/examples/webpack-demo/webpack.config.js).

### Overriding asset paths

You can change the default paths by overriding the following Sass variables:

* `$font-path`
* `$image-path`

Without overriding these variables, it's possible that your fonts and images will not render correctly in your project.

### Learn more about build processes and asset management:

- [Grunt](https://gruntjs.com/)
- [Gulp](https://gulpjs.com/)
- [Webpack](https://webpack.js.org/)

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub](https://github.com/CMSgov/design-system/issues).
