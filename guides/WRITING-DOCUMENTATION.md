# Writing documentation

Documentation for the design system's components are automatically generated from their CSS and JS comments. In order for this to work, you need to follow some conventions set by the tools we use to generate the documentation: [KSS](https://github.com/kss-node/kss-node) and [react-docgen](https://github.com/reactjs/react-docgen).

- [Folder structure](#folder-structure)
- [Writing component documentation](#writing-component-documentation)
- [Writing general documentaion](#writing-general-documentation)

# Folder structure

### The docs folder structure

**Note:** Name and structure components as follows in order for the documentation site generation to work as expected.

For a component named "Foo", you would have the following:

```
docs/src
└── pages
    ├── components
    |   └── Foo                     // Folder for component documentation content and code examples
    |       ├── Foo.docs.scss       // Component documentation wirtten in KSS
    |       ├── Foo.example.jsx     // React component example
    |       └── Foo.example.html    // HTML example
    ├── guidelines      // Folder for documentation guideline pages
    ├── patterns        // Folder for pattern documentation and example files
    ├── startup         // Folder for documentation statup pages
    ├── styles          // Folder for styles for the documentation site
    └── utilities       // Folder for Utility documentation and example files
```

# Writing component documentation

[KSS](https://github.com/kss-node/kss-node) is the primary way documentation is written for pages with code examples, i.e. components, patterns, utilities.

KSS documentation should be written in a SCSS file with the following naming convention: `Foo.docs.scss`, where "Foo" is the name of the component, pattern, or utility that the page is documenting.
Please use the following format when writing component documentation.

```scss
/*
[Heading]

[Description]

[@Flags]

[Modifiers]

Markup: [filename]

Style guide: [Reference]

[Documentation and guidance content]
*/
```

## Page sections

### Heading (required)

The heading is used for the title of a generated page or the heading if this is a subsection of a page. **note:** If you want to create a subsection without a heading, add `---` after the opening `/*`.

### Description

The description should describe what pattern does or should be used for in plain language.

### @Flags

To extend the default functionality of KSS, we've implemented support for custom flags. Flags should always come after the description.

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

Markup examples should be written in a separate `example.html` file, which should be located in the same directory as the SCSS docs file:

```
Markup: Button.example.html
```

### Style guide

The `reference` defines the documentation site's structure.

The expected format is: `[Top-level slug].[Subpage slug].[Page section slug]`.
For example, `Style guide: components.button.disabled`.

The docs site supports a maximum of 2 levels of nesting. Pages nested a 3rd level will be displayed in the body of their parent page.

Pages generated from KSS comment blocks are ordered alphabetically, and page sections are displayed in the order in which they are in the SCSS file.

### Guidance

To add a guidance section to the page the `style guide:` `[Page section slug]` should be `guidance`.
For example: `Style guide: components.button.guidance`

Guidance should be written using [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) if you include `---` right after your opening section comments, `/*`.

To link to another documentation page in your guidance content use a relative url.
For example, `/components/button`

Documentation and guidance should be placed at the end of the SCSS file and conform to the following format and sections:

<details>
<summary><b>View guidance section example</b></summary>

```scss
/*
---

### When to use

List typical use cases for this component.

### When to consider alternatives

List commonly confused use cases where an alternative component would be a better solution.

### Usage

List any design or content guidelines related to how this component should be used.

### Accessibility

List any accessibility considerations like required keyboard functionality, ARIA attributes, etc...

### Theming (optional)

List any Sass variables a developer could override to customize the appearance of the component.

### Related patterns

List any related components or utility classes that connect with the component, whether as a parent, sibling, or child within the pattern's taxonomy.

### Learn more 

List any links that served as inspiration, references, or research related to this component.

Style guide: components.component-name.guidance
*/
```

</details>

## Example

The example below is a documentation page with a URL path of `/components/buttons`.

<details>
<summary><b>View sample page</b></summary>

```scss
/*
Button

Button description 

@uswds https://designsystem.digital.gov/components/buttons

Markup: button.example.html

Style guide: components.button
*/

/*
`<Button>`

The `Button` component accepts its text as children (AKA inner HTML), which
means you can also pass in HTML or custom components. This gives you a lot of
flexibility and supports a variety of advanced use cases. The most common use
case would be passing in an SVG icon along with the text.

In addition to the supported props listed, you can also pass in additional
props, which will be passed to the rendered root component. For example,
you could pass in a `target` prop to pass to the rendered anchor element.

@react-example Button.example.jsx

@react-props Button.jsx

Style guide: components.button.react
*/

/*
---
### When to use

content here

Style guide: components.component-name-goes-here.guidance
*/
```

</details>

## Documenting React components

Using [`react-docgen`](https://github.com/reactjs/react-docgen), we extract a description for each of the component's `propTypes` from comments in React component files.

### Description

To document your React component, create a new section in your KSS file

```SCSS
/*
`<Button>`

The buttom component descrription

@react-example Button.example.jsx

@react-props Button.jsx

Style guide: components.button.react
*/
```

### PropTypes

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

# Writing general documentation

There might be cases where you need to create general content pages that do not contain an code examples. In these cases, create a markdown file in the `docs/src/pages` Folder. Each file in this folder will be rendered as an HTML page when the documentation is built. The filename will be used as the slug of the generated page.

The format of these markdown pages follow the same format as Jekyll pages:

### Front-matter

At the top of the Markdown page is YAML "front-matter". This defines the page's title and any other page properties (like `markup`, `weight`, etc...). Front-matter must be wrapped between these triple-dashed lines.

```
---
label: Hello World
title: Hello world
markup: hello-world.example.html
weight: 100
responsive: true
uswds: https://designsystem.digital.gov/page-templates/
usage: |
  Hellow world this is the description of the page
---
```

| Front-matter property       | description                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`label (optional)`**      | The `label` property is used for the nav label for a page. If it is not provided, the title property is used instead                |
| **`title`**                 | The `title` property is used for the page heading.                                                                                  |
| **`markup (optional)`**     | The `markup` property can be used to link to an HTML code example.                                                                  |
| **`weight (optional)`**     | The `weight` property controls the order of the page in the left navigation. `0` would be first followed by `1` then `2` and so on. |
| **`responsive (optional)`** | The `responsive` property shows the markup example in a responsive frame. This can only be set to `true` or `false`.                |
| **`uswds (optional)`**      | The `uswds` property is used to link to the corresponding US Web Design System component.                                           |
| **`usage (optional)`**      | The `usage` property is used to to generate a page description.                                                                     |

### Page content

The content of the page comes after the front-matter section. You can write your content using a mix of Markdown and HTML.
