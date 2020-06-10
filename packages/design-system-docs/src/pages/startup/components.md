---
title: Using components
weight: 3
---

<h2>Using React components</h2>

**We strongly recommend using the React versions of our components.** It allows for more complex, interactive components like `Tabs` or `VerticalNav`, and many of our React components include accessibility optimizations.

The examples below assume you've [installed the design system using NPM]({{root}}/startup/installation/) and have already setup your build system for React.

<h3>Named imports</h3>

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
import { Button } from '@cmsgov/design-system';
import { TextField, ChoiceList } from '@cmsgov/design-system';
```

The `@cmsgov/design-system` package is configured to automatically work with Webpack 4's tree shaking. We provide a separate entry point (`index.es.js`) and component directory (`esnext`) for ES modules to support these optimizations.

<h3>Individual imports</h3>

Components can also be imported from their individual export file. This method carries no risk of including unused or extra code, as you are only importing from a specific file.

```jsx
import Button from '@cmsgov/design-system/dist/components/Button/Button';
```

<h3>Usage</h3>

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

See [React component documentation]({{root}}/components/button/#components.button.react) for more react examples, guidance, and detailed prop documentation.

<h2>Using CSS components</h2>

If your project doesn't use React, we provide a CSS-only version of our components. This includes styles for every component in the library, but you’ll be responsible for writing the correct markup and updating classes and DOM attributes in response to user events.

This example assumes you've already added [design system styles via CSS or Sass]({{root}}/startup/sass-and-css/) by including either the CSS or Sass.

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

See [component documentation]({{root}}/components/alert/) for more HTML/CSS examples and guidance.

<h2 id="examples" class="ds-h2 ds-u-color--primary-darker">Examples</h2>

Additional examples of the design system in use can be viewed on GitHub. These projects demonstrate the various ways you can incorporate the design system into your development process and various use cases.

- [Webpack example](https://github.com/CMSgov/design-system/blob/master/examples/react-app)
- [CSS-only example](https://github.com/CMSgov/design-system/blob/master/examples/form)

<a href="https://github.com/CMSgov/design-system/tree/master/examples/" class="ds-c-button">Browse example projects</a>

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub](https://github.com/CMSgov/design-system/issues).
