# What is a site package?

HealthCare.gov consists of multiple codebases maintained by different teams. Currently this means some design assets and code are duplicated across codebases, going against the software development principle to keep things [DRY](https://en.m.wikipedia.org/wiki/Don%27t_repeat_yourself). These multiple codebases naturally tend to have differences, and as a result have caused inefficiencies and inconsistencies to creep into the user interface.

The CMS (Centers for Medicare & Medicaid Services) Design System is one way we're addressing this issue. However, the CMS design system is meant to be used by many CMS websites, not just HealthCare.gov. As a result, the resources within the CMS design system are not tied to a particular website.


## Site package goals

* **Primary goal:** Reduce the amount of duplicate instances of front-end components and design assets by having a single source of truth.

* **Secondary goal:** Serve as an intermediate step in a component's journey to becoming part of the CMS design system. This gives the teams working on HealthCare.gov a space to share and iterate on components that at first appear to only have a use case on HealthCare.gov.

## Site package guidelines

* A site package is not meant to be as robust or as large as the CMS Design System. 
* A site package should be as small as possible.
* A site package is not meant to serve as a resource for best practices or accessibility guidelines, that's the responsibility of the design system.

# Site packages and themes

The design system supports the ability to "theme" certain aspects like its color palette, type scale, and spacing. This is accomplished by overriding the default Sass variables, as documented on [design.cms.gov](https://design.cms.gov). You can also [browse the source files](https://github.com/CMSgov/design-system/tree/master/packages/support) to identify all Sass variables used in the design system.

## Previewing and compiling themes

The design system's tooling supports the ability to preview your project's theme in the context of the design system's documentation site. This can be a convenient way to preview how your project's Sass affects the existing component styles.

### Expected file structure

In order for this all to work, your theme's files should be structured in a particular way. At a minimum, your theme directory should have a `src/index.scss` file, which is what will be used to override and augment the design system's styling.

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

1. First, clone the CMS design system's repo onto your local machine if it's not already, using Terminal.

   ```bash
   git clone https://github.com/CMSgov/design-system.git design-system
   ```
1. Change directories to the `design-system`.
    ```bash
    cd design-system
    ```
1. Install and start the CMS design system documentation site. Confirm that everything works and the documentation site loads as expected at the address: http://localhost:3000/
   ```bash
   yarn install && yarn start
   ```
   [Read more about the design system's local development environment](https://github.com/CMSgov/design-system/blob/master/README.md#running-locally)
1. Create a **`themes`** directory inside of the design system's `packages` directory:
   ```bash
   mkdir -p packages/themes
   ```
1. Then place (or clone) your theme into **`packages/themes/my-theme`** (`my-theme` can be named whatever you want).
   At this point, the design system directory should have a file structure like...
   ```
   └── design-system
       └── packages
           ├── core
           ├── themes
           │   └── my-theme
           └── other packages...
   ```   
   Note: You may be tempted to symlink your theme into the `packages/themes` directory, but unfortunately this won't work due to the way Lerna manages dependencies. [See this issue for more info](https://github.com/lerna/lerna/issues/1068).
1. From the root of the design system's directory, you can now run `yarn install` to install and symlink your theme's dependencies. After any dependencies are installed, run **`yarn start:theme`** to generate documentation and preview your theme's styles. If you'd like to use the design system's tooling to also compile your theme's files, you can run **`yarn build:theme`**.

### Generating documentation for your theme

Since your theme is now using the design system's tooling, this means you can also create new documentation pages from your theme's files using the same methods used for creating the design system's documentation! [Learn how to write documentation](https://github.com/CMSgov/design-system/wiki/writing-documentation).

When you run `yarn build:theme`, the documentation will be placed in a `docs` sub-directory within your theme's directory.

**Important**: If you plan to document and show React component examples, your theme directory should include a valid [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) to describe how your modules should be transformed.
