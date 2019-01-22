---
title: Using React Components
weight: 3
---

The examples below assume you've installed the design system using NPM and have already setup your build system.

<h4 class="ds-h4 ds-u-font-size--base">Default imports</h4>

Individual components can be imported from their individual export file.

```jsx
import Button from '@cmsgov/design-system-core/dist/components/Button/Button';
```

<h4 class="ds-h4 ds-u-font-size--base">Named imports</h4>

Components can also be imported using the shorter syntax below.

<div class="ds-c-alert ds-c-alert--warn ds-u-margin-bottom--2 ds-u-font-size--small">
  <div class="ds-c-alert__body">
    <h3 class="ds-c-alert__heading ds-u-font-size--base">Performance note</h3>
    <p class="ds-c-alert__text">
      This approach may result in a much larger file than you intend. Depending on what module bundler you use, all of the design system's React components may be included in the bundled file even if you didn't specifically import them. This can be avoided by enabling features like [tree shaking in Webpack](https://webpack.js.org/guides/tree-shaking/).
    </p>
  </div>
</div>

```jsx
import { Button } from '@cmsgov/design-system-core';
```

[View an example](https://github.com/CMSgov/design-system/blob/master/examples/react-app/src/scripts/index.js)

<h2 id="examples" class="ds-h2 ds-u-color--primary-darker">Examples</h2>

Additional examples of the design system in use can be viewed on GitHub. These projects demonstrate the various ways you can incorporate the design system into your development process and various use cases.

<a href="https://github.com/CMSgov/design-system/tree/master/examples/" class="ds-c-button">Browse example projects</a>

<h2 id="need-help" class="ds-h2 ds-u-color--primary-darker">Need help or ran into an issue?</h2>

If you're having trouble installing or setting up the design system, or if you think you've found a bug, feel free to [open an issue on GitHub](https://github.com/CMSgov/design-system/issues).
