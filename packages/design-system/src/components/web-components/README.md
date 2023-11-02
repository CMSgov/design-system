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

## For Angular (v10+) projects

1. Run the following commands to start a basic Angular project:

```bash
# Check NodeJS and npm version
node -v
npm -v

# Install Angular CLI
npm install -g @angular/cli

# Create a new Angular project
npm run ng new name-of-angular-app

# Navigate into project directory
cd name-of-angular-app

# Serve the application
npm start
```

2. Install the [design system from npm](https://www.npmjs.com/package/@cmsgov/design-system)

3. Import the web component library into `main.ts`

   a. E.g., `import "@cmsgov/design-system/web-components";`

   b. For older versions of Angular, it's recommended you add this import to `pollyfills.ts`

4. Apply the web component scheme to app.module.ts so Angular can recognize when a custom element is being used in a template

   a. E.g., in `app.module.ts`:

```js
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
[MAYBE SOME OTHER IMPORTS...]

@NgModule({
declarations: [...],
imports: [...],
providers: [],
bootstrap: [RootComponent],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

5.  Add the design system styles from the `node_modules` directory to the `angular.json` file

    a. Be sure to include both the base styles and the theme styles

    b. E.g., in `angular.json`:

```json
{
    "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
    [...STUFF]
    "projects": {
    "angular-test": {
    [...MORE STUFF]
    "architect": {
    "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
    [...EVEN MORE STUFF]
    "styles": [
    "node_modules/@cmsgov/design-system/dist/css/index.css",
    "node_modules/@cmsgov/design-system/dist/css/core-theme.css",
```

## For Vue (v3+) projects

1. Run the following commands to start a basic Vue project:

```bash
# Check NodeJS and npm version
node -v
npm -v

# Install Vue CLI
npm install -g @vue/cli

# Create a new Vue project
vue create new name-of-vue-app

# Navigate into project directory
cd name-of-vue-app

# Serve the application
npm run serve
```

2. Install the [design system from npm](https://www.npmjs.com/package/@cmsgov/design-system)

3. Import the web component library into `main.js`. E.g., `import "@cmsgov/design-system/web-components";`

4. Import the design system styles to the `<style>` tag in your root component

   a. Be sure to include both the base styles **and** the theme styles

   b. E.g., in `RootApp.vue`:

```html
<template>
[STUFF]
</template>

<script>
    [SCRIPTY STUFF]
<script>

<style>
    @import "@cmsgov/design-system/dist/css/index.css";
    @import "@cmsgov/design-system/dist/css/core-theme.css";

    [LOCAL STYLES]
</style>
```

## For Svelte projects

1. Run the following commands to start a basic Svelte project:

```bash
# Check NodeJS and npm version
node -v
npm -v

# Create a new Svelte project
npx degit sveltejs/template name-of-svelte-app

# Navigate into project directory
cd name-of-svelte-app

# Install deps
npm install

# Serve the application
npm run dev
```

2. Install the [design system from npm](https://www.npmjs.com/package/@cmsgov/design-system)

   a. If you encounter issues with Rollup, install `@rollup/plugin-json` and add it to `rollup.config.js`

3. Import the web component library into `main.js`. E.g., `import "@cmsgov/design-system/web-components";`

4. Import the design system styles into `main.js`

   a. E.g., in `main.js`:

```js
import "@cmsgov/design-system/dist/css/index.css";
import "@cmsgov/design-system/dist/css/core-theme.css";

[THE REST OF YOUR MAIN STUFF HERE]

```
