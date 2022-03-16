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

### Vanilla Components

#### Issues Encountered

- Each component bundles React as part of its exported JS. This creates an inflated bundle size for even the smallest components.
- Properties / Attribute data structures. React props can accept different data structures that Web Component attributes to not support. The component APIs would need to change in order to support both.

### Preact

[Preact](https://preactjs.com/) is Javascript framework that is a React alternative that uses the same API as React.

For this method, Preact was installed in the Design System repository as a one-to-one replacement for React per their [migration guide](https://preactjs.com/guide/v10/switching-to-preact).

#### Issues Encountered

- Typescript typings. The CMS Design System uses Typescript and React-specific types. It was difficult to determine what equivalent Preact typings to use for a migration.
- Third-party libraries. It is unclear how Preact would work with all third-party React libraries that the Design System currently uses. This is troublesome since our components use other React libraries for increased accessibility support.
- Consumption of Preact components. If the Design System was to migrate to Preact, this could change the way React applications would consume these components. The DS team wants to minimize disruptions to consuming apps.

### Web Component Frameworks (Lit & Stencil)

Both [Lit](https://lit.dev/) & [Stencil](https://stenciljs.com/) were explored as Web Component-specific frameworks. Both of these libraries provide tooling to develop Web Components from scratch.

#### Issues Encountered

- Neither of these libraries are setup to import React components and export them as Web Components. They are meant to build Web Components without a JS framework.

## Conclusion

**Wrapping the Design System's current React components and exporting them as Web Components is not a viable path for this system.** These is not tooling that exists to support this and, inflated bundle sizes create the most concern for consumers.

It is possible to create new Web Components through one of the methods explored above. However, this route requires a much larger effort and would lead to the eventual deprecation of our current React components.

## Questions and Requested Feedback

- Is it worth the investment to develop Web Components using Lit or Stencil?
- Who would these Web Components benefit?
- Would they actually get used?
