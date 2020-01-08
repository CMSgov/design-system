# Guiding development principles

As we're building the design system it helps to have some guiding principles in place to refer back to when we reach forks in the road. Forks in the road can be the different ways something could be named, whether a certain component belongs in the design system, etc. These guiding principles aren't set in stone and should evolve as opinions are evolved.

_If you'd like to provide feedback on these principles, please [open a GitHub issue for discussion](https://github.com/CMSgov/design-system/issues/new)._

## Compatible with existing codebases

A developer should be able to import the design system into an existing codebase without causing unintended visual changes. Implementing the design system should be a deliberate process and developers should be able to incrementally add the design system to an existing site.

For example, the design system avoids styling base HTML elements (`body`, `h1`) because an existing codebase likely already has CSS rulesets for those elements and we can't predict the intentions of those rulesets. Our solution then is to only use namespaced class selectors (`.ds-base`, `.ds-h1`, `.ds-c-button`) which allows a developer to choose where the design system's styles are applied.

## Favor clarity over succinctness

The design system should favor clarity over succinctness. This means the design system may be verbose, but it should deliver clarity and resilience in exchange. Keeping CSS legible and scalable, and reducing cognitive load, means sacrificing a shorter syntax.

Some other design systems user abstract and condensed naming conventions (ie. "`mr1`"). However, this naming convention can be intimidating, difficult to understand at a glance, has a steep learning curve, and results in a lot of back and forth between project code and the system's documentation.

Here are a few examples of how the design system favors clarity over succinctness with its CSS class names:

| Design system (Good)      | Abstract names (Bad) | Description                                                     |
| ------------------------- | -------------------- | --------------------------------------------------------------- |
| 👍 `ds-u-margin-right--1` | 🙅 `mr1`             | A utility class, applies a right margin that is 1x the baseline |
| 👍 `ds-c-button`          | 🙅 `btn`             | A button component                                              |

## Favor generalized names

Avoid naming that indicates a specific use-case or styling, e.g. `snippet` rather than `search-snippet`.

The names and phrasing of the design system's parts should also still make sense when a different theme is applied, e.g. `primary` rather than `blue`.

## Variations exist only when they can't be achieved with a utility class

The design system includes utility classes for modifying the most common visual traits, like spacing, size, and color. You may want to offer variations of a component that involves changing one of these traits. When you do, you should first see if you can accomplish the variation by using one of the utility classes. If you can, then don't create a new CSS ruleset to accomplish something another ruleset already does.

This accomplishes a few things: Most importantly it reduces the total amount of CSS, and secondly it teaches people how to use the utility classes.

## Support improvisation, but steer direction.

The design system should be opinionated about the visual design, accessibility, and voice, but it should also provide the tools and necessary parts for developers and designers to create components and more complex patterns that are unique to their project.

What does this mean in practice? One example is: Utility classes allow new ideas and patterns to form, while the components and base styling establish a voice and visual direction.
