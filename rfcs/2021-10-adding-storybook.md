# RFC: Adding Storybook to improve development experience and to integrate with DSM

**Date**: October 5, 2021
**Status**: `Review`

## Problem

Our team currently uses our documentation site generator for developing design system components. It is our only tool for visualizing our components and interacting with them in the browser. However, this reliance on the docs-site generator for development has two major problems:

1. **It is too slow for development.** The docs-site generator is a custom-built tool that is slow and unwieldy. As an engineer makes live changes to code, it can take thirty seconds or more to see those changes reflected in the browser. This is an unacceptable developer experience. The docs-site generator is fine for statically building the documentation site but is inappropriate as a tool for live development.
2. **Using component examples for development wastes effort and time.** The component examples on our docs site can never capture all the scenarios that will need to be tested during development, and they must stay tailored to our audience. Right now an engineer must modify the component examples throughout the development process and must revert those changes before merging. This becomes duplicated and wasted effort over time.

Decoupling the development process from the docs-site generator tool would increase development speed and efficiency.

## Proposal

This problem has already been solved in the industry by [_Storybook_](https://storybook.js.org/), a well maintained and popular open-source tool for developing libraries of components. Storybook is used at Airbnb, GitHub, IBM, Lyft, and the list goes on.

> Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.

We would primarily use it as an internal tool at first, but in the future we could integrate parts of it [into the Invision DSM](https://support.invisionapp.com/hc/en-us/articles/360052115111) and/or into our documentation site. Beyond solving the problems explained in the above section, Storybook can also streamline other parts of our development and testing process, especially with the use of some specific Storybook add-ons. These opportunities will be explained in their corresponding sections.

Introducing Storybook into our project and workflow can happen incrementally and in a piecemeal fashion. With the exception of the first, the following tasks can happen in any order and may be undertaken in parallel:

1. Set up Storybook for development use
2. Add Storybook _stories_ for existing components
3. Automatically build Storybook previews for pull requests
4. Use Storybook _stories_ in unit tests
5. Set up accessibility testing using add-on
6. Set up automated visual regression testing using add-on
7. Automatically generate HTML examples from React-based _stories_
8. Replace current documentation-site examples with Storybook _stories_

> **What are Storybook "stories"?**
>
> "A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support." - [storybook.js.org](https://storybook.js.org/docs/react/get-started/whats-a-story)
>
> The following sections reference using _stories_ in various ways. The nice thing about creating _stories_ for our components is that they become nice little units that feed into other tools and processes. For instance, we can use a _story_ in a unit test or a visual regression test. Classically we would have to set up initialization code for a component in many separate tools, but the _story_ is consummable by many tools in the Storybook ecosystem.

### 1. Set up Storybook for development use

This first task is to set up Storybook for local development. We would add it to our repository and configure it to work with our existing components and styles, but we would not host it publicly anywhere. It would not be integrated into our documentation site or the DSM, but we could start writing _stories_ to use in local development of our components as needed.

### 2. Add Storybook _stories_ for existing components

Once we have basic support for Storybook from the previous step, we can incrementally add stories for all our components. This can be an organic process as changes are made to components or be done as a series of tickets to add stories. For the purpose of using _stories_ in other ways outlined in this RFC, we should make an effort to add at least one basic story for each component.

### 3. Automatically build Storybook previews for pull requests

Currently we have [a Cloudbees Jenkins job that automatically builds our documentation site](https://ci.backends.cms.gov/wds/job/design-system/job/build%20demo/) for each branch that has a pull request. This documentation-site preview can be used as part of the review process, especially by non-engineer teammates and stakeholders who want to review the work without having to set up a local development environment. In the same manner, we can add a job that will build a Storybook preview for pull requests. The Storybook preview will be far more useful for reviewing and manually testing components because they are not limited to the scenarios defined in the documentation-site examples. The component props can even be changed live in the browser to capture all testing scenarios.

### 4. Use Storybook _stories_ in unit tests

To create unit tests, one must write code to set up testing scenarios for a component. Storybook _stories_ require the same kind of setup. There is [an add-on that allows _stories_ to be imported into unit tests](https://storybook.js.org/addons/@storybook/testing-react/), which could reduce the amount of boilerplate code in unit tests and make them more concise. Further analysis should be made as to whether this would truly provide a long-term benefit, but it should be noted here as an option for future exploration.

### 5. Set up accessibility testing using add-on

### 7. Automatically generate HTML examples from React-based _stories_ using add-on

Currently our documentation site includes plain HTML examples that we have to maintain separately from the React components. Oftentimes the HTML examples will become out of sync with the React components as changes are made over time. Using the [Storybook HTML Addon](https://storybook.js.org/addons/@whitespace/storybook-addon-html), we can automatically generate those HTML examples from our React-based _stories_ and allow the React components to be the true source of truth.

### Benefits

### Risks

## Questions and Requested Feedback
