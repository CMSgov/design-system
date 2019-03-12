# Writing documentation

Documentation for the design system's components are automatically generated from their CSS and JS comments. In order for this to work, you need to follow some conventions set by the tools we use to generate the documentation: [KSS](https://github.com/kss-node/kss-node) and [react-docgen](https://github.com/reactjs/react-docgen).

# File naming

Name and structure components as follows in order for docs generation to work as expected.

For a component named "Foo", you would have the following:

```
└── components
    └── Foo                     A directory holding all relevant component files
        ├── Foo.scss            Styling and KSS comment blocks
        ├── Foo.jsx             React component
        ├── Foo.test.jsx        React component tests
        └── Foo.example.jsx     React component used to render an example
```

# CSS components

[KSS](https://github.com/kss-node/kss-node) is the primary way documentation is written. They establish what pages get created and the content on those pages. We use KSS to parse CSS comment blocks to extract documentation, and it expects your comment block to follow this particular format:

```css
/*
[Heading]

[Description]

[@flags]

Markup:
[Inline HTML/EJS or filename]

[Modifiers]

Style guide: [Reference]
*/
```

### Heading

The heading is used for the title of a generated page or the heading if this is a subsection of a page.

This is a required field, but if you want to create a subsection without a heading, you can enter `---`.

### @flags

To extend the default functionality of KSS, we've implemented support for custom flags. Flags should always come after the description.

Supported flags:

- **`@hide-example`** Hides the example and code snippet. Useful for rendering just the prop docs for React components.
- **`@hide-markup`** Hides the code snippet.
- **`@react-component [NAME]`** Displays the React component's example and `PropType` documentation.
  - where `[NAME]` is a component's name relative to the source documentation file, or a path (without a file extension) relative to `packages`

    **Example**: `@react-component Button` or `@react-component core/src/Components/Button/Button`.

    See [File naming](#file-naming) above for more info.
- **`@react-example [NAME]`** Displays an example using this React component.
- **`@responsive`** Renders breakpoint toggles for the markup example.
- **`@status [alpha|beta]`** Displays a status badge. Supported values: `alpha`, `beta`.
- **`@uswds [URL]`** Marks the component as a US Web Design Standard component. Enter the URL so the documentation can link to the corresponding USWDS page.

### Markup

Markup examples can be written in plain HTML or [EJS](http://ejs.co/). The markup can be written inline or within a separate `.html` or `.ejs` file, relative to the CSS file:

<details>
<summary>Inline HTML example</summary>

```
Markup:
<button class="ds-c-button {{modifier}}">Button label</button>
```
</details>


<details>
<summary>Inline EJS example</summary>

```
Markup:
<% ['bottom', 'left', 'right', 'top'].forEach(name => { -%>
  <div class="ds-u-margin-<%= name %>--1"></div>
<% }) -%>
```
</details>

<details>
<summary>HTML file example</summary>

```
Markup: Button.example.html
```
</details>

### Reference - URL's and hierarchy

The `reference` defines the documentation site's structure.

The expected format is:
`[Top-level slug].[Subpage slug].[Page section slug]`

As you might be able to tell from the format, the docs site supports a maximum of 2 levels of nesting. Pages nested a 3rd level will be displayed in the body of their parent page.

Pages generated from KSS comment blocks are ordered alphabetically, and page sections are displayed in the order in which they are in the CSS file.

### Guidance

To add content to the "Guidance" tab of a page, the page section's slug should begin with `guidance`. For example: `components.buttons.guidance`

To link to another documentation page, you can prefix the relative url with `{{root}}` to have the correct path added to the URL when the site is generated. For example: `{{root}}/components/button`

In general, the guidance comment block should be placed at the end of the CSS file and conform to the following format:

<details>
<summary>View example</summary>

```css
/*
---

## When to use

- List typical use cases for this component

## When to consider alternatives

- List commonly confused use cases where an alternative
  component would be a better solution

## Guidance

- List any design or content guidelines related to how
  this component should be used

## Accessibility

- List any accessibility considerations like required
  keyboard functionality, ARIA attributes, etc

## Theming

- List any Sass variables a developer could override
  to customize the appearance of the component

## Future research

- Optionally list any suggestions for future research
  that could mature and extend the component

## Related patterns

- List any related components or utility classes that
  connect with the component, whether as a parent, sibling,
  or child within the pattern's taxonomy.

## Learn more

- List any links that served as inspiration, references,
  or research related to this component.

Style guide: components.component-name-goes-here.guidance
*/
```

</details>

### Example

The example below would create a new documentation page with a URL path of `/components/buttons`.

<details>
<summary>View example</summary>

```css
/*
Buttons

Use buttons to signal actions.

@react-component Button

Markup:
<button type="button" class="ds-c-button {{modifier}}">Button label</button>

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
KSS doesn't care about this comment since it doesn't have a Reference
*/
```
</details>

#### Additional references

- [Build a Style Guide Straight from Sass](https://css-tricks.com/build-style-guide-straight-sass)

----

# React components

Using [`react-docgen`](https://github.com/reactjs/react-docgen), we extract documentation from comments in React component files. The documentation can include an overall description and a description for each of the component's `propTypes`.

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
  className: React.PropTypes.string
};
```

For internal/private props that you don't want to be displayed in the documentation, prefix the prop with an underscore (ie. `_parentDefaultSelectedId`).

----

# Markdown pages

For the most part, documentation will be generated from CSS and JS comments as detailed above. However, there might be cases where you need to create a page that's not associated with another file. In these cases, you can create a markdown file in the `packages/docs/src/pages` directory. Each file in this directory will be rendered as an HTML page when the documentation is built. The filename will be used as the slug of the generated page.

The format of these markdown pages follow the same format as Jekyll pages:

### Front-matter

At the top of the Markdown page is YAML "front-matter". This defines the page's title and any other page properties (like `markup`, `weight`, or any support [flags](#flags)). Front-matter must be wrapped between these triple-dashed lines. For example:

```
---
title: Hello world
markup: hello-world.example.html
weight: 100
---
```

### Body

The content of the page comes after the front-matter section. You can write your content using a mix of Markdown and HTML.

### Themes

To override a Markdown page from a [theme](https://github.com/cmsgov/design-system/wiki/site-packages-and-themes), create a Markdown file with the same filename as the one you're overriding in a `src/pages` sub-directory (ie. `packages/themes/my-theme/src/pages/getting-started.md`
