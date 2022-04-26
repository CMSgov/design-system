# RFC: Integrating the native dialog element into existing components

**Date**: April 20, 2022
**Status**: Ready for review

## Problem

Within the Design System, `<Dialog>` (modal) and `<Drawer>` currently rely on third-party libraries to assist with focus trapping and to manage component elevation. These libraries are:

- [`react-aria-modal`](https://www.npmjs.com/package/react-aria-modal)
- [`focus-trap-react`](https://www.npmjs.com/package/focus-trap-react)

Relying on third-party libraries to facilitate what can be accomplished natively by the browser presents several pain points:

- The inclusion of libraries increases the bundle size of the Design System, impacting performance for the User
- The Design System must work within the confines of libraries' APIs, restricting the UX potential of these components
- Libraries update frequently
  - Updates may not be compatible with the Design System's current code environment, resulting in using out-of-date libraries
  - Implementing new library versions are time-consuming and may introduce unexpected behaviors to Design System consuming teams
- Maintaining these components have additional overhead as Engineers must learn that library's specific API before implementing required changes

## Proposal

The releases of [Firefox (v98)](https://www.mozilla.org/en-US/firefox/98.0/releasenotes/) and [Safari (v15.4)](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/) introduce native support for the HTML `<dialog>` element. Chrome and Edge have supported this element for several years, meaning the `<dialog>` element is now [supported across all modern browsers](https://caniuse.com/?search=dialog).

A robust [polyfill](https://github.com/GoogleChrome/dialog-polyfill), maintained by Chrome, is available to ensure support of `<dialog>` for browsers that aren't actively being maintained (IE) or haven't yet been updated (older versions of Firefox and Safari).

Given the pain points listed above and the overlap of functionality between `<Dialog>` and `<Drawer>`, it's suggested the Design System lessen its reliance on third-party libraries by using the native `<dialog>` element for these components instead.

The recommended implementation is to create one internal wrapping `<_Dialog>` component, which houses the `<dialog>` element and provides props that control styling and User interaction (i.e., if background content remains interactive). This component would also manage elevation and focus trapping behavior.

Implementation of this component should not change the current component APIs for `<Drawer>` and `<Dialog>`.

The reasons we want to create a React wrapper from the native element and use it in multiple components are the following:

- Code is maintained in a singular file; DRY implementation
- The `<dialog>` spec has a limited number of methods available, making the complexity of this component minimal
  - `close()` closes the dialog
  - `show()` opens the dialog, but background elements will remain interactive
  - `showModal()` opens the dialog as a modal, background elements will **not** be interactive

Simplified example of implementation:

```js
const _Dialog = (props) => {
  {/* Provides props that map to native dialog methods */}
  <dialog className={customClass} {...dialogProps}>
    {children}
  </dialog>
}

const Drawer = (props) => {
  {/* Would use .show() method to open */}
  {/* Consuming components will manage `.close()` for the dialog */}
  <_Dialog ref={DrawerDialog} className='ds-c-drawer' hasFocusTrap={bool}>
    {/* Header */}
    <Button onClose={close()}>
    {/* Body */}
    {/* Optional footer */}
  </_Dialog>
}

const Dialog = (props) => {
  {/* Would use .showModal() method to open */}
  {/* Consuming components will manage `.close()` for the dialog */}
  <_Dialog className='ds-c-dialog'>
    {/* Header */}
    <Button onClose={close()}>
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
  - A more flexible implementation (no longer beholden to someone else's API)
  - Less Engineering time and effort spent updating

## Risks

Two risks have been identified with this approach:

1. The Design System needs to implement a polyfill to continue IE support, which may result in less bundle size savings than initially suggested
2. There may be specific implementations for `<Dialog>` and `<Drawer>` that weren't tested for in the initial discovery

### 1. Polyfill support

[Windows support of IE will end on June 15, 2022](https://docs.microsoft.com/en-us/lifecycle/announcements/internet-explorer-11-end-of-support). In alignment with other websites, and to encourage Users to update their browsers, I recommend removing all IE-specific polyfills following this date.

**tldr; The addition of this polyfill is a temporary concern.**

### 2. One-off bugs may be discovered

The discovery of using the `<dialog>` element in the Design System was done using the pre-existing Storybook examples and documentation pages. As a result, there is a chance consuming teams have specific use-cases not documented in our system that this implementation will expose.

To mitigate this risk, consuming teams can test this update using the Design System's beta release and can flag any potential problems to be resolved before this implementation is officially released.

## Questions and Requested Feedback

- How does the Design System demarcate internal, not for public-consumption components?
  - Is prefixing a component with an underscore, as in `<_Dialog>`, acceptable? Or do we prefix the name with something like, `<InternalDialog>`?
  - Should the system have a special directory for these components?
- The analytics between `<Drawer>` and `<Dialog>` appears to be identical - should this logic live in the `<_Dialog>` wrapper?
