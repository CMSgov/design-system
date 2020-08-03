---
title: Child Design Systems
weight: 6
---

The CMS design system (CMSDS) provides a set of components and styles to meet many design and development needs. However, there are cases where product teams need to modify a design system beyond [theming]({{root}}/startup/theming/) and publish a child design system for other product teams to consume.

## What is a child design system?

A child design system is a design system built off of the core CMSDS for a specific context. It contains custom assets (components, styles, etc..) and is published via NPM to be consumed by multiple product teams. A child design system can contain new components, modifications to existing core components, or modifications to styles. Child design systems import the core CMSDS as a dependency which allows for receiving updates, using developer tools, scripts, and documentation from the core CMSDS to manage their own design system.

**Note** Child design systems were previously called "site packages". This change in nomenclature reflects our vision for these systems to be more independent and self-sustaining within the CMS Design System family. Many of the internal changes in the v2 release aim to facilitate this vision by simplifying the experience of maintaining and contributing to child design systems.

## Who should use a child design system?

A common use case for child design systems is when multiple product teams are working under the same CMS site. These separate product teams would share custom assets and code (i.e. brand colors, site header, custom icons, etc), and would benefit from a documentation site to reference as a single source of truth. If you are working as a single team and don't have a need for a documentation site, a child design system is probably not for you.

### Child design system guidelines

- A child design system should be actively maintained by product teams using the child design system. The core CMSDS team is not responsible for updating child design systems, however we are responsible for guidelines and assisting with training and adoption.
- Users of a child design system should contribute back to the larger CMS design system community by filing issues/bugs in Github or Jira, giving feedback, and general maintenance. Collaboration and participation are essential to the success of the CMS design system family.
- A child design system should defer to the core CMS design system for best practices or accessibility guidelines.

### Existing child design systems

- [Healthcare.gov Child Design System](https://github.cms.gov/CMS-WDS/ds-healthcare-gov)
- [Medicare.gov Child Design System](https://github.cms.gov/MedicareGov/ds-site-package)

---

**Note**: If you plan to document and show React component examples, your theme directory should include a valid [`.babelrc`](https://babeljs.io/docs/usage/babelrc/) to describe how your modules should be transformed.

[Read more about running the design system locally](https://github.com/CMSgov/design-system/blob/master/README.md#running-locally)
