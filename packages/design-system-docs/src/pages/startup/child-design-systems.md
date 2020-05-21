---
title: Child Design Systems
weight: 6
---

The CMS design system (CMSDS) provides a set of components and styles to meet many design and development needs. However, there are cases where product teams need to modify a design system beyond [theming]({{root}}/startup/theming/) and publish the new system for other teams to consume.

## Who should use a child design system?

A common use case for child design systems is when multiple teams are working under the same CMS site. These teams would need to share custom assets and code (i.e. brand colors, site header, custom icons, etc), and would benefit from a documentation site to reference as single source of truth. If you are working as a single team and don't have a need for a documentation site, a child design system is probably not for you.

## What is a child design systems?

A child design system is a design system that built off of the core CMSDS for a specific context. They contain custom assets (components, styles, etc..) and are published via NPM to be consumed by multiple teams. A child design system can contain new components, modifications to existing components, or modifications to styles. Child design systems import the core CMSDS as a dependency to receive updates, and use developer tools, scripts, and documentation from the core CMSDS to manage their own design system.

### Child design system guidelines

- A child design system should be actively maintained by other product teams. The core CMSDS team is not responsible for updating child design systems, however we are responsible for guidelines and assisting with training and adoption.
- Users of child design system should contribute back to the larger CMS design system community by filing issues/bugs, giving feedback, and general maintenance. Collaboration and participation are essential to the success of the CMS design system family.
- A child design system should defer to the core CMS design system for best practices or accessibility guidelines.

---

**Note**: If you plan to document and show React component examples, your theme directory should include a valid [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) to describe how your modules should be transformed.

[Read more about running the design system locally](https://github.com/CMSgov/design-system/blob/master/README.md#running-locally)
