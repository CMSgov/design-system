---
title: Using components
weight: 3
---

## Using React components

**We strongly recommend using the React versions of our components.** React allows for more complex, interactive components like `Tabs` or `VerticalNav`, and many of our React components have built in accessibility optimizations.

The examples below assume you've [installed the design system using NPM]({{root}}/startup/installation/) and have already setup your build system for React.

### Named imports

Components can be imported from the package entry point using the syntax below.

<div class="ds-c-alert ds-c-alert--warn ds-u-margin-bottom--2 ds-u-font-size--small">
  <div class="ds-c-alert__body">
    <h3 class="ds-c-alert__heading ds-u-font-size--base">Performance note</h3>
    <p class="ds-c-alert__text">
      This approach may result in a larger file size than intended. Depending on what module bundler you use, all of the design system's React components may be included in the bundled file even if you didn't specifically import them. This can be avoided by using [tree shaking in Webpack](https://webpack.js.org/guides/tree-shaking/).
    </p>
  </div>
</div>

```jsx
import { Button, TextField } from '{{npm}}';
```

The `{{npm}}` package provides an ES modules version of our code to support Webpack 4's tree shaking optimizations. Our package is configured to use the `modules` property to let bundlers know to resolve imports from `{{npm}}` to the ES modules version when preferred. Read more about ESM in [Webpack's documentation](https://webpack.js.org/guides/author-libraries/#final-steps), or from [Rollup's proposal](https://github.com/rollup/rollup/wiki/pkg.module).

### Individual imports

Components can also be imported from their individual export file. This method carries no risk of including unused or extra code, as you are only importing from a specific file.

```jsx
import Button from '{{npm}}/dist/components/Button/Button';
import TextField from '{{npm}}/dist/components/Button/TextField';
```

### Usage

After importing the React component, tell React to render the component in the DOM:

```jsx
ReactDOM.render(
  <Button
    variation="primary"
    className="custom-btn"
    onClick={() => alert('Button clicked!')}>
    Button react component
  </Button>
  document.querySelector('#app'),
);
```

More React prop documentation, examples, and guidance can be found on component documentation pages.

## Using CSS components

If your project doesn't use React, we provide a HTML/CSS-only version of our components. This includes styles for every component in the library, but you’ll be responsible for writing the correct markup and updating classes and DOM attributes in response to user events.

This example assumes you've already added [design system styles via CSS or Sass]({{root}}/startup/sass-and-css/).

```html
<div class="ds-c-alert ds-c-alert--warn">
  <div class="ds-c-alert__body">
    <h3 class="ds-c-alert__heading">Warning status</h3>
    <p class="ds-c-alert__text">
      Alert warning body text
    </p>
  </div>
</div>
```

More HTML/CSS examples and guidance can be found on component documentation pages.

<h2 id="examples" class="ds-h2 ds-u-color--primary-darker">Examples</h2>

Additional examples of the design system in use can be viewed on GitHub. These projects demonstrate the various ways you can incorporate the design system into your development process and various use cases.

- [Webpack example](https://github.com/CMSgov/design-system/blob/master/examples/react-app)
- [CSS-only example](https://github.com/CMSgov/design-system/blob/master/examples/form)

<a href="https://github.com/CMSgov/design-system/tree/master/examples/" class="ds-c-button">Browse example projects</a>

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub]({{github}}/issues).
