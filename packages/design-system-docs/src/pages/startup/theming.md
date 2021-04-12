---
title: Theming
weight: 5
---

The design system supports the ability to customize or theme certain styles like its color palette, type scale, and spacing. This is accomplished by overriding the default Sass variables or CSS declarations.

Theming does not extend the functionality of the design system – i.e., it does not add new components, or modify the functionality of existing ones. If you wish to customize React components and publish your modifications as a new design system, consider creating a [child design system]({{root}}/startup/child-design-systems).

## Sass variables

All design system styles are available as either Sass or CSS files. [Sass](https://sass-lang.com/) is a CSS preprocessor, and its biggest benefit is the ability to define [variables](https://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_). Similar to other languages, like JavaScript, you can define a variable once (ie. `$color-primary`) and then reference that variable throughout your CSS declarations.

If your site is using Sass, you can override the design system's default Sass variables. Variables exist for every color, type size, and spacing value used in the design system. The biggest benefit of overriding a Sass variable is it only requires one line of code, and any utility class or component that references that variable will automatically be updated to use it, without introducing additional CSS.

### Variable overrides

To override Sass variables, create a new `.sass` or `.scss` file where you will define the new variable value:

```css
/* _color-overrides.scss */
$color-primary: #ff0000;
```

Then, in your main stylesheet, import your overrides file _before_ you [import the design system's Sass files]({{root}}/startup/sass-and-css/#sass):

```css
/* main.scss */
@import 'color-overrides';
@import '{{npm}}/dist/scss/index';
```

See the [child design system example](https://github.com/CMSgov/design-system/tree/master/examples/child-design-system/src/styles/settings) for a more complex example of Sass variable overrides.

### Available variables

Sass variables are documented on the relevant documentation pages, and are defined in the `{{npm}}` package:

- [Breakpoints]({{root}}/guidelines/responsive/)
- [Colors]({{root}}/styles/color/)
- [Spacing]({{root}}/styles/spacing/)
- [Type sizes]({{root}}/styles/typography/)

You can also [browse all Sass variable files on GitHub](https://github.com/CMSgov/design-system/tree/master/packages/design-system/src/styles/settings/variables).

#### Focus style variables

The focus styles are disabled by default. However if you'd like to use them
set the `$ds-include-focus-styles` variable to `true`.

**Focus style variables**

- `$focus-color` - Sets background highlight color.
- `$focus-shadow` - Sets box-shadow on text fields.
- `$focus-shadow-link` - Sets box-shadow on buttons and links.
- `$focus-color-inverse`- Sets background highlight color on dark backgrounds.
- `$focus-shadow-inverse`- Sets box-shadow on text fields on dark backgrounds.
- `$focus-shadow-link-inverse` - Sets box-shadow on buttons and links on dark backgrounds.

**Mixins**

- `focus-text` - Mixin for links and buttons.
- `focus-text-inverse` - Mixin for links and buttons on dark backgrounds.

See the [v2 migration guide](https://design.cms.gov/startup/migrating-v2/#focus-styles) for more background on our focus styles.

## Overriding component, utility, base styles

Oftentimes overriding Sass variables will not be enough to achieve the desired styles. In these cases, it's possible to override any of the design system's component, utility, or base styles by redefining the classes.

```css
/* _form-overrides.scss */
.ds-c-field {
  &:focus {
    box-shadow: 0 0 0 3px $focus-text-field-color-highlight, inset 0 0 0 1px $focus-text-field-color;
    border-color: $focus-text-field-color;
  }
  font-size: $h4-font-size;
  border-radius: 5px;
  border: 2px solid $custom-color;
}
```

Unlike Sass variable overrides, these styles must be declared _after_ importing the design system. These are often used in conjunction with Sass variable overrides.

```css
/* main.scss */

/* Sass variable overrides */
@import 'color-overrides';

/* Design system */
@import '{{npm}}/dist/scss/index';

/* Component overrides */
@import 'form-overrides';
```

See the [child design system example](https://github.com/CMSgov/design-system/blob/master/examples/child-design-system/src/styles/index.scss) for a more complex example of Sass component, utility, and base overrides.

## CSS declarations

If you're not using Sass, another way to customize the design system is by overriding its CSS declarations. This isn't the most ideal solution since it'll require extra work on your end. It also means you'll be introducing more declarations. Be conscious of this and keep an eye on your file size. If you find yourself overriding a large portion of the design system, consider switching to Sass so you can take advantage of Sass variables.

## Learn more

- [View an example project with a Sass build process](https://github.com/CMSgov/design-system/tree/master/examples/react-app)

## Updating font sizing

We've updated the utility font size and typography classes to make them more flexible by removing the heading references (h1, h2, etc...) from within the class names and are now using a basic sizing scale (xl, lg, etc...).

### Design system font sizing

Before:

- `.ds-h{level}` where level is a number between `1` and `6`

After:

- `.ds-text-heading--[5xl|4xl|3xl|2xl|xl|lg|md|base|sm]`

To update:

- `.ds-display` update to `.ds-text-heading--5xl`
- `.ds-title` update to `.ds-text-heading--4xl`
- `.ds-h1` update to `.ds-text-heading--3xl`
- `.ds-h2` update to `.ds-text-heading--2xl`
- `.ds-h3` update to `.ds-text-heading--xl`
- `.ds-h4` update to `.ds-text-heading--lg`
- `.ds-h5` update to `.ds-text-heading--md`
- `.ds-h6` update to `ds-text-heading--sm`
- `.ds-text--lead` update to `.ds-text-body--lg`
- `.ds-text` update to `ds-text-body--md`

### font size utilities

Before:

- `.ds-u-font-size--display|title|h1|h2|h3|h4|lead|base|small]`

After:

- `.ds-u-font-size--[5xl|4xl|3xl|2xl|xl|lg|md|base|sm]`

To update:

- `.ds-u-font-size--display` update to `.ds-u-font-size--5xl`
- `.ds-u-font-size--title` update to `.ds-u-font-size--4xl`
- `.ds-u-font-size--h1` update to `.ds-u-font-size--3xl`
- `.ds-u-font-size--h2` update to `.ds-u-font-size--2xl`
- `.ds-u-font-size--h3` update to `.ds-u-font-size--xl`
- `.ds-u-font-size--h4` update to `.ds-u-font-size--lg`
- `.ds-u-font-size--lead` update to `.ds-u-font-size--md`
- `.ds-u-font-size--base` update to `.ds-u-font-size--base`
- `.ds-u-font-size--small` update to `.ds-u-font-size--sm`

### font size variable updates

We've added new variables to be used to customize the global sizing values.

- `$font-size-5xl`
- `$font-size-4xl`
- `$font-size-3xl`
- `$font-size-2xl`
- `$font-size-xl`
- `$font-size-lg`
- `$font-size-md`
- `\$font-size-sm
