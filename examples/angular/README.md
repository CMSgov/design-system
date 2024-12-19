## Example: An Angular project with TypeScript

This shows the usage of CMS design system components in a TypeScript-enabled [Angular](https://angular.dev/) project. This example contains a reduced set of our available web components.

In this project, the design system package is pulled from the local (symlinked) version of the Design System in the `angular.json` file under the "scripts" property. Please note that your team will likely implement a different import strategy that points to the actual location of your installed Design System.

From within this example you should be able to see how to:

1. Import the needed Javascript and styling to use in your application
2. Listen to our custom events, inlcuding analytics events
3. Pass inputs to our components as attributes so they can respond to changes in higher level state
4. Render web components nested within other web components

## Getting started

1. Install packages at the root of this repository (see [root README](../../README.md))
1. Start the application: `yarn start`

_Note: Whenever changes have been made to the design system packages, you must **clear the local cache** for this application to receive those changes by deleting the hidden `examples/angular/.angular` directory._

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command      | Action                                      |
| :----------- | :------------------------------------------ |
| `yarn start` | Starts local dev server at `localhost:4200` |
| `yarn build` | Build your production site to `./dist/`     |
