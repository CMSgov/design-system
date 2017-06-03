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

Following the namespace and prefix is a name conforming to [BEM syntax](http://getbem.com/introduction/).

Put all together, a CSS class can be broken down to these key parts: `[NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]`

- **Block** is a standalone entity that is meaningful on its own. For example: `.ds-c-card`, `.ds-c-button`
- **Element** is a part of a block that has no standalone meaning and is semantically tied to its block, such as `.ds-c-card__title`
- **Modifier** is a flag on a block or element and is used to change appearance or behavior. For example: `.ds-c-button--primary`, `ds-u-color--primary`, `ds-u-margin--3`

[BEM’s strict naming rules can be found here](http://getbem.com/naming/).

## Credits

The CSS naming convention outlined here was heavily influenced by:

- [CSS Architecture for Design Systems](http://bradfrost.com/blog/post/css-architecture-for-design-systems/), by Brad Frost
- [Thoughtful CSS Architecture](https://seesparkbox.com/foundry/thoughtful_css_architecture), by Nathan Rambeck
- [More Transparent UI Code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/), by Harry Roberts