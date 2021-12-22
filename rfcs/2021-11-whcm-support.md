# RFC: Windows High Contrast Mode (WHCM) Support

**Date**: November 29, 2021

**Status**: `WIP`

## Background

Windows High Contrast Mode (WHCM) is a unique accessibility feature originally designed for Windows users with contrast sensitivity and low vision issues. Other reasons a user might enable WHCM include:

- Reducing visual noise to improve focus
- Easing eye strain, migraines, or light sensitivity
- Preferring a specific color scheme

With WHCM, users can select a theme of colors for a scoped number of semantic elements. This theme is then applied to user interfaces and applications.

Windows provides a handful of preexisting themes, which can be customized to the user's preference. The WHCM color palette consists of the following colors:

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
  - Avoid relying on color alone when conveying different messages/states. Error states should have an error icon prepending the error message
  - Seen in all form fields, but mostly inherited from the `FormLabel` component
- Icons vary in visibility
  - Some icons don't render
  - Icons that do render don't reflect WHCM color palette and are difficult to see
  - Reliance on icons only to convey meaning is lost, especially for Alerts, Buttons with icons, and displaying active states in navigation
  - Icons should inherit the appropriate text color as mapped to the WHCM theme
- Border issues
  - Thin/no borders make it hard to see Badge, FilterChip, HelpDrawerToggle, Tooltip, and the Modal close button
  - Content in Accordion and Tabs aren't visually grouped together as they are in non-WHCM
- Buttons
  - Use of "ghost style" buttons results in weird padding/margins and/or broken borders
  - Should buttons and links styled as buttons look the same?

## Proposal

CSS media queries exist to detect if WHCM is enabled and can help developers modify how styles are applied to specific elements. These queries provide both guidance for the browser on how a web element should appear when WHCM is enabled **and** contain any necessary style overrides so they're applied only when WHCM is enabled (meaning high contrast styles won't bleed out into non-high contrast scenarios).

