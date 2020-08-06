---
title: Child Design Systems
weight: 6
---

The CMS design system (CMSDS) provides a set of components and styles to meet many design and development needs. However, there are cases where product teams need to modify a design system beyond [theming]({{root}}/startup/theming/) or need to share their customizations with other teams. Child design systems are the intended solutions for these cases.

## What is a child design system?

Child design systems are for sharing common, site-specific, design and code resources between teams working on the same CMS sites (i.e. Healthcare.gov, Medicare.gov). They contain the core CMS Design System in addition to site-specific customizations (i.e. brand colors, site header, custom icons, etc).

Child design systems include:

- An NPM package containing design system code and assets
- A documentation site for product teams to reference
- Shared design assets (i.e. Sketch Library or Sketch file)
- Designers and engineers that actively maintain and update the system

**Note:** Child design systems were previously called "site packages". This name change reflects our vision for these systems to be more independent and self-sustaining within the CMS Design System family. Many of the internal changes in the v2 release aim to facilitate this vision by simplifying the experience of maintaining and contributing to child design systems.

### Existing child design systems

If you are working on a project under either of these sites, we highly recommend using these child design systems. If you are working under a different CMS site and are interested in creating a new child design system, please reach out to the core CMS design system team.

- [Healthcare.gov Child Design System](https://github.cms.gov/CMS-WDS/ds-healthcare-gov)
- [Medicare.gov Child Design System](https://github.cms.gov/MedicareGov/ds-site-package)

## Maintaining a child design system

Child design systems use the CMSDS (`@cmsgov/design-system`) as a dependency to receive updates from the core. Child design system maintainers also use developer tooling (`@cmsgov/design-system-scripts`) and documentation (`@cmsgov/design-system-doc`) from the core CMSDS team to maintain consistency between the different systems.

See the [child design system example](https://github.com/CMSgov/design-system/tree/master/examples/child-design-system) for details on how to run the design system locally, customize it's styles and functionality, and update it's documentation site.

## Child design system guidelines

- A child design system should be actively maintained by product teams using the child design system. The core CMSDS team is not responsible for updating child design systems, however we are responsible for guidelines and assisting with training and adoption.
- Users of child design systems should contribute back to the larger CMS design system community by filing issues/bugs in Github or Jira, giving feedback, and general maintenance. Collaboration and participation are essential to the success of the CMS design system family.
- A child design system should defer to the core CMS design system for best practices or accessibility guidelines.
