# RFC: Web Components for the CMS family of Design Systems

**Date**: March 16, 2022
**Status**: `Review`

## Purpose

In order to support teams with various technology stacks (outside of React), the CMS design system team has investigated Web Components and how they could be used within the family of design systems. Specifically, can the current React components be exported as Web Components for use by a wider audience?

### Background

[MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) describes web components as

> a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

Building custom, reusable elements would allow CMS Design System components to be consumed by a larger array of tech stacks and be agnostic to Javascript framework. Meaning that React teams as well as Angular and Vue teams could consume these components while the Design System team only has to maintain one code base.

## Avenues Explored

With the hypothesis that the team wanted to wrap our current React components and export them as Web Components, the team explored several options.

### Browser Native Web Components

For this part of our discovery, we sought to wrap two of our React components within native Web Components to evaluate if it was possible, impacted our performance, or interfered with accessibility in any way. Failure of any one of these three requirements would result in a hard pass for this technology.

Alert and ChoiceList were identified as good test cases; Alert was chosen for its simplicity, while ChoiceList offered more complex considerations with event handling, lifecycle methods, and element nesting.

Today, all major browsers natively support Web Components, with Safari having spotty support for a handful of its APIs (these APIs are more enhancements than core functionality). And it might go without saying, but IE doesn't support Web Components in any fashion. However, there is a [polyfill](https://github.com/webcomponents/polyfills) available to address browser outages.

As with any new technology, there is a learning curve when first diving into writing Web Components. This is further compounded by our task of wrapping our pre-existing React components within a web component. While [React documentation says it is fully compatible with Web Components](https://reactjs.org/docs/web-components.html), they also note

> **Most people who use React don’t use Web Components**, but you may want to, especially if you are using third-party UI components that are written using Web Components.

While several projects were found using Web Components within React, it was honestly pretty tough finding examples of the inverse.

Before we get into the difficulties encountered, our React Alert was able to be wrapped inside a Web Component (turning it into a 1MB component!) and it seemed to work well with assistive technologies, but wrapping our React ChoiceList component proved way more difficult given how that component is built and how it expects data to be passed to it.

Because the Alert was indicating some pretty severe performance concerns, we ended this experiment before completing the ChoiceList work.

#### Issues Encountered

Early on in the project, basic scaffolding of a React/Web Component became a struggle, specifically in figuring out how to import our React component into its respective Web Component file and in applying the correct styling for said component.

**Rendering React inside a Web Component**

To correctly render a React component within a Web Component, both React and ReactDOM needed to be imported alongside the UI component - and that was for a simple, barebones conversion of the Alert. That doesn't account for any additional packages we'd need to handle other React-specific stuff, like synthetic events.

There were also Typescript headaches here where it seemed like there needed to be some kind of global definition file and redefine the typings of our Web Component.

**Applying styles to a Web Component**

Applying our design system CSS proved to be incredibly annoying. Having followed our [Design System's startup guide for using CSS](https://design.cms.gov/startup/sass-and-css/) and ensuring the ShadowDOM was disabled in our Web Components, the component was expected to just work.

It was discovered when working with native Web Components, there's a hydration step that needs to happen on the component that causes the CSS to sort of "detach" from the styles applied within, resulting in an ugly component. The only way to get around this was to import our CSS into each Web Component, and because our styles aren't split up by component that meant **all Design System CSS** needed to be imported into each component.

It should be noted, these styles didn't include our web fonts, so it's very likely that would be another thing that would need to be imported per component.

**tldr; these components were chonky.**

### Preact

[Preact](https://preactjs.com/) is Javascript framework that is a React alternative that uses the same API as React.

For this method, Preact was installed in the Design System repository as a one-to-one replacement for React per their [migration guide](https://preactjs.com/guide/v10/switching-to-preact). Issues were encountered right out of the gate with mis-matched Typescript typing support and after researching how to resolve these, other Preact quirks were discovered.

Because Preact is an entirely separate JS framework to React, it was determined that the migration and down-stream consequences would be too disruptive to consuming teams.

#### Issues Encountered

**Typescript typings**

The CMS Design System uses Typescript and some React-specific types. These React-specific types did not translated 1:1 to Preact and it was difficult to determine what equivalent Preact typings to use for a migration.

**Third-party libraries**
The CMS Design System uses several third-party libraries for functionality and increased accessibility support. Some of these libraries are React-based. If we switched to Preact, we would have to evaluate each library and ensure that it still works as expected or find a Preact or vanilla JS alternative.

**Consumption of Preact components**
If the Design System was to migrate to Preact, this could change the way React applications would consume these components. This is not something we fully explored during this discovery, but wanted to call it out as a future risk for this implementation path. The DS team wants to minimize disruptions to consuming apps.

### Web Component Frameworks (Lit & Stencil)

Both [Lit](https://lit.dev/) & [Stencil](https://stenciljs.com/) were explored as Web Component-specific frameworks. Both of these libraries provide tooling to develop Web Components from scratch.

It should be noted that either of these libraries would be a good choice if we wanted to build web components from the ground up, instead of trying to use existing component code. Stencil, especially, supports bindings that would allow web components to be compatible with popular JS frameworks like Vue, Angular and React. This would allow the team to maintain one code base of components (as web components) but support a wider range of frameworks.

#### Issues Encountered

**Library Purpose**
Neither of these libraries are setup to import React components and export them as Web Components. They are meant to be a build system for Web Components without other JS frameworks (like React or Angular).

## Conclusion

**Wrapping the Design System's current React components and exporting them as Web Components is not a viable path for this system.** There is not tooling that exists to support this and inflated bundle sizes create the most concern for consumers.

It is possible to create new Web Components through one of the methods explored above. However, this route requires a much larger effort and would lead to the eventual deprecation of our current React components.

## Questions and Requested Feedback

- Is it worth the investment to develop Web Components using Lit or Stencil?
- Who would these Web Components benefit?
- Would they actually get used?
