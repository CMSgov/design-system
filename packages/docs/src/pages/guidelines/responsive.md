---
title: Responsive design
weight: 10
---

The design system's layout, utility, and typography classes are built with responsive web design in mind and is built to be **mobile first**.

## Breakpoints

Use the breakpoint prefixes `sm`, `md`, `lg`, and `xl` to apply styles at different viewport sizes. For example: `ds-u-lg-display--none` sets an element's `display` property to `none` when the viewport is `1024px` or wider.

| Prefix | Breakpoint          | Sass variable | Description                  |
| ------ | ------------------- | ------------- | ---------------------------- |
|        | `min-width(0px)`    | `$width-xs`   | Viewports `0px` and wider    |
| `sm`   | `min-width(544px)`  | `$width-sm`   | Viewports `544px` and wider  |
| `md`   | `min-width(768px)`  | `$width-md`   | Viewports `768px` and wider  |
| `lg`   | `min-width(1024px)` | `$width-lg`   | Viewports `1024px` and wider |
| `xl`   | `min-width(1280px)` | `$width-xl`   | Viewports `1280px` and wider |

### What supports a breakpoint prefix

In order to reduce code bloat, not everything supports a breakpoint prefix. Only the items below support breakpoint prefixes.

- [Grid]({{root}}/layout/grid#layout.grid.responsive)
- [Typography]({{root}}/style/typography#style.typography.responsive)
- [Flexbox]({{root}}/utilities/flexbox#utilities.flexbox.responsive)
- [Float]({{root}}/utilities/float#utilities.float.responsive)
- [Font size]({{root}}/utilities/font-size#utilities.font-size.responsive)
- [Margin]({{root}}/utilities/margin#utilities.margin.responsive)
- [Padding]({{root}}/utilities/padding#utilities.padding.responsive)
- [Text align]({{root}}/utilities/text-align#utilities.text-align.responsive)
- [Visibility]({{root}}/utilities/display-visibility#utilities.display-visibility.responsive)

Additional usage examples are available on the pages listed above.