[`-ms-high-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-ms-high-contrast) is a Microsoft extension that targets WHCM for IE and older versions of Edge. It supports `none`, `active`, `black-on-white`, and `white-on-black` as values, but it's recommended at this point to only use the `active` value.

[`forced-colors`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) is a new media query supported by Chrome, Edge, and Firefox and is considered the standard for browsers moving forward. It supports `none` and `active` as values.

[Windows recommends using both media queries](https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/) (aka ["The Frankenquery"](https://adrianroselli.com/2021/02/whcm-and-system-colors.html#Frankenquery)) to guarantee adequate support for those using WHCM. This would look something like:

```css
@media (-ms-high-contrast: active), (forced-colors: active) {
  /* CSS overrides here */
}
```

### Examples

#### Ex. 1: Specifying custom style rules on an element

Both `-ms-high-contrast` and `forced-colors` queries behave like your average run-of-the-mill queries in that they scope their defined styles to a specific condition (high contrast, in this case).

For example, if we wanted to increase the border-width on `<FilterChip />`, you could write the following code:

```css
@media (-ms-high-contrast: active), (forced-colors: active) {
  .ds-c-filter-chip__button {
    border-width: 2px;
  }
}
```

In this example, a 2px border would be applied to the `<FilterChip />`, but only when WHCM is enabled.

> ⚠️ It's worth noting that while you can apply specific color values (i.e., hex values) using this query, it's recommended you avoid using static colors in forced colors mode due to the risk of introducing a visual contrast bug.
>
> To implement colors, it's recommended you use CSS System Colors, which will automatically pick up whichever color the user specified. See Ex. 2 for more details about CSS System Colors.

#### Ex. 2: Overriding an element's style rules using [CSS System Colors](https://www.w3.org/TR/css-color-4/#css-system-colors)

For instances where the color of an element needs to be adjusted, it's recommended you use CSS System Colors. These colors are basically a limited set of variables a user sets to define their contrast theme. You can find a list of available colors in the link above.

Using system colors in lieu of static colors is preferred because a static color, like `#ff0000`, may have unexpected and severe contrast issues for your user.

For example, because we've implemented custom checkbox and radio buttons, these elements don't receive all the styles a native checkbox or radio button would normally receive. So when a checkbox or radio button is disabled, that style isn't apparent at all in WHCM. To fix something like this, you'd implement the following:

```css
@media (-ms-high-contrast: active), (forced-colors: active) {
  .ds-c-choice:disabled + label {
    color: GrayText; /* `GrayText` is the CSS System Colors name for disabled text */
  }
  .ds-c-choice:disabled + label:before {
    border-color: GrayText;
  }
}
```

#### Ex. 3: Making sure an element's style persists, regardless of contrast mode

There are some scenarios where you may want to force an element to appear the same in WHCM as you would in any non-WHCM environment. For our purposes, we may want to use this approach for sections of our documentation site, like our [color swatches](https://design.cms.gov/styles/color/), which have visual meaning but don't appear in WHCM due to the limited WHCM color palette.

To preserve the original appearance of an element in WHCM, you could write the following:

```css
@media (-ms-high-contrast: active), (forced-colors: active) {
  .c-swatch__preview {
    -ms-high-contrast-adjust: none; /* For IE */
    forced-color-adjust: none; /* For everything else * /
  }
}
```

### Recommendation

**WHCM updates should support IE in addition to modern browsers.**

While our design system no longer technically supports IE ([as it falls below our 2% support threshold](https://analytics.usa.gov/health-human-services/)), a good percentage of those who rely on WHCM continue to use it. And because the effort to support IE is low, I agree with Microsoft's recommendation - just be certain your system color keywords work across both queries and the cascade doesn't impact how those styles render (meaning, **test the changes**). If more targeted styles are needed between IE and Edge, the Frankenquery may need to be split.

**New and refactored components should be checked in WHCM as part of our "definition of done".**

We have access to a SauceLabs account and they have [good documentation for how to do local testing](https://docs.saucelabs.com/secure-connections/sauce-connect/quickstart/), so we should use it.

**Collaboration between developer and designer may be needed for some issues, but probably not all.**

There are some issues in WHCM that I would consider low severity and I'd think design could trust development to implement a good solution. I'm thinking border-widths, margin/padding on our buttons, and ensuring System Colors are being implemented correctly (like in the disabled state mentioned above). For these kinds of issues, I can envision a developer making an adequate fix and maybe sharing a screenshot with design if needed.

Designer/developer collaboration is probably needed for moderate-to-severe issues.

A moderate concern might be how our error states look on form fields, or how SVGs should look in certain context (to `currentColor` or not to `currentColor`?).

A severe concern is when a component doesn't work correctly or fails to convey its messaging. Think `<Alert />` (they all look the same, without indication of severity) or `<Tabs />`/`<VerticalNav />` (where the active state is difficult to see or not apparent).

Depending on the issue, this collaboration might be able to happen asynchronously or require a meeting. Asynchronous communication could be as simple as sharing screenshots, or even sharing Storybook links so each party can test the component in WHCM themselves.

> 🗣 I believe most of our WHCM issues fall under low or moderate severity, with the bulk being how our SVGs (icons and logos) should look on their own and within certain contexts.

**And to note, before any work begins:**

It's not the intention of this work to create a separate design for WHCM users. If semantic HTML is used correctly, there should be very little need to overwrite styles. The overall recommendation is to use a light touch when applying fixes. As [Adrian Roselli writes](https://adrianroselli.com/2021/02/whcm-and-system-colors.html#FQs):

> You should only ever use these feature queries to spackle over gaps (found in most libraries / frameworks) or enhance an experience that may be lacking.

And as [MSN says](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors#accessibility_concerns):

> [...] its intended usage is to make small tweaks to improve usability or legibility when the default application of forced colors does not work well for a given portion of a page.

I believe the outages identified (with maybe the exception of Buttons) fall into this definition.

### Benefits

- We get to be Good Guy Gregs by supporting a widely used accessibility feature
- Our design system delivers a consistent experience regardless of user setting
- Current unusable components will be usable to our users and the end users

### Risks

- Overrides between the media queries outlined may not be a perfect 1:1 match - visual testing will be required
- Support for `forced-colors` exists in all modern browsers, but the spec is still in draft mode so the spec may change
- Does our team have the bandwidth to tackle these issues?
- There isn't a way to automate testing, so visual regressions within WHCM could potentially exist for awhile without detection

## Questions and Requested Feedback

We'll need to codify some kind of workflow to ensure WHCM is being accounted for.

If a light or dark theme is introduced to our system, we'll need to reevaluate our WHCM solutions to best account for those preferences. `prefers-color-scheme` is a query that can be used in combination with the contrast queries mentioned above to accommodate WHCM users with a light or dark theme preference. But because our system doesn't currently accommodate a light/dark themes, I don't think this is something we need to pursue at this time.
