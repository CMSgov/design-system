# Contributing to the CMS Design System

We're excited you're considering contributing to our design system. If you have a question, noticed a bug, or have suggestions, then please [submit an issue](https://github.com/CMSgov/design-system/issues/new/choose) or create a pull request.

One of our goals is to ensure a welcoming environment for all contributors.
Please take a look at our [Code of Conduct](CODE_OF_CONDUCT.md) to learn more.

## Getting started

If you are interested in running this site locally, please take a look at [setting up your local development environment](/README.md#running-locally).

Use [our guides](https://github.com/CMSgov/design-system/tree/master/guides) to find additional information like:

* Guiding principles
* Coding guidelines
* How to write documentation

## Submitting a pull request

Here are a few guidelines to follow when submitting a pull request:

* [Fork the design system](https://guides.github.com/activities/forking/) into your GitHub account
* [Create a branch](https://help.github.com/en/articles/creating-and-deleting-branches-within-your-repository) from `master` that defines what you’re working on (for example, fix-autocomplete-bug).
* [Submit a pull request](https://help.github.com/en/articles/creating-a-pull-request) against the `master` branch

**Note:** more information on the [GitHub flow](https://guides.github.com/introduction/flow/)

## Proposing new patterns

When considering what to do with a proposed pattern, there are several questions the team should answer first. The decision tree below outlines those questions to be answered and the various outcomes:

![CMS Design System component decision workflow](https://github.com/CMSgov/design-system/blob/9fa6d831b059727e0cb12a3b0e0fc7755ce52e8e/.github/images/CMS-Design-System-component-decision-workflow.jpg?raw=true)

When a new pattern is created, it’s worth asking if it's a one-off use case or something that can be used on other sites. New patterns come at a cost in terms of additional code, maintenance, documentation, and increased cognitive load on users. Care should therefore be taken when adding patterns to the design system.

Our pattern proposal process is largely based on those by the [US Web Design System](https://github.com/18F/web-design-standards/wiki/Contribution-Guidelines%3A-Design).

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

- **Usability**:  Is the pattern responsive? Is the interaction flow clearly documented?
- **Accessibility**: Is the pattern 508 compliant and accessible?
- **Visual design**: Is the pattern consistent with the CMS Design system visual style?

 The pattern will be marked as *Draft* when it passes evaluation criteria.

### Step 3 - Draft (Core design system team)

After a pattern has passed review, a member of the team will create a prototype of the pattern (unless one was already submitted).

Acceptance criteria:

- Documentation and guidance is complete
- Pattern or component follows coding guidelines
- Pattern validates against accessibility criteria
- Feedback has been collected on the pattern based on usage in real-world products and revised if necessary


Finally, a team member will either move the pattern to *Ready*; ask for revisions; or, in some cases, reject the pattern.


### Step 4 - Ready

When a pattern is moved to *Ready*, all criteria from the Draft step have been completed. The pattern is now a stable part of the design system in production and the core team will conduct ongoing maintenance (bug fixes, minor enhancements, and so on).


## Amending patterns

Elements of the design system can and should be amended for a number of reasons: bug fixes, new features, visual design tweaks, performance and accessibility improvements, best practice updates, etc.

Amendment proposals should follow the same process as outlined above. During the Review step, in addition to the standard review criteria, the core team will also consider whether the amendment benefits the entire design system.

## Retiring patterns

As technology changes, certain UI patterns will become less relevant or may be replaced by better patterns. As we become aware of such changes, we’ll remove patterns from the library. To avoid pulling the rug out from under people relying on those patterns in their projects, deprecated patterns will remain within the codebase for at least a month after deprecation. The patterns will also be marked as deprecated in the documentation and in the developer's console when used in a project.


## Licenses and attribution

### A few parts of this project are not in the public domain

For complete attribution and licensing information for parts of the project that are not in the public domain, see `LICENSE.md`.

### The rest of this project is in the public domain

The rest of this project is in the worldwide public domain.

This project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

### Contributions will be released into the public domain

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

----

#### Credits

- [US Web Design Standards](https://github.com/18F/web-design-standards/wiki/Contribution-Guidelines%3A-Design)
- [Atomic Design](http://atomicdesign.bradfrost.com/chapter-5/)
- [Inayaili de León Persson](https://design.canonical.com/2016/07/getting-vanilla-ready-for-v1-the-roadmap/)
