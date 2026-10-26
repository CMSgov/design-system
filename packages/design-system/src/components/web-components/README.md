# Getting started guide for developers

## So you wanna use web components...

Web components, or [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), are custom-built HTML elements defined by a web developer. The CMS design system provides web components that can be modified by a user via predefined props or enhanced via CSS or JavaScript.

You can think of web components as a superset of HTML elements. Once your project's been properly set up to use them (see steps below for that), you can use a web component just as you would any other HTML element. For instance, if you want to use our web component button, you'd simply use `<ds-button>` anywhere you'd typically use `<button>` and you should inherit all the built-in properties, functions and styles that come with it.

As already mentioned, using these web components requires an initial setup and the complexity of said setup can vary depending on the tech stack of a given project. We’ve included steps for getting started for the tech stacks we most commonly see: native web projects (a great option for Jekyll or Drupal teams), Angular, Vue, and Svelte.

## For native web projects (HTML, CSS, and JavaScript)

To use web components in a native web project, we recommend you use our CDN. Not only is this a fast and relatively hassle-free way to get started, but our CDN links are versioned, which makes maintaining your project easier in the long-run. You can find a list of [all available CDN links for the design system here](https://design.cms.gov/cdn/).

1. Add a script tag to the bottom of your `<body>` element, following any other HTML to ensure proper hydration. E.g., `<script src="https://design.cms.gov/cdn/design-system/X.X.X/web-components/bundle/web-components.js"></script>` (be sure to update `X.X.X` to the version of the design system you plan on working with)

2. Add the design system styles to the `<head>` of your project. E.g., in `index.html`:

```html
<head>
  [YOUR PROJECT'S STUFF HERE...]
  <link rel="stylesheet" href="https://design.cms.gov/cdn/design-system/X.X.X/css/index.css" />
  <link rel="stylesheet" href="https://design.cms.gov/cdn/design-system/X.X.X/css/core-theme.css" />
  [... MAYBE SOME MORE OF YOUR PROJECT'S STUFF (LIKE LOCAL STYLES)]
</head>
```

Remember to replace any `X.X.X` strings with the version of the design system you plan on working with.

These styles should be added above your project's styles to ensure any local styles you write aren't overwritten by the design system.
