# What is a site package?

The CMS Design system provides a set of components and styles to meet many design and development needs. However, the CMS Design System does not fit every single need. When a custom component or design is needed that is not provided in the CMS Design System a site package should be created.

A site package is custom code (components, styles, etc...) that extends the CMS Design System.

## Site package guidelines

* A site package should be as small as possible.
* A site package is not meant to be as robust or as large as the entire CMS Design System.
* A site package is not meant to serve as a resource for best practices or accessibility guidelines, that's the responsibility of the design system.


## How to create a site package

Your theme directory should have a `src/index.scss` file, which is what will be used to override and augment the design system's styling.

For example:

```
└── my-theme             // the root of your theme (can be named whatever)
    └── src
        └── index.scss
```

And an example `index.scss` might look like:

```sass
$color-primary: #ff0000;
```

### Running locally

1. Clone the CMS design system repo onto your local machine.

   ```bash
   git clone https://github.com/CMSgov/design-system.git design-system
   ```

1. Change directories to the `design-system`.
    ```bash
    cd design-system
    ```

1. Install and start the CMS design system documentation site.
   ```bash
   yarn install && yarn start
   ```
   The documentation site should load at the address: http://localhost:3000/

1. Let's create a few directories and files
  1. Create a **`themes`** directory inside the `packages` directory:
  1. Create a **`my-theme`** directory inside the `themes` directory you just created. **Note** you can replace `my-theme` with whatever name you like.
  1. Create a **`src`** directory inside the `my-theme` directory.
  1. Inside the  `src` direcotry
    1. Create an **`index.js`** file and leave it empty.
    1. Create an **`index.scss`** file.
    1. add the following to the `index.scss` file
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

1. At this point, the design system directory should have a file structure like...
```
design-system
  └── packages
      └── themes
          └── my-theme
              └── src
                  ├── styles
                  │   ├── variables.scss
                  │   └── overrides.scss
                  ├── index.scss
                  └── index.js

   ```   
   Note: You may be tempted to symlink your theme into the `packages/themes` directory, but unfortunately this won't work due to the way Lerna manages dependencies. [See this issue for more info](https://github.com/lerna/lerna/issues/1068).
1. From the root of the design system's directory, you can now run `yarn install` to install and symlink your theme's dependencies. After any dependencies are installed, run **`yarn start:theme`** to generate documentation and preview your theme's styles. If you'd like to use the design system's tooling to also compile your theme's files, you can run **`yarn build:theme`**.

### Generating documentation for your theme

**Note**: If you plan to document and show React component examples, your theme directory should include a valid [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) to describe how your modules should be transformed.

Since your theme is now using the design system's tooling, this means you can also create new documentation pages from your theme's files using the same methods used for creating the design system's documentation! [Learn how to write documentation](https://github.com/CMSgov/design-system/wiki/writing-documentation).

When you run `yarn build:theme`, the documentation will be placed in a `docs` sub-directory within your theme's directory.


* [Read more about running the design system locally](https://github.com/CMSgov/design-system/blob/master/README.md#running-locally)

### Theming colors, typography and spacing

The design system supports the ability to "theme" its colors, typography, and spacing. This is accomplished by overriding the default Sass variables. You can browse the source files on GitHub for [color variables](https://github.com/CMSgov/design-system/blob/master/packages/support/src/settings/_variables.color.scss), [typography variables](https://github.com/CMSgov/design-system/blob/master/packages/support/src/settings/_override.uswds.scss), [margin variables](https://github.com/CMSgov/design-system/blob/master/packages/core/src/utilities/margin.scss), and [padding variables](https://github.com/CMSgov/design-system/blob/master/packages/core/src/utilities/padding.scss) used in the CMS Design System.

## Previewing and compiling themes

The CMS Design System supports the ability to preview your project's theme in the context of the design system's documentation site. This can be a convenient way to preview how your project's Sass affects the existing component styles.
