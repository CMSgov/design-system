# RFC: Adding Storybook to improve development experience and to integrate with DSM

**Date**: October 5, 2021
**Status**: `Approved`

## Problem

Our team currently uses our documentation site generator for developing design system components. It is our only tool for visualizing our components and interacting with them in the browser. However, this reliance on the docs-site generator for development has two major problems:

1. **It is too slow and unreliable for development.** The docs-site generator is a custom-built tool that is slow and unwieldy. As an engineer makes live changes to code, it can take thirty seconds or more to see those changes reflected in the browser. To make matters worse, the tool will occasionally become out of sync with live changes and require restarting, which takes a minute on average. This is an unacceptable modern developer experience. The docs-site generator is fine for statically building the documentation site but is inappropriate as a tool for live development.
2. **Using component examples for development wastes effort and time.** The component examples on our docs site can never capture all the scenarios that will need to be tested during development, and they must stay tailored to our audience. Right now an engineer must modify the component examples throughout the development process and must revert those changes before merging. This becomes duplicated and wasted effort over time.

Decoupling the development process from the docs-site generator tool would increase development speed and efficiency.

Beyond problems with the docs-site generator, there are several other unrelated problems that our proposed solution can fix. They are described in their corresponding sections of the proposal.

## Proposal

This problem has already been solved in the industry by [_Storybook_](https://storybook.js.org/), a well maintained and popular open-source tool for developing libraries of components. Storybook is used at Airbnb, GitHub, IBM, Lyft, and the list goes on.

> Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.

We would primarily use it as an internal tool at first, but in the future we could integrate parts of it [into the Invision DSM](https://support.invisionapp.com/hc/en-us/articles/360052115111) and/or into our documentation site. Beyond solving the problems explained in the above section, Storybook can also streamline other parts of our development and testing process, especially with the use of some specific Storybook add-ons. These opportunities will be explained in their corresponding sections.

Introducing Storybook into our project and workflow can happen incrementally and in a piecemeal fashion. With the exception of the first, the following tasks can happen in any order and may be undertaken in parallel:

1. [Set up Storybook for development use](#1-set-up-storybook-for-development-use)
2. [Add Storybook _stories_ for existing components](#2-add-storybook-stories-for-existing-components)
3. [Automatically build Storybook previews for pull requests](#3-automatically-build-storybook-previews-for-pull-requests)
4. [Install accessibility-auditing add-on](#4-install-accessibility-auditing-add-on)
5. [Use Storybook _stories_ in unit tests](#5-use-storybook-stories-in-unit-tests)
6. [Set up automated visual regression testing](#6-set-up-automated-visual-regression-testing)
7. [Automatically generate HTML examples from React-based _stories_](#7-automatically-generate-html-examples-from-react-based-stories)
8. [Replace current documentation-site examples with Storybook _stories_](#8-replace-current-documentation-site-examples-with-storybook-stories)
9. [Use Storybook _stories_ in Invision DSM](#9-use-storybook-stories-in-invision-dsm)

### What are Storybook "stories"?

> "A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support." - [storybook.js.org](https://storybook.js.org/docs/react/get-started/whats-a-story)

The following sections reference using _stories_ in various ways. The nice thing about creating _stories_ for our components is that they become nice little units that feed into other tools and processes. For instance, we can use a _story_ in a unit test or a visual regression test. Classically we would have to set up initialization code for a component in many separate tools, but the _story_ is consumable by many tools in the Storybook ecosystem.

### 1. Set up Storybook for development use

This first task is to set up Storybook for local development. We would add it to our repository and configure it to work with our existing components and styles, but we would not host it publicly anywhere. It would not be integrated into our documentation site or the DSM, but we could start writing _stories_ to use in local development of our components as needed.

### 2. Add Storybook _stories_ for existing components

Once we have basic support for Storybook from the previous step, we can incrementally add stories for all our components. This can be done as a series of tickets to add stories in batches. For the purpose of using _stories_ in other ways outlined in this RFC, we should make an effort to add at least one basic story for each component.

### 3. Automatically build Storybook previews for pull requests

Currently we have [a Cloudbees Jenkins job that automatically builds our documentation site](https://ci.backends.cms.gov/wds/job/design-system/job/build%20demo/) for each branch that has a pull request. This documentation-site preview can be used as part of the review process, especially by non-engineer teammates and stakeholders who want to review the work without having to set up a local development environment. In the same manner, we can add a job that will build a Storybook preview for pull requests. The Storybook preview will be far more useful for reviewing and manually testing components because they are not limited to the scenarios defined in the documentation-site examples. The component props can even be changed live in the browser to capture all testing scenarios.

### 4. Install accessibility-auditing add-on

This task is as simple as adding one dependency to our package file and one line to our Storybook config. It introduces an "Accessibility" tab through [this accessibility add-on](https://storybook.js.org/addons/@storybook/addon-a11y/), which runs automated [Axe](https://www.deque.com/axe/) reports on every story. This feedback can be used during development and review to improve component accessibility.

We currently include Axe accessibility audits in our e2e-testing suite, which is discussed [in this RFC about testing](https://github.com/CMSgov/design-system/blob/main/rfcs/2021-10-e2e-tests.md). This could potentially be a replacement for those tests, especially if CI integration is added to the accessibility add-on in the future. (CI integration is on their development roadmap.)

### 5. Use Storybook _stories_ in unit tests

To create unit tests, one must write code to set up testing scenarios for a component. Storybook _stories_ require the same kind of setup. There is [an add-on that allows _stories_ to be imported into unit tests](https://storybook.js.org/addons/@storybook/testing-react/), which could reduce the amount of boilerplate code in unit tests and make them more concise. Further analysis should be made as to whether this would truly provide a long-term benefit, but it should be noted here as an option for future exploration.

### 6. Set up automated visual regression testing

Right now our visual regression tests (VRTs) are only executed before deploys on an engineer's machine before a release is made. The results are inconsistent, and it happens at a point in the process when it is no longer helpful. The time to check for visual regressions is during the code review process, when we're trying to approve and merge a change. That's when the feedback is useful and fixes can easily be made. A solution for VRTs that works in our CI (Continuous Integration) pipeline would be ideal, but unfortunately to get consistent results, we'd have to do significant work to have our VRTs execute in a virtual machine to bring the number of false negatives down to an acceptable level when executing across different environments. Having them run in a CI pipeline also guarantees that we're comparing new changes against the current main branch so we never find ourselves in a situation where we're comparing apples to oranges (or to an apple that has been sitting on the ground for three months). In short, our current solution is inadequate, and we want a low-effort way to make it robust and useful.

Storybook has an add-on called [`loki`](https://storybook.js.org/addons/loki), which adds low-configuration visual regression testing that would be compatible with our current CI-testing pipeline. It would take advantage of existing stories and require very little maintenance compared to our current visual regression testing suite. This would still require use of virtual machines/containerization in our CI environment, but it may be lower effort than doing the same thing for our current VRT suite.

Another option to explore in the future is visual-regression-testing through a service called [Chromatic](https://www.chromatic.com/features/test). Chromatic is the company that maintains Storybook, and they have a free tier for their service which we could use to try it out.

### 7. Automatically generate HTML examples from React-based _stories_ using add-on

Currently our documentation site includes plain HTML examples that we have to maintain separately from the React components. Oftentimes the HTML examples will become out of sync with the React components as changes are made over time. Using the [Storybook HTML Addon](https://storybook.js.org/addons/@whitespace/storybook-addon-html), we can automatically generate those HTML examples from our React-based _stories_ and allow the React components to be the true source of truth.

### 8. Replace current documentation-site examples with Storybook _stories_

Right now our custom docs-site generator builds and embeds live component examples that we created. We can retool our docs-site generator to pull those examples from Storybook _stories_ rather than our own custom example files. This is exactly what the [VA.gov Design System](https://design.va.gov/components/) does. The examples they show for components are embedded from Storybook. Doing this would allow us to remove a significant amount of code that we currently have to maintain.

### 9. Use Storybook _stories_ in Invision DSM

The _Invision DSM_ officially supports Storybook as their recommended tool for showing [_Live Components_](https://support.invisionapp.com/hc/en-us/articles/360028214732), and they have even built tools and a hosting service to support it. See Invision's learning course on [creating live components](https://learn.invisionapp.com/learn/course/live-components-with-dsm/) for more information about the integration. In order to show live component examples in our DSM pages, we have to embed them from our custom generated documentation site. The live components have to be hosted somewhere. By embedding Storybook _stories_ instead, we gain all the features of Storybook and features of the DSM integration.

### Benefits

All the tasks outlined in the above sections would benefit us in the following ways:

1. Improve developer experience and development efficiency
1. Better align our tooling with modern industry standards
1. Reduce maintenance burden for custom tooling, which does not scale well
1. Improve accessibility feedback during development and testing
1. Reduce amount of unit testing code to be maintained
1. Replace existing unreliable visual regression testing with CI-compatible solution
1. Eliminate issue of HTML examples becoming out of sync with React source of truth
1. Integrate code examples more smoothly into the DSM

### Risks

1. Adopting any new technology comes with the implicit risk that we'll have to change technologies in the future and refactor code.

   - The alternative is continuing to use our custom tooling. In this case the cost of maintaining our custom tooling and using it our daily work is higher than needing to refactor some code two years from now as the technology evolves.

2. Work spent on a given task outlined above doesn't result in the predicted benefit.
   - There are enough anticipated benefits overall of moving to Storybook that the success of any one feature.
   - The [VA.gov Design System](https://design.va.gov/components/)'s use of Storybook was very successful

## Questions and Requested Feedback

1. What are other risks or benefits I didn't identify?
1. Are there any opportunities to leverage Storybook that I didn't identify?
