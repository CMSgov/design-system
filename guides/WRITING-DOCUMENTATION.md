# Writing documentation

Documentation for the design system's components are automatically generated from their CSS and JS comments. In order for this to work, you need to follow some conventions set by the tools we use to generate the documentation: [KSS](https://github.com/kss-node/kss-node) and [react-docgen](https://github.com/reactjs/react-docgen).

## directory structure

child design system root
├── docs The directory path where documentation content and example code are located
└── src The directory path where component code, stles, fonts, and images are located

### The docs folder structure

The directory path where documentation content and example code are located

**Note:** Name and structure components as follows in order for the documentation site generation to work as expected.

For a component named "Foo", you would have the following:

```
child design system root
  └── docs
      └── src
          └── pages
              └── components
                  └── Foo                     Directory for component documentation content and code examples
                      ├── Foo.docs.scss       Component documentation wirtten in KSS
                      ├── Foo.example.jsx     React component example
                      └── Foo.example.html    HTML example
```

### The src folder structure

```
child design system root
  └── src
      ├── components
      │   └── Foo                     Directory for documentation content and example code
      │       ├── Foo.jsx             React component
      │       └── Foo.test.jsx        React component tests
      ├── fonts                       Directory for custom fonts
      ├── images                      Directory for custom images
      └── styles
          ├── base                    Directory for base styling for HTML elements
          │  └── _Foo.scss            Component SCSS
          ├── components              Directory for component styles and overrides
          ├── settings                Directory for system settings and orverrides
          ├── utilities               Directory for system utilities and overrides
          └── index.scss              The main SCSS file for a child design system
```

## CSS components

