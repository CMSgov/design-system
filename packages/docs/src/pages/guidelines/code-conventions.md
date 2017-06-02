---
title: Code conventions
---

The design system favors clarity over succinctness. This means the design system may be verbose, but it should deliver clarity and resilience in exchange. Keeping CSS legible and scalable means sacrificing a shorter syntax.

## Naming convention

#### CSS Namespace

To avoid conflicting with other libraries and existing code, the design system namespaces its CSS class names with `ds-`.

#### CSS Prefix

Prefixes are added to class names to make it more apparent what job the class is doing.

| Prefix | Description |
| ------ | ----------- |
| `l-`  | Indicates layout-related styles. These classes may be used in any number of unrelated contexts. Example: `.ds-l-container` |
| `c-` | Indicates a component. Example: `.ds-c-button`
| `u-` | Indicates a utility. Example: `.ds-u-color--base` |
| `is-`, `has-` | Indicates state. |

#### BEM Syntax

The design system uses the [BEM syntax](http://getbem.com/introduction/) for naming CSS classes.

The format of a design system class should fall within the following syntax: `[NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]`

In the context of the design system components, these parts mean:

- Block is the primary component block, such as `.ds-c-card`, `.ds-c-button`
- Element is a part of a block that has no standalone meaning and is semantically tied to its block, such as `.ds-c-card__title`
- Modifier is a variation of a style, such as `.ds-c-button--primary`

In the context of the design system's utility classes, these parts can sometimes take on slightly different meaning:

- Block is the CSS property name a utility class affects, such as `.ds-u-font-size`, `.ds-u-color`
- Modifier is the CSS value, multiple, or variation applied to the CSS property. Typically these are defined as Sass variables. For example `ds-u-color--primary`, `ds-u-margin--3`

## Architecture

The design system follows a variation of [ITCSS](http://thomasbyttebier.be/blog/less-css-mess) (Inverted Triangle architecture for CSS), with slight differences since our system's classes will be namespaced. The main idea still holds, which is to write CSS in [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) order.

<!-- You can regenerate the tree by running tree -d -I "node_modules" -->

```
├── dist                Transpiled CSS and fonts
└── src                 Sass and JSX
    ├── base            Base HTML styles
    ├── components      Sass and React components
    │   ├── Button
    │   └── etc...
    ├── fonts
    ├── generics        Far reaching selectors
    ├── layouts         Structural patterns; No cosmetics.
    ├── settings        Globally-available settings and config options
    ├── tools           Helper functions and public mixins
    ├── utilities       Functional CSS classes to apply individual traits
    └── vendor          Third-party libraries
```
