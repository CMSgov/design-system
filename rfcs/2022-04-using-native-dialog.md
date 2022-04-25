# RFC: Integrating the native dialog element into existing components

**Date**: April 20, 2022
**Status**: WIP

## Problem

Within the Design System, current implementations of `<Dialog>` (modal) and `<Drawer>`/`<HelpDrawer>` rely on third-party libraries to assist with focus trapping for accessibility and to manage component elevation. These libraries are:

- [`react-aria-modal`](https://www.npmjs.com/package/react-aria-modal)
- [`focus-trap-react`](https://www.npmjs.com/package/focus-trap-react)

Relying on third-party libraries to facilitate what can be accomplished natively by the browser presents several pain points:

- The inclusion of libraries increases the bundle size of the Design System, impacting performance for the User
- The Design System must work within the confines of libraries' APIs, restricting the UX of these components
- Libraries frequently update
  - Updates may not be compatible with the Design System's current React version, resulting in using out-of-date libraries
  - Implementing new library versions are time-consuming and may introduce unexpected behaviors to the Design System consuming teams
- Maintaining these components have additional overhead as Engineers must learn the library's API before implementing changes

## Proposal

The recent releases of [Firefox (v98)](https://www.mozilla.org/en-US/firefox/98.0/releasenotes/) and [Safari (v15.4)](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/) introduced native support for the HTML `<dialog>` element, alongside Chrome and Edge (who've both supported this element for several years). This means the `<dialog>` element is now [supported across all modern browsers](https://caniuse.com/?search=dialog).

A robust [polyfill](https://github.com/GoogleChrome/dialog-polyfill), maintained by Chrome, is available to ensure support `<dialog>` for browsers that aren't being maintained (IE) or haven't yet been updated (older versions of Firefox and Safari).

Given the pain points listed above and the overlap of functionality between `<Dialog>` and `<Drawer>`, I propose the Design System lessens its reliance on third-party libraries by using the native `<dialog>` element for these components instead.

Recommended implementation would be to create one internal wrapping `<_Dialog>` component, which houses the `<dialog>` element and provides props that control styling and User interaction (i.e., if background content remains interactive). This component would also manage elevation and focus trapping behavior.

Implementation of this component should not change the current component APIs for `<Drawer>` and `<Dialog>`

The reasoning behind creating one parent component is as follows:

- Code is maintained in a singular file; DRY implementation
- The `<dialog>` spec has a limited number of options available, making the odds of this implementation growing in complexity minimal

Simplified example of implementation:

```js
const _Dialog = (props) => {
  <dialog className={customClass} {...dialogProps}>
    {children}
  </dialog>
}

const Drawer = (props) => {
  <_Dialog className='ds-c-drawer' hasFocusTrap={bool}>
    {/* Header */}
    <Button onClose={handleOnClose}>
    {/* Body */}
    {/* Optional footer */}
  </_Dialog>
}

const Dialog = (props) => {
  <_Dialog className='ds-c-dialog'>
    {/* Header */}
    <Button onClose={handleOnClose}>
    {/* Body */}
    {/* Footer - Modal action buttons */}
  </_Dialog>
}
```

## Benefits

By relying on the browser's implementation, the Design System stands to inherit several benefits:

- Basic functional and accessibility enhancements become the browser's problem
- Less reliance on third-parties, results in
  - Publishing less code (better performance)
  - More flexible implementation (no longer beholden to someone else's API)
  - Less Engineering time spent updating

## Risks

Two risks have been identified with this approach:

1. The Design System needs to implement a polyfill to continue IE support
2. There may be specific implementations for `<Dialog>` and `<Drawer>` that weren't tested for in the initial discovery

### 1. Polyfill support

[Windows support of IE will end on June 15, 2022](https://docs.microsoft.com/en-us/lifecycle/announcements/internet-explorer-11-end-of-support). In alignment with other websites, and to encourage Users to update their browsers, I recommend removing all IE-specific polyfills following this date.

**tldr; The addition of this polyfill is a temporary concern.**

### 2. One-off bugs may be discovered

The discovery of using the `<dialog>` element in the Design System was done using the pre-existing Storybook examples and documentation pages. As a result, there is a chance consuming teams have specific use-cases not documented in our system that this implementation will expose.

I'm not sure how to

## Questions and Requested Feedback

- How does the Design System demarcate internal, not for public-consumption components?
  - Is prefixing a component with an underscore, as in `<_Dialog>`, acceptable? Or do we prefix the name with something like, `<InternalDialog>`?
  - Should the system have a special directory for these components?
- The analytics between `<Drawer>` and `<Dialog>` appears to be identical - should this logic live in the `<_Dialog>` wrapper?
