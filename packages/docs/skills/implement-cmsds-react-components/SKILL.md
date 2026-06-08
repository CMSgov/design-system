---
name: implement-cmsds-react-components
description: Implements, modifies, and troubleshoots CMS Design System (CMSDS) React components. Use when users ask for "CMSDS component guidance", "implement a CMSDS component", or "fix CMSDS component usage".
metadata:
  author: CMS Design System
  version: 1.0.0
---

# Use CMS Design System Components

Purpose

Use this skill to navigate CMS Design System (CMSDS) documentation and retrieve up-to-date usage, accessibility, and implementation guidance for a given CMSDS React component.

## Determine the installed design system package

First, inspect the project's root package.json to determine which CMS Design System package is installed.

If `@cmsgov/design-system` or `@cmsgov/ds-cms-gov` is installed, read:

- `references/design-system-guide.md`

If `@cmsgov/ds-medicare-gov` is installed, read:

- `references/ds-medicare-gov-guide.md`

If `@cmsgov/ds-healthcare-gov` is installed, read:

- `references/ds-healthcare-gov-guide.md`

After selecting the appropriate guide, follow it to:

- Locate component usage and accessibility guidance
- Verify expected props using TypeScript definitions
