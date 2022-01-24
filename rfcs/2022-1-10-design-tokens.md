# RFC: Implementation of design tokens

**Date** : Jan 10, 2022
**Status** : Review

## Problem

Presently, the inconsistency of design rules between the DSM, Designers making and consuming changes, and the design system codebase lead to **confusion**, **duplicated work**, **inconsistency** and **disorganization** within all three systems.

- **Designers** should have an organized set of elements which standardize their process and add consistency to their production.
- **Stakeholders and Project Managers** could be better served when discussing visual changes if there were a library of standards for them to choose from when making decisions.
- **Developers** could eliminate confusion and the hacking together of solutions when presented with a visual change by utilizing the same set of elements as everyone else.

## Proposal

[Design tokens](https://www.invisionapp.com/inside-design/design-tokens/) can help us solve this problem.

> Design tokens are all the values needed to construct and maintain a design system — spacing, color, typography, object styles, animation, etc. — represented as data. These can represent anything defined by design: a color as a RGB value, an opacity as a number, an animation ease as Bezier coordinates. They’re used in place of hard-coded values in order to ensure flexibility and unity across all product experiences. - [Adobe Spectrum](https://spectrum.adobe.com/page/design-tokens/)

Design tokens can be codified in many ways using a variety of data storage formats. Since the CMSDS is implemented in Javascript/Typescript, we can utilize the modularity and type safety of Typescript to manage the current set of styles.

A design token solution is needed in which:

1. The set of design tokens remain finite and equal
2. The set of design tokens maintain consistency between application (DS Docs Site, Sketch, React and other future platforms such as new inherited design systems, or projects utilizing new technologies like Web Components)
3. The set of design tokens can be transposed, updated and extended easily and quickly across all systems at once
4. The set of design tokens can be versioned and changes in that system can be tracked and monitored

By deciding on a [Single Source Of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) (SSOT) for our design rules, we can organize and transform them for any system which utilizes them. The design tokens, stored in our codebase and transpilable to any format can be our source of truth for the CMSDS.

## Benefits

1. **Consistency** - Between design and code, utilizing a single set of variables everywhere allows a design proof to accurately describe the visual representation of a component as a set of variables. This provides better parity between what's designed and what is seen in the rendered usage on all platforms (Web, Mobile).

2. **Organization** - By organizing from the atomic level up, we can use naming conventions for our tokens that are simple and specific to the variable they represent. By keeping these tokens separate from the systems they are utilized in, they can be managed as a discrete unit. Agreement on naming conventions of variables could eventually create parity between Sketch libraries, DS Sass variables, and future design and development tooling.

3. **Interoperability** - Design tokens allow a huge amount of flexibility for both moving a design system to a new platform, or creating a new design system. Should an iOS/Android app ever be built, a new web application created, etc. that system would have a framework ready to utilize for its theming which would be consistent with the other brand applications.

4. **Opportunity for theming** - Decoupling design rules from the codebase allowing the transposition-ing of these static design decisions in various ways, i.e. theming/high contrast. By replacing all tokens in a system with new tokens you can essentially theme swap, assuming the consuming system is utilizing tokens at all levels appropriately.

## Risks

There are few to no risks involved in implementing a token system. Implementation would be incremental and with 1 to 1 testing of output against the current system.

## Scope/Outline

**An outline for how this process could be rolled out for our current system:**

1. A subset of the total token library along with helpers will be created in Typescript and will live in the CMSDS repository within the packages folder. The following tasks could be completed over the course of two development sprints. This subset will include:

   - The full set of colors used by each system represented in a typescript module.
   - Naming convention determined with collaboration with the design team.
   - Type definitions for colors and color format transform helper functions.
   - _Theme_ typescript modules defined for Core, Hc.goc and M.gov which define Sass variable outputs that map token values to the current color definitions
   - Build scripts which can be implemented in the current build process toolchain to compile these modules into Sass style variables to be imported into each package.
   - A set of tests scripts to validate data integrity and compare the variable output to the current variable settings to ensure data parity.

2. A build tool will be developed to export tokens from the token library to Sketch variables which can be imported by designers to ensure they are working with the correct set of values. If the choice to support other design tools ever occurs, a new export process would be architecturally easy to implement for almost any API. This could be done over the course of one development sprint.
 
3. Once this concept has been validated and released, work on other token types can progress with: measure, spacing, font, animation and other values, utilizing this toolkit. One set of tokens can be ported at a time, broken up into single-sprint long tasks.

4. A tool to generate documentation would be created from the token build task. This could be another option in our existing site docs, filed under "Design Tokens." Component level variables could be included on the doc pages for each component. This could be done over the course of two development sprints.

## Conclusion

Time spent now working on standardizing, implementing and tool-building for a future with design tokens will set up the CMSDS and _any other consumer of our design language_ with a set of standards that will ensure design consistency and workflow organization using nearly any tool-stack available now or for years to come.
