---
title: Responsive design
weight: 10
---

<p class="ds-text--lead">The design system's layout, utility, and typography classes are built with responsive web design in mind and is built to be <strong>mobile first</strong>.</p>

![Responsive demo]({{root}}/public/images/responsive-demo.gif)

## Usage

Use the breakpoint prefixes `sm`, `md`, `lg`, and `xl` to apply styles at different viewport sizes.

| Prefix | Breakpoint | Description |
| ------ | ---------- | ----------- |
| | `min-width(0px)` | Viewports 0px and wider |
| `sm` | `min-width(544px)` | Viewports 544px and wider |
| `md` | `min-width(768px)` | Viewports 768px and wider |
| `lg` | `min-width(1024px)` | Viewports 1024px and wider |
| `xl` | `min-width(1280px)` | Viewports 1280px and wider |

For example: `ds-u-lg-display--none` sets an element's `display` property to `none` when the viewport is `1024px` or wider.

### What supports a breakpoint prefix

In order to reduce code bloat, not everything supports a breakpoint prefix. Only the items below support breakpoint prefixes.

- [Grid]({{root}}/layout/grid)
- [Typography]({{root}}/style/typography#style.typography.responsive)
- [Flexbox]({{root}}/utilities/flexbox)
- [Float]({{root}}/utilities/float#utilities.float.responsive)
- [Font size]({{root}}/utilities/font-size#utilities.font-size.responsive)
- [Margin]({{root}}/utilities/margin#utilities.margin.responsive)
- [Padding]({{root}}/utilities/padding#utilities.padding.responsive)
- [Text align]({{root}}/utilities/text-align#utilities.text-align.responsive)
- [Visibility]({{root}}/utilities/display-visibility#utilities.display-visibility.responsive)

Additional usage examples are available on the pages listed above.