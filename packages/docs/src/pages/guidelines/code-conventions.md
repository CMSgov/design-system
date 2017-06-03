---
title: Code conventions
---

<p class="ds-text--lead">
  The design system favors clarity over succinctness. This means the design system may be verbose, but it should deliver clarity and resilience in exchange. Keeping CSS legible and scalable means sacrificing a shorter syntax.
</p>

## CSS naming convention

<img src="{{root}}/public/images/naming-convention.svg" class="ds-u-border--1" />

### Namespace

To avoid conflicting with other libraries and existing code, the design system namespaces its CSS class names with `ds-`.

### Prefix

Prefixes are added to class names to make it more apparent what job the class is doing.

| Prefix | Description |
| ------ | ----------- |
| `l-`  | Indicates layout-related styles. These classes may be used in any number of unrelated contexts. Example: `.ds-l-container` |
| `c-` | Indicates a component. Example: `.ds-c-button`
| `u-` | Indicates a utility. Example: `.ds-u-color--base` |
| `is-`, `has-` | Indicates state. |

### BEM syntax

The design system uses the [BEM syntax](http://getbem.com/introduction/) for naming CSS classes.

The format of a class conforms to the following syntax: `[NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]`

In the context of a component, these parts mean:

- Block is the primary component block, such as `.ds-c-card`, `.ds-c-button`
- Element is a part of a block that has no standalone meaning and is semantically tied to its block, such as `.ds-c-card__title`
- Modifier is a variation of a style, such as `.ds-c-button--primary`

In the context of a utility class, these parts can sometimes take on slightly different meaning:

- Block is the CSS property name a utility class affects, such as `.ds-u-font-size`, `.ds-u-color`
- Modifier is the CSS value, multiple, or variation applied to the CSS property. For example `ds-u-color--primary`, `ds-u-margin--3`