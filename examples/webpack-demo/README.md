# Bringing the design system into a static HTML site (with Webpack!)

There comes a time that you might want to use the design system on a website without having to worry about running anything more complicated than plain HTML/CSS, with maybe a tiny smidgen of Javascript. You don't want to worry about building in React, Vue.js, Pug, or anything else -- you just want to get going. Here's how.

#### On using Webpack

This demo uses Webpack in order to leverage SCSS, and thus make the design system more easily extensible (yes, you can always layer vanilla CSS on top of the design system' CSS, but then you lose all the goodness that comes with [Sass.](https://sass-lang.com/)) You don't have to do this. If you want to learn how to bring the design system into your static project without standing up Webpack, [take a look at this](https://design.cms.gov/getting-started/) (scroll down to the "styles" section).

Because we're using Webpack, which also carries the advantage of bundling our files and managing the asset pipeline for us, there is a bit of development environment to set up (see below, "set up your dev environment"). Assuming that you have administrator access to your computer (and that you're using a Mac), this shouldn't take more than ten or fifteen minutes.

There is a very basic Webpack config included in this demo. It reads and copies assets into a `dist` folder, which you can then deploy at will. There are many, many ways to configure Webpack, so feel free to use this or modify it to suit your needs. The config included here is based on this tutorial: https://www.sitepoint.com/bundle-static-site-webpack/

### Step by step

#### Set up your dev environment

> **If all goes smoothly, this shouldn't take more than 10 minutes**

This project uses `yarn` to manage Node packages. If you're already set up', skip ahead. Otherwise, here's a quick primer on setting up a dev environment from scratch (on a Mac, at any rate):

1. Install `homebrew`: https://brew.sh/ This will also install Node for you, if it doesn't already exist, and sets you up to then install Yarn
2. Install `yarn`: https://yarnpkg.com/en/docs/getting-started

#### Set up the project locally

1. Download the repo `https://github.com/CMSgov/design-system` and navigate to `examples/webpack-demo`. This is the core of this project.
2. Since you have `yarn` installed, you should be able to run `yarn install` to get all the packages and dependencies -- including Webpack.

> If you run into trouble with `yarn` commands, try running `yarn install --ignore-engines` instead.

3. Run `yarn dev` to compile the files into the `dist` folder.

4. You should now be able to navigate to `examples/webpack-demo/dist/index.html`, which you can open in any browser. Changes you make to the files in `examples/webpack-demo/src` will be picked up by Webpack and recompiled, and if you refresh the browser those changes should be visible.

### Go forth and edit!

You can add `html` files inside the `pages` directory to build bigger sites, add more CSS or SCSS files, images, fonts, what have you. This is the very basic scaffolding one might need to build bigger. If you get stuck or need help, feel free to file a Github issue: https://github.com/CMSgov/design-system/issues.

_A quick note:_ This demo is having some trouble with loading fonts. If you solve the problem, please let us know!
