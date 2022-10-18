# Component maturity

Each component is tested against the following items to guage the component's maturity. Use this list to understand how to test the component and when to make a checklist item 'Not applicable'.

## Accessibility
### WCAG 2.1 Level AA Conformance
All Axe and Storybook plugins for WCAG AA compliance have passed.

#### When to define as 'Not applicable'?
Should not be used.

#### How to test?
Code is checked with the [Axe Core plugin (external link)](https://github.com/dequelabs/axe-core "Axe core plugin repository") that finds on average 57% of WCAG issues automatically. You can see the complete list of rules that are checked in the [rules descriptions (external link)](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md "Axe core plugin rules description"). 

You can use Storybook to test for WCAG violations and color blindness filters.

Run `yarn test:a11y`

### Supports Forced Colors Mode (FCM)
While using FCM the components text is legible and improves readability.

#### When to define as 'Not applicable'?
Should not be used.

#### How to test?
In Forced Color Mode (FCM) in Windows, verify in Edge, Chrome, and Firefox that:
- All background colors are reset to a single color.
- All elements that need a border have one.
- All SVG elements and icons have a contrast color applied.
- Color is not the only means used to convey meaning with elements.
- Focus styles are clearly indicated.

The full suite of visual regression tests takes screenshots of what each component looks like in forced-colors mode. One can also [turn on forced-colors mode in browser developer tools (external link)](https://devtoolstips.org/tips/en/emulate-forced-colors/ "Turn on forced-colors mode"). They should be reviewed by the team to determine if the component meets the above criteria.

### Color
Meets AA color contrast standards for accessibility and color blindness.

#### When to define as 'Not applicable'?
Should not be used.

#### How to test?
Code is verified for color contrast using the Axe Core plugin.

Color blindness is tested using a color blindness simulator and visually inspected for:
- Elements with low color contrast
- Text readability
- Link visibility
- Errors and warnings that might rely on color

- Code - Run `yarn test:a11y`
- Design - Designs are verified using a plugin within Sketch to check color contrast and color blindness.

### Screen readers
VoiceOver, NVDA, and JAWS were used to test for concise communication and interaction.

#### When to define as 'Not applicable'?
When the component has no interactive elements like a button or text input a 'Not applicable' state can be applied.

#### How to test?
Testing is a manual process and takes some time to understand how screen readers work. Use the instructions provided in the [Accessibility Champions guidance (Google docs)](https://docs.google.com/document/d/1-2W9Gm97lBWWv8ljjjQ20JJEHS4DF8ldqHBIY4yWhFs/edit#bookmark=id.649z7zqdm5au "Accessibility Champions guide") to learn how to use a screen reader. Deque University also provides some guidance and demos on [how to use a screen reader (external link)](https://dequeuniversity.com/screenreaders/ "How to use a screen reader").

Components are tested in the following screen readers: 
- Mac OS
-- Safari + VoiceOver
- Windows
-- NVDA + Edge
-- JAWS + Edge
-- iOS + Safari + Mobile VoiceOver (as time permits)

### Keyboard navigation
Component is fully navigable with a keyboard.

#### When to define as 'Not applicable'?
When the component has no interactive elements like a button or text input a 'Not applicable' state can be applied.

#### How to test?
Keyboard navigation is tested using this [keyboard acceptance criteria (Confluence document)](https://confluence.cms.gov/display/CMSWDS/Keyboard+Navigation+Testing "Keyboard acceptance criteria").

Use this [guidance from WebAIM (external link)](https://webaim.org/techniques/keyboard/ "WebAIM keyboard navigation guidance") to navigate components using a keyboard.

## Code

### Storybook
Component has stories to cover all defined props.

#### When to define as 'Not applicable'?
Should not be used.

#### How to test?
[Storybook (external link)](https://storybook.js.org/ "Storybook JS") is an open-source tool for building components in isolation that is public to all Design System users. 

Manually interact with the Storybook stories and make sure that all defined props are in some way tested by our storybook story and that the meaningful ones can be changed. Specifically,
- Event handlers have visible output through Actions or logging
- Visual and content props can be changed, as long as the prop can be easily changed with standard Storybook controls
- Alternate stories exist for complex component configurations that are common

### Responsive
Component designed to work in all responsive breakpoints and allow users to zoom (scale) up to 400% at a 1280px browser width. 

#### When to define as 'Not applicable'?
Should not be used.

#### How to test?
View in [all supported breakpoints (internal link)](https://design.cms.gov/foundation/layout-grid/responsive-design?theme=core "Supported breakpoints") in the CMSDS with [Storybook controls (internal link)](https://design.cms.gov/storybook/ "CMSDS Storybook") or with browser dev tools.

To test zoom levels, use browser dev tools to zoom your browser to a 400% zoom level.
- Content should not overlap, or force users to scroll horizontally
- All content should still be available.

### Spanish translations
Includes Spanish translations for default text content.

#### When to define as 'Not applicable'?
When the component has no text to apply a translation to.

#### How to test?
[Read more about Internationalization (internal link)](https://design.cms.gov/getting-started/developers/internationalization/?theme=core "Internationalization") in the CMSDS.

Changing the language in the [Storybook controls (internal link)](https://design.cms.gov/storybook/ "CMSDS Storybook") should change all English content that isn’t provided through a prop

## Design

### Sketch UI-kit
Includes all Sketch symbols for defined options.

#### When to define as 'Not applicable'?
When the component is a utility with no visual element.

#### How to test?
Verify with code that all props and options that can be used in code have an equal option in Sketch.

### Responsive
All Sketch symbols designed for small and large breakpoints.

#### When to define as 'Not applicable'?
When there are no visual elements to the component. 

#### How to test?
Verify that the [small and large breakpoints (internal link)](https://design.cms.gov/foundation/layout-grid/responsive-design/?theme=core "CMSDS breakpoints")in the Sketch symbols match the responsive components in code.

## Tokens

### Code
Tokens implemented in code. 

#### When to define as 'Not applicable'?
When there are no styles that tokens can be applied to.

#### How to test?
Look at the style rules for this component and check that token variables are used for the kinds of tokens we already have defined, like color, spacing, font size, etc.

### Design
Tokens implemented in the Sketch.

#### When to define as 'Not applicable'?
When there are no styles that tokens can be applied to.

#### How to test?
Open Sketch and click through each element to view styles being used and make sure the styles are linked to tokens in the theme files.
