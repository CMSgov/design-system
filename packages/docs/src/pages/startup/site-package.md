---
title: Building a site package
weight: 9
---

The CMS Design system (CMSDS) provides a set of components and styles to meet many design and development needs. However, the CMSDS does not fit every single need.

## What is a site package?

A site package is custom code (components, styles, etc..) that extends the CMSDS and is published in a way that can be consumed via NPM by other teams. A site package could contain new components, modifications to existing components, or modifications to styles. A site package can also contain a theme, but doesn’t have to.

### Site package guidelines

- A site package should be as small as possible.
- A site package is not meant to be as robust or as large as the entire CMS Design System.
- A site package is not meant to serve as a resource for best practices or accessibility guidelines, that's the responsibility of the design system.

### How to create a site package

1. Clone the CMS design system repo onto your local machine. We're cloning into a directory named `design-system`, but feel free to name your directory something else.

   ```bash
   git clone https://github.com/CMSgov/design-system.git design-system
   ```

1. Inside your newly cloned `design-system` directory:

   1. Create a **`themes`** directory inside the `packages` directory.
   1. Create a **`my-theme`** directory inside the `themes` directory. **Note**: You can replace `my-theme` with whatever name you like.
   1. Create a **`src`** directory inside the `my-theme` directory.
   1. Inside the `src` directory:

      1. Create an **`index.js`** file and leave it empty.
      1. Create an **`index.scss`** file with the following contents:

      ```SCSS
      // Set your site package variables first
      @import "styles/variables";

      // Original CMS Design System sass files"
      @import "@cmsgov/design-system-core/src/index.scss";
      @import "@cmsgov/design-system-support/src/index.scss";
      @import "@cmsgov/design-system-layout/src/index.scss";

      // Set your overrides to classes and styles
      @import "styles/overrides";
      ```

   1. Create a **`styles`** directory inside the `src` directory.
      1. Inside the `styles` directory:
         1. Create a **`variables.scss`** file
         2. Create an **`overrides.scss`** file

1. At this point, the site package theme structure should look like this...

```
design-system
  └── packages
      └── themes
          └── my-theme
              └── src
                  ├── styles
                  │   ├── overrides.scss
                  │   └── variables.scss
                  ├── index.js
                  └── index.scss
```

4. Run `yarn install && yarn start` from the root of the design system directory to install design system dependencies.

The documentation site should load at the address: http://localhost:3000/

### Previewing your site package

The CMS Design System supports the ability to preview your project's theme in the context of the design system's documentation site. This can be a convenient way to preview how your project's Sass affects the existing component styles as well as test any custom components.

1. Run `yarn start:theme` to generate documentation and preview your theme's styles. A `docs` sub-directory will be placed in your theme's directory.
1. Run `yarn build:theme` to compile the documentation site for your theme. A `docs` sub-directory will be placed in your theme's directory.

**Note**:

- If you have multiple themes inside of `packages/themes`, you can specify which theme to run by passing the name of the folder. For example, `yarn start:theme my-theme-folder-name`
- If your documentation site will be uploaded to a subdirectory like `example.com/design-system`, you can set the root path by passing the `--root` option. For example, `yarn build:theme --root design-system`
- If you are wanting to preview your theme from another GitHub repo copy the site package files into the packages > themes directory.

### How to create documentation for your site package

You can [create documentation pages](https://github.com/CMSgov/design-system/blob/master/guides/WRITING-DOCUMENTATION.md) from your theme's files using the same methods used for creating the design system's documentation.

## What is a theme?

The CMS Design System supports the ability to "theme" the visual layer. Colors, typography, and spacing can be modified by overriding the default Sass variables or CSS. Theming does not extend the functionality of the design system – i.e., it does not add new components, or modify the functionality of existing ones.

### How to modify colors, typography and spacing

The design system supports the ability to "theme" its colors, typography, and spacing. This is accomplished by overriding the default Sass variables. You can browse the source files on GitHub for [color variables](https://github.com/CMSgov/design-system/blob/master/packages/support/src/settings/_variables.color.scss), [typography variables](https://github.com/CMSgov/design-system/blob/master/packages/support/src/settings/_variables.type.scss) and [layout variables](https://github.com/CMSgov/design-system/blob/master/packages/support/src/settings/_variables.layout.scss) used in the CMS Design System.

---

**Note**: If you plan to document and show React component examples, your theme directory should include a valid [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) to describe how your modules should be transformed.

[Read more about running the design system locally](https://github.com/CMSgov/design-system/blob/master/README.md#running-locally)
