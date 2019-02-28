---
title: Theming
weight: 10
---

The design system supports the ability to "theme" certain aspects like its color palette, type scale, and spacing. There are a few ways to accomplish this.

## Sass variables

All design system styles are available as either Sass or CSS files. [Sass](https://sass-lang.com/) is a CSS preprocessor, and its biggest benefit is the ability to define [variables](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_). Similar to other languages, like JavaScript, you can define a variable once (ie. `$color-primary`) and then reference that variable throughout your CSS declarations.

If your site is using Sass, you can override the design system's default Sass variables. Variables exist for every color, type size, and spacing value used in the design system. The biggest benefit of overriding a Sass variable is it only requires one line of code, and any utility class or component that references that variable will automatically be updated to use it, without introducing additional CSS.

### Overriding Sass variables

To override Sass variables, create a new `.sass` or `.scss` file where you will define the new variable value:

```css
/* overrides.scss */
$color-primary: #ff0000;
```

Then, in your main stylesheet, import your overrides file _before_ you [import the design system's Sass files](/startup/sass-and-css/#sass):

```css
/* main.scss */
@import 'overrides';
@import '@cmsgov/design-system-core/src/index';
```

### Available variables

Sass variables are documented on the relevant documentation pages, and are defined in the `@cmsgov/design-system-support` package:

- [Breakpoints]({{root}}/guidelines/responsive/)
- [Colors]({{root}}/style/color/)
- [Spacing]({{root}}/layout/spacing/)
- [Type sizes]({{root}}/style/typography/)
- You can also [browse all Sass variable files on GitHub](https://github.com/CMSgov/design-system/tree/master/packages/support/src).

## CSS declarations

If you're not using Sass, another way to "theme" the design system is by overriding its CSS declarations. This isn't the most ideal solution since it'll require extra work on your end. It also means you'll be introducing more declarations. Be conscious of this and keep an eye on your file size. If you find yourself overriding a large portion of the design system, consider switching to Sass so you can take advantage of Sass variables.

## Learn more

- [Previewing and compiling themes](https://github.com/CMSgov/design-system/wiki/site-packages-and-themes)
- [View an example project with a Sass build process](https://github.com/CMSgov/design-system/tree/master/examples/react-app)
