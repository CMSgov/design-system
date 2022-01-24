# RFC: Standardizing Icons in the Core DS

**Date**: October 01, 2021
**Status**: `Approved`

## Problem

The core DS does not have a consistent and easy way for consuming applications to import SVG icons. Additionally, because of the way some icons are used in DS components, it is difficult for consuming applications to change styles for an icon (like color, size, positioning, etc).

### Background

Currently, icons are stored in three main ways:

1. Exported as an individual React component, but not in a centralized location
2. Stored in the `design-system/images/` directory as .svg files
3. Included in a component's markup unable to be re-used individually.

The .svg files in the `images/` directory are referenced in the code in two main ways:

1. In CSS as background images
2. Using the library `inline-react-svg`, .svg files can be imported and used as a component (Note: this does not work with Typescript components)

## Proposal

Icons in the core DS should be moved to a centralized location. Each icon should be exported individually as a React component and updated with a standard size and consistent accessibilty features. This will provide more flexibility to consuming applications by allowing them to import individual SVG icons, adjust the styling on them with more ease, and create icon consistency among products.

This ideal state can be achieved in a few phases:

1. [Create icon components](#phase-1-create-icon-components)
2. [Clean & improve markup](#phase-2-clean-and-improve-svg-markup)
3. [Update icon references in components](#phase-3-update-component-icon-references)
4. [Update icon references in CSS](#phase-4-update-css-icon-references)
5. [Beyond](#beyond)

### Phase 1: Create Icon Components

In this phase:

- Make `Icons` directory in the design-system component folder
- Create a component for each icon in the `images` directory
- Move the `ClearIcon` and `ClearIconAlternate` components into new directory
- Move inlined SVG markup for `<` & `>` from Pagination to new directory. Consider consolidating to one Icon with variations.
- Ensure all icons are exported
- Create base icon component styles to be re-used in each component
- Update doc site with component details

Exporting each SVG icon individually allows consuming applications to only import the icons they are using.

#### Considerations

There was an idea to create one `Icon` component and pass in a `name` prop that would return the proper svg markup. However, this approach would not work well for child design systems and could inflate bundle sizes.

### Phase 2: Clean and Improve SVG Markup

In this phase:

- Ensure SVGs have accessibility features
  - See [Smashing Magazine](https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/) or [Deque](https://www.deque.com/blog/creating-accessible-svgs/) for guidance
- Standardize sizing of SVGs either using viewbox or CSS
- Remove any inline `fill` properties from SVG and move to CSS for easier overriding
- Ensure SVG markup is optimized - run through optimizer
- Ensure icons in code are represented in UI Kit (sketch files) [will need Design help]

_Note: an initial release of icons could be done at this point so that teams may start using the icons. This release would include additions of the icon components and should not break existing usage_

### Phase 3: Update Component Icon References

In this phase:

- Update any current DS component that is using an inline SVG.
  - This includes, but is not limited to: `Pagination`, `FilterChip`, `TooltipIcon`, `UsaBanner`

### Phase 4: Update CSS Icon References [Breaking Change]

In this phase:

- Update any current DS component that is referencing an SVG in its CSS to use inlined icon components
  - This includes, but is not limited to: `Accordion`, `Alert`, `Dialog`, `Dropdown`, `StepList`, `UsaBanner`, `VerticalNav`
- Create documentation for consuming applications. This should explain any changes and instruct on how application styles may be affected

_**Note:** This phase will rely deeply on visual regression testing to ensure component styles translate correctly_

This phase will include a breaking change to consuming applications' styles and potentially build systems. Will need to coordinate timing and communication.

#### Considerations for Child Systems

The Medicare.gov child design system currently overwrites some of the background image icons in its SCSS files (specifically in its `Dialog` & `Help Drawer` overrides). As part of this work, the Dialog and Help Drawer components should be updated to take a `closeIconProp`. This prop would be of type Element and in the core DS, would be defaulted to the current close icon. In the mgov DS, a wrapper component for these components would need to be created with the same name that defaults the `closeIconProp` to the mgov-specific icon.

This path allows for flexibility but with the least disruption for teams consuming the mgov system.

_**Note:** As mentioned in the [Beyond](#beyond) section, this kind of icon flexibility could be added to other components. Dialog & Help Drawer would be prioritized because of their current usage in mgov DS_

### Beyond

Future icon work that needs consideration:

- Incorporate configurable icons into some components (like Accordion, FilterChip, Modal, Naviation, etc)
- How does the new `Icon` component's documentation relate to [current icon documentation](https://design.cms.gov/style/icons/)

### Benefits

Moving forward with these changes will:

- Allow consuming applications to have a source of truth for DS icons
- Allow consuming applications to more easily overwrite icon styles, if needed
- Provide additional accessibility to icons
- Provide a way for child design systems to extend the icon library

### Risks

Moving forward with these changes could:

- Break consuming applications' styles or build systems in Phase 4