[KSS](https://github.com/kss-node/kss-node) is the primary way documentation is written. They establish what pages get created and the content on those pages. We use KSS to parse CSS comment blocks to extract documentation, and it expects your comment block to follow this particular format:

```scss
/*
[Heading]

[Description]

[@Flags]

[Modifiers]

Markup: [filename or inline HTML/EJS]

Style guide: [Reference]

[Documentation and guidance content inline]
*/
```

- Heading (required)

  - The heading is used for the title of a generated page or the heading if this is a subsection of a page. **note:** If you want to create a subsection without a heading, add `---` after the opening `/*`.

- Description

  - The description should describe what pattern does or should be used for in plain language.

- @Flags
  - To extend the default functionality of KSS, we've implemented support for custom flags. Flags should always come after the description.

| flag name                   | example                                                      | flag description                                                                                                                        |
| --------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| **`@hide-markup`**          | `@hide markup`                                               | Hides the code snippet.                                                                                                                 |
| **`@react-props [NAME]`**   | `@react-props Button.jsx`                                    | Displays the React prop documentation for a component. `[NAME]` is the filename of the react component where the Proptypes are defined. |
| **`@react-example [NAME]`** | `@react-example Button.example.jsx`                          | Displays the example file using this React component. `[NAME]` is the filename of the react example to be displayed.                    |
| **`@responsive`**           | `@responsive`                                                | Renders breakpoint toggles for the markup example.                                                                                      |
| **`@status [NAME]`**        | `@status Draft`                                              | Displays a status badge. `[NAME]` must be one of the following values: `Draft`, `Work in progress`, `Ready`, `Deprecated`.              |
| **`@uswds [URL]`**          | `@uswds https://designsystem.digital.gov/components/button/` | `[URL]` is the link to the corresponding US Web Design System component.                                                                |

### Modifiers

If the item you are documenting has multiple states or styles depending on added classes or pseudo-classes, you should document them in the modifiers section. [More info on modifiers from the KSS documentation site](https://warpspire.com/kss/syntax/).

### Markup

Markup examples shold be written in plain HTML in a separate `.html` file, relative to the SCSS file:

```
Markup: Button.example.html
```

#### Button.example.html file

```HTML
<button class="ds-c-button {{modifier}}">Button label</button>
```

### Style guide: Reference

The `reference` defines the documentation site's structure.

The expected format is:
`[Top-level slug].[Subpage slug].[Page section slug]` for example `Style guide: components.button.disabled`

The docs site supports a maximum of 2 levels of nesting. Pages nested a 3rd level will be displayed in the body of their parent page.

Pages generated from KSS comment blocks are ordered alphabetically, and page sections are displayed in the order in which they are in the SCSS file.

### Documentation and guidance

To add guidance content to the page, the page section's slug should be `guidance`.
For example: `components.buttons.guidance`

Guidance can be written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) if you include `---` right after your opening section comments, `/*`. For example

To link to another documentation page in your guidance content use a relative url. **Example:** `/components/button`

Documentation and guidance should be placed at the end of the SCSS file and conform to the following format:

```scss
/*
---

## Guidance

Content here

Style guide: components.component-name-goes-here.guidance
*/
```

When writing documentation and guidance please include the following sections.

- **Usability**
  - **When to use**
    - List typical use cases for this component
  - **When to consider alternatives**
    - List commonly confused use cases where an alternative component would be a better solution
  - **General guidance**
    - List any design or content guidelines related to how this component should be used
- **Accessibility**
  - List any accessibility considerations like required keyboard functionality, ARIA attributes, etc...
- **Theming (optional)**
  - List any Sass variables a developer could override to customize the appearance of the component
- **Related patterns (optional)**
  - List any related components or utility classes that connect with the component, whether as a parent, sibling, or child within the pattern's taxonomy.
- **Learn more**
  - List any links that served as inspiration, references, or research related to this component.

## Sample page

The example below is a new documentation page with a URL path of `/components/buttons`.

<details>
<summary>View sample page</summary>

```scss
/*
Buttons

Use buttons to signal actions.

@react-example Button.example.jsx

@react-props Button.jsx

Markup: button.example.html

.ds-c-button--primary - The primary call-to-action

Style guide: components.buttons
*/

.ds-c-button {
  ...
}

.ds-c-button--primary {
  ...
}

/*
---
## Guidance

content here
*/
```

</details>

#### Additional references

- [Build a Style Guide Straight from Sass](https://css-tricks.com/build-style-guide-straight-sass)

## Documenting React components

Using [`react-docgen`](https://github.com/reactjs/react-docgen), we extract documentation from comments in React component files. The documentation can include an overall description and a description for each of the component's `propTypes`.
**Note:** Documentation can be written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Description

To document a description for your component, include it on a line above the class definition like so:

```js
/**
* A Button component description
*/
export class Button extends React.PureComponent {
```

### propTypes

If a React component expects any `props`, you should document them within the component's [`propTypes` property](https://facebook.github.io/react/docs/typechecking-with-proptypes.html). To include a description for a `prop`, include it as a comment above the key/value like so:

```js
Button.propTypes = {
  label: React.PropTypes.node.isRequired,
  /**
   * Overwrite the button's `class` attribute by providing your own
   */
  className: React.PropTypes.string,
};
```

For internal/private props that you don't want to be displayed in the documentation, include the **`@hide-prop`** flag in the React prop description (ie. `_selectedId` in `<VerticalNav>`).

## General documentation pages

There might be cases where you need to create a page that's not associated with an example file. In these cases, you can create a markdown file in the `packages/design-system-docs/src/pages` directory. Each file in this directory will be rendered as an HTML page when the documentation is built. The filename will be used as the slug of the generated page.

The format of these markdown pages follow the same format as Jekyll pages:

### Front-matter

At the top of the Markdown page is YAML "front-matter". This defines the page's title and any other page properties (like `markup`, `weight`, etc...). Front-matter must be wrapped between these triple-dashed lines.

```
---
label: Get started
title: Hello world
markup: hello-world.example.html
weight: 100
---
```

#### Label (optional)

The `label` property is used for the nav label for a page. If it is not provided, the title property is used instead

#### Weight (optional)

The `weight` property controls the order of the page in the left navigation. `0` would be first followed by `1` then `2` and so on.

### Body

The content of the page comes after the front-matter section. You can write your content using a mix of Markdown and HTML.
