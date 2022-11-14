# Contributing to the CMS Design System

We're excited you're considering contributing to our design system. If you have a question, noticed a bug, or have suggestions, then please [submit an issue](https://github.com/CMSgov/design-system/issues/new/choose) or create a pull request.

One of our goals is to ensure a welcoming environment for all contributors.
Please take a look at our [Code of Conduct](CODE_OF_CONDUCT.md) to learn more.

## Getting started

If you are interested in running this site locally, please take a look at [setting up your local development environment](/README.md#running-locally).

## Submitting a pull request

- [Fork the design system](https://guides.github.com/activities/forking/) into your GitHub account
- [Create a branch](https://help.github.com/en/articles/creating-and-deleting-branches-within-your-repository) from `main` that defines what you’re working on (for example, fix-autocomplete-bug).
- [Submit a pull request](https://help.github.com/en/articles/creating-a-pull-request) against the `main` branch

**Note:** more information on the [GitHub flow](https://guides.github.com/introduction/flow/)

## Guiding development principles

As we're building the design system it helps to have some guiding principles in place to refer back to when we reach forks in the road. Forks in the road can be the different ways something could be named, whether a certain component belongs in the design system, etc. These guiding principles aren't set in stone and should evolve as opinions are evolved.

_If you'd like to provide feedback on these principles, please [open a GitHub issue for discussion](https://github.com/CMSgov/design-system/issues/new)._

### Compatible with existing codebases

A developer should be able to import the design system into an existing codebase without causing unintended visual changes. Implementing the design system should be a deliberate process and developers should be able to incrementally add the design system to an existing site.

For example, the design system avoids styling base HTML elements (`body`, `h1`) because an existing codebase likely already has CSS rulesets for those elements and we can't predict the intentions of those rulesets. Our solution then is to only use namespaced class selectors (`.ds-base`, `.ds-h1`, `.ds-c-button`) which allows a developer to choose where the design system's styles are applied.

### Favor clarity over succinctness

The design system should favor clarity over succinctness. This means the design system may be verbose, but it should deliver clarity and resilience in exchange. Keeping CSS legible and scalable, and reducing cognitive load, means sacrificing a shorter syntax.

Some other design systems user abstract and condensed naming conventions (ie. "`mr1`"). However, this naming convention can be intimidating, difficult to understand at a glance, has a steep learning curve, and results in a lot of back and forth between project code and the system's documentation.

Here are a few examples of how the design system favors clarity over succinctness with its CSS class names:

| Design system (Good)      | Abstract names (Bad) | Description                                                     |
| ------------------------- | -------------------- | --------------------------------------------------------------- |
| 👍 `ds-u-margin-right--1` | 🙅 `mr1`             | A utility class, applies a right margin that is 1x the baseline |
| 👍 `ds-c-button`          | 🙅 `btn`             | A button component                                              |

### Favor generalized names

Avoid naming that indicates a specific use-case or styling, e.g. `snippet` rather than `search-snippet`.

The names and phrasing of the design system's parts should also still make sense when a different theme is applied, e.g. `primary` rather than `blue`.

### Variations exist only when they can't be achieved with a utility class

The design system includes utility classes for modifying the most common visual traits, like spacing, size, and color. You may want to offer variations of a component that involves changing one of these traits. When you do, you should first see if users of the design can accomplish the variation by applying one of the utility classes to your component.

This accomplishes a few things: Most importantly it reduces the total amount of CSS, and secondly it teaches people how to use the utility classes.

### Support improvisation, but steer direction.

The design system should be opinionated about the visual design, accessibility, and voice, but it should also provide the tools and necessary parts for developers and designers to create components and more complex patterns that are unique to their project.

What does this mean in practice? One example is: Utility classes allow new ideas and patterns to form, while the components and base styling establish a voice and visual direction.

## Proposing new patterns

When considering what to do with a proposed pattern, there are several questions to answer first. The decision tree below outlines those questions to be answered and the various outcomes:

![CMS Design System component decision workflow](https://raw.githubusercontent.com/CMSgov/design-system/main/.github/images/CMS-Design-System-component-decision-workflow.jpg)
When a new pattern is created, it’s worth asking if it's a one-off use case or something that can be used on other sites. New patterns come at a cost in terms of additional code, maintenance, documentation, and increased cognitive load on users. Care should therefore be taken when adding patterns to the design system.

Our pattern proposal process is largely based on those by the [US Web Design System](https://github.com/uswds/uswds/wiki/Contribution-Guidelines%3A-Design).

Our design contribution and review process has four stages. As a contributor to the CMS Design System, you’ll only need to participate in the first stage — our team will handle the rest.

### Step 1 - Proposal (This is your part)

Open a new [GitHub issue](https://github.com/CMSgov/design-system/issues/new?assignees=&labels=proposal%2Ffeature+request&template=propose-a-new-item-for-the-cms-design-system.md&title=) for the pattern being proposed. The issue should cover the following points:

- **What**
  - Give a brief description of the style, component or pattern you are proposing.
- **Why**
  - Explain why you think this should be added to the CMS Design System.
    - Identify the need the proposal solves.
    - Have you checked that it doesn't already exist in the Design System?
    - Can this serve more than one use case and be reusable in multiple scenarios? Please explain.
    - Please include links to any examples, research or code to support your proposal, if available.

### Step 2 - Review (Core design system team)

After an idea is proposed, it undergoes an evaluation by a team member. This review is to determine whether the contribution needs small fixes, visual improvements, or whether to reject it.

During this stage, the team will review supporting research — and link this research to the proposal.

Revisions may be requested before moving the proposal to Draft. If the proposal is good to go as is, it's moved to Draft. If the proposal doesn’t pass the evaluation, the reviewer will reject it and close the issue.

The criteria used in evaluating is:

- **Usability**: Is the pattern responsive? Is the interaction flow clearly documented?
- **Accessibility**: Is the pattern 508 compliant and accessible?
- **Visual design**: Is the pattern consistent with the CMS Design system visual style?

The pattern will be marked as _Draft_ when it passes evaluation criteria.

### Step 3 - Draft (Core design system team)

After a pattern has passed review, a member of the team will create a prototype of the pattern (unless one was already submitted).

Acceptance criteria:

- Documentation and guidance is complete
- Pattern or component follows coding guidelines
- Pattern validates against accessibility criteria
- Feedback has been collected on the pattern based on usage in real-world products and revised if necessary

Finally, a team member will either move the pattern to _Ready_; ask for revisions; or, in some cases, reject the pattern.

### Step 4 - Ready

When a pattern is moved to _Ready_, all criteria from the Draft step have been completed. The pattern is now a stable part of the design system in production and the core team will conduct ongoing maintenance (bug fixes, minor enhancements, and so on).

## Amending patterns

Elements of the design system can and should be amended for a number of reasons: bug fixes, new features, visual design tweaks, performance and accessibility improvements, best practice updates, etc.

Amendment proposals should follow the same process as outlined above. During the Review step, in addition to the standard review criteria, the core team will also consider whether the amendment benefits the entire design system.

## Retiring patterns

As technology changes, certain UI patterns will become less relevant or may be replaced by better patterns. As we become aware of such changes, we’ll remove patterns from the library. To avoid pulling the rug out from under people relying on those patterns in their projects, deprecated patterns will remain within the codebase for at least a month after deprecation. The patterns will also be marked as deprecated in the documentation and in the developer's console when used in a project.

---

## Licenses and attribution

A few parts of this project are not in the public domain. Attribution and licensing information for those parts are described in detail in [LICENSE.md](LICENSE.md).

The rest of this project is in the worldwide public domain, released under the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

## Contributions

All contributions to this project will be released under the CC0 dedication alongside the public domain portions of this project. For more information, see [CONTRIBUTING.md](CONTRIBUTING.md).

**Credits**

- [US Web Design Standards](https://github.com/uswds/uswds/wiki/Contribution-Guidelines%3A-Design)
- [Atomic Design](http://atomicdesign.bradfrost.com/chapter-5/)
- [Inayaili de León Persson](https://design.canonical.com/2016/07/getting-vanilla-ready-for-v1-the-roadmap/)
