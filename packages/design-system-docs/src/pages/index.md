---
title: Introduction
weight: -100
---

The design system is a set of open source design and front-end development resources for creating Section 508 compliant, responsive, and consistent websites. It builds on the U.S. Web Design System and extends it to support additional CSS and React components, [utility classes]({{root}}/utilities/overview), and a [grid framework]({{root}}/utilities/grid/) to allow teams to quickly prototype and build accessible, responsive, production-ready websites.

It is currently being applied to [HealthCare.gov](https://www.healthcare.gov/) and [Medicare.gov](https://www.medicare.gov/). It is open-source and freely available to use by anyone.

## Getting started

### Developers

Developers and engineers are encouraged to use React which allows for more complex, interactive components, and many of our React components have built-in accessibility optimizations.

- **Recommended option:** [Install the NPM package]({{root}}/startup/installation/) `@cmsgov/design-system` if your project uses npm for package management.

- If you're unfamiliar with npm and package management, [download the code as a zip file](https://github.com/CMSgov/design-system/releases/latest).

### Designers

- **Recomended opion:** [Install the Sketch Library](https://www.sketch.com/s/bffbfeb1-59a1-48dd-842f-a1e0566e457f)
- [Download the Sketch UI kit](https://www.sketch.com/s/bffbfeb1-59a1-48dd-842f-a1e0566e457f).

## Goals

The primary goals for the design system are to:

- Help create consistent, enjoyable, reliable, and Section 508 compliant websites.
- Promote best practices for usability, accessibility, and responsive web design.
- Empower teams and speed up design and development velocity.
- Serve as a living source of truth for UI standards.

In order to meet these goals we are:

- Using the [U.S. Web Design System (USWDS)](https://designsystem.digital.gov/) components and visual design as a foundation.
- Reducing the overall footprint of websites by writing [scalable CSS]({{root}}/guidelines/code-conventions).
- Supporting rapid development with [utility classes]({{root}}/utilities/overview) and easy-to-use components with best practices baked in.
- Reducing the number of decisions needed when iterating on UI by providing a solid foundation of [typography]({{root}}/styles/typography), [layout]({{root}}/utilities/grid/), and [color]({{root}}/styles/color).
- Distributing resources as [NPM packages]({{root}}/startup/installation/) which can be easily installed, updated, and imported.
