---
title: Responsive design
weight: 10
---

![Responsive demo]({{root}}/public/images/responsive-demo.gif)

The design system's layout, utility, and typography classes are built with responsive web design in mind and is built to be **mobile first**. Use the prefixes `sm`, `md`, `lg`, and `xl` to quickly and easily adjust your layout and content for different screen sizes and devices. Further info and usage examples are available on the individual documentation pages.

| Prefix | Breakpoint | Description |
| ------ | ---------- | ----------- |
| `sm` | `min-width(544px)` | Viewports 544px and wider |
| `md` | `min-width(768px)` | Viewports 768px and wider |
| `lg` | `min-width(1024px)` | Viewports 1024px and wider |
| `xl` | `min-width(1280px)` | Viewports 1280px and wider |

For example: `ds-u-lg-display--none` sets an element's `display` property to `none` when the viewport is `1024px` or wider.

## What supports a responsive prefix

In order to reduce code bloat, not all utilities support a responsive prefix. Only the items in the following list support responsive prefixes.

- [Grid]({{root}}/layout/grid)
- [Typography]({{root}}/base/typography#responsive)
- [Float]({{root}}/utilities/float#responsive)
- [Font size]({{root}}/utilities/font-size#responsive)
- [Margin]({{root}}/utilities/margin#responsive)
- [Padding]({{root}}/utilities/padding#responsive)
- [Text align]({{root}}/utilities/text-align#responsive)
- [Visibility]({{root}}/utilities/visibility#responsive)