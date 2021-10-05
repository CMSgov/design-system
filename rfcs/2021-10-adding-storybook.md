# RFC: Adding Storybook to improve development experience and to integrate with DSM

**Date**: October 5, 2021
**Status**: `Review`

## Problem

Our team currently uses our documentation site generator for developing design system components. It is our only tool for visualizing our components and interacting with them in the browser. However, this reliance on the docs-site generator for development has two major problems:

1. **It is too slow for development.** The docs-site generator is a custom-built tool that is slow and unwieldy. As an engineer makes live changes to code, it can take thirty seconds or more to see those changes reflected in the browser. This is an unacceptable developer experience. The docs-site generator is fine for statically building the documentation site but is inappropriate as a tool for live development.
2. **Using component examples for development wastes effort and time.** The component examples on our docs site can never capture all the scenarios that will need to be tested during development, and they must stay tailored to our audience. Right now an engineer must modify the component examples throughout the development process and must revert those changes before merging. This becomes duplicated and wasted effort over time.

Freeing the development process from reliance on the docs-site generator would result in increased speed of development and less wasted effort.

## Proposal

### Benefits

### Risks

## Questions and Requested Feedback
