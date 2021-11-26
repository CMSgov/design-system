# RFC: Windows High Contrast Mode (WHCM) Support

**Date**: November 29, 2021
**Status**: `WIP`

## Background

Windows High Contrast Mode (WHCM) is a unique accessibility feature originally designed for Windows users with contrast sensitivity issues. Other reasons a user might enable WHCM include:

- Reducing visual noise to improve focus
- Easing eye strain, migraines, or light sensitivity
- Preferring a specific color scheme

With WHCM, users can select a theme of colors for a scoped number of semantic elements. This theme is then applied to user interfaces and applications.

Windows provides a handful of preexisting themes, which can be customized to the user's preference. The WHCM color palette consists of the following:

- Text (foreground) color
- Hyperlink color
- Disabled text color
- Selected text color
  - Text (foreground) color
  - Background color
- Button text
  - Text (foreground) color
  - Background color
- Background color

## Problem

Our [Design System](https://design.cms.gov/) was built primarily by developers using macOS, so it wasn't as apparent how our UI library looked or behaved when WHCM was enabled. As a result, many of our more complex UI components range from difficult to impossible to use.

[This initial full audit captures how these components appear/behave in WHCM](https://docs.google.com/document/d/1uzApahaUse04UITNFNa-uFY4IQ3Z9mAuzx5xNmniUJ0/edit?usp=sharing).

Outages can be categorized as follows:

- Inconsistent disabled states
  - Should use the mapped WHCM "disabled text color"
  - Needs `not-allowed` cursor for additional context
- Form fields lack usable success, error, and hint text/states
  - Due to the limited color palette...
    - Field error and success states look indistinguishable from default field state
    - Hint and error text look identical to each other
    - It's not entirely obvious an error has happened in a form field without reading the text
  - The solution is to avoid relying on color alone when conveying different messages/states (_needs a11y/design direction_)
    - Different border styles/widths?
    - Use of italic or bold text?
    - Label error text with "Error:" language?
  - Seen in all form fields, but mostly inherited from the `FormLabel` component
- Icons vary in visibility
  - Some icons don't render
  - Icons that do render don't reflect WHCM color palette and are difficult to see
  - Reliance on icons only to convey meaning is lost, especially for Alerts, Buttons with icons, and displaying active states in navigation
  - Icons should inherit the appropriate text color as mapped to the WHCM theme
- Border issues
  - Thin/no borders make it hard to see Badge, FilterChip, HelpDrawerToggle, Tooltip, and the Modal close button
  - Content in Accordion and Tabs aren't visually grouped together as they are in non-WHCM
- Buttons (_needs a11y/design direction_)
  - Use of "ghost style" buttons results in weird padding/margins and/or broken borders
  - Should buttons and links styled as buttons look the same?

## Proposal

CSS media queries exist to detect if WHCM is enabled and can help developers modify how its styles are applied to specific elements.

`[-ms-high-contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-ms-high-contrast)` is a Microsoft extension that targets WHCM for IE and older versions of Edge. It supports `none`, `active`, `black-on-white`, and `white-on-black` as values. But it's recommended at this point to only use the `active` value.

`[forced-colors](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)` is a new media query supported by Chrome, Edge, and Firefox. It supports `none` and `active` as values. It should also be noted that this media feature spec is actively being worked on.

[Windows recommends using both media queries](https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/) (aka ["The Frankenquery"](https://adrianroselli.com/2021/02/whcm-and-system-colors.html#Frankenquery)) to guarantee adequate support for those using WHCM. This would look something like:

```css
@media (-ms-high-contrast: active), (forced-colors: active) {
  /* CSS overrides here */
}
```

While our design system no longer technically supports IE (as [it falls below our 2% support threshold](https://analytics.usa.gov/health-human-services/)), a good percentage of those who rely on WHCM continue to use it. And because the effort to support IE is low, I agree with Microsoft's recommendation - just be certain your system color keywords work across both queries and the cascade doesn't impact how those styles render (meaning, test the changes). If more targeted styles are needed between IE and Edge, this query may need to be split.

We have access to a SauceLabs account and they have [good documentation for how to do local testing](https://docs.saucelabs.com/secure-connections/sauce-connect/quickstart/).

**And to note, before any work begins:**

It's not the intention of this work to create a separate design for WHCM users. If semantic HTML is used correctly, there should be very little need to overwrite styles. The overall recommendation is to use a light touch when applying fixes. As [Adrian Roselli writes](https://adrianroselli.com/2021/02/whcm-and-system-colors.html#FQs):

> You should only ever use these feature queries to spackle over gaps (found in most libraries / frameworks) or enhance an experience that may be lacking.

And as [MSN says](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors#accessibility_concerns):

> [...] its intended usage is to make small tweaks to improve usability or legibility when the default application of forced colors does not work well for a given portion of a page.

I believe the outages identified above (with maybe the exception of Buttons) fall into this definition.

### Benefits

- We get to be Good Guy Gregs by supporting a widely used accessibility feature
- Our design system delivers a consistent experience regardless of user setting
- Current unusable components will be usable to our users and the end users

### Risks

- Overrides between the media queries outlined may not be a perfect 1:1 match - visual testing will be required
- Support for `forced-colors` exists in all modern browsers, but the spec is still in draft mode so there's a risk the spec will change
- Does our team have the bandwidth to tackle these issues?

## Questions and Requested Feedback

TBD
