# RFC: Implementation of design tokens

**Date** : Nov 22, 2021
**Status** : Review

## Problem

Presently, the inconsistency of design rules between the DSM, Designers making and consuming changes, and the design system codebase lead to **confusion**, **duplicated work**, **inconsistency** and **disorganization** within all three systems.

## Proposal

[Design tokens](https://www.invisionapp.com/inside-design/design-tokens/) can help us solve this problem.

> Design tokens are all the values needed to construct and maintain a design system — spacing, color, typography, object styles, animation, etc. — represented as data. These can represent anything defined by design: a color as a RGB value, an opacity as a number, an animation ease as Bezier coordinates. They’re used in place of hard-coded values in order to ensure flexibility and unity across all product experiences. - [Adobe Spectrum](https://spectrum.adobe.com/page/design-tokens/)

Design tokens can be packaged from the atomic level to the application level by utilizing them in a dependency tree where one value inherits a value from the trunk above it.

A design token solution is needed in which:

1. The set of design tokens remain finite and equal
2. The set of design tokens maintain consistency between application (DSM, Sketch, React and other future platforms such as iOS, Android, Web Components)
3. The set of design tokens can be transposed, updated and extended easily and quickly across all systems at once
4. The set of design tokens can be versioned and changes in that system can be tracked and monitored

By deciding on a [Single Source Of Truth](https://en.wikipedia.org/wiki/Single_source_of_truth) (SSOT) for our design rules, we can organize and transform them for any system which utilizes them.

## Benefits

1. **Consistency** - Between design and code, utilizing a single set of variables everywhere allows a design proof to accurately describe the visual representation of a component as a set of variables. This provides better parity between what's designed and what is seen in the rendered usage on all platforms.

   Looking at the [CSSStats for healthcare.gov](https://cssstats.com/stats?url=healthcare.gov), there are currently 70 color variations, many of which are nearly identical. Utilizing design tokens could bring this number down considerably and provide better brand consistency.

2. **Organization** - By starting from the atomic level, we can use naming conventions for our tokens that are simple and specific to the variable they represent. By keeping these tokens separate from the systems they are utilized in, they can be managed as a discrete unit. Agreement on naming conventions of variables could eventually create parity between Sketch libraries and DS SASS variables.
3. **Interoperability** - Design tokens allow a huge amount of flexibility for moving a design system to a new platform. Should an iOS/Android app ever be built, a new web application created, etc.. That system would have a framework ready to utilize for its theming which would be consistent with the other brand applications.
4. **Opportunity for theming** - Decoupling design rules from the codebase allowing the transposition-ing of these static design decisions in various ways, i.e. theming/high contrast. By replacing all tokens in a system with new tokens you can essentially theme swap, assuming the consuming system is utilizing tokens at all levels appropriately.

## Risks

1. There is a small risk that implementing tokens could break many things at once, as many design rules would be referencing these across an application. With tools like storybook, visual regression and QA this would be a part of every applications standard testing procedure and should be easy to resolve.
2. There can be a reductive quality to design tokens in that there might be a more limited set of colors/spacing options/etc.. to work with for the consuming applications. Someone might have to sell consuming systems on the advantages to brand consistency, which they hopefully already understand.

## Scope/Outline

**An outline for how this process could proceed:**

1. The SSOT should be decided on, at the moment I see two options:

   1. **The DSM becomes the source of truth**. Designers and developers work together to consolidate the current set of design rules residing in the codebase/Sketch and place them into the DSM. In this case, with that work done, an application can be written in the design system to utilize the [DSM Token API](https://support.invisionapp.com/hc/en-us/articles/360049950931) to periodically update it's set of scss variables with data from these design tokens and store them in a new NPM package.
   2. **Tokens are modified directly as sets of JSON files**. Designers and developers work together to consolidate tokens in a hierarchy which makes the most sense for all platforms. These tokens could be stored in a new NPM package. Changes to tokens would require a pull request and have a release cadence.

2. Once the SSOT is determined, tokens should be created in the appropriate format and at minimum, populated to form a set required to serve the current consuming applications. Ongoing work could be ticketed to fill out the entire token library. Items which should be tokenized can be decided on by the teams. These first tokens would represent the most basic items such as spacing, color, type, breakpoints, animation, border.. i.e..

   ```
   tokens.git/core/colors.json
   {
   	"lightblue": {
   		"100": "rgb(207, 239, 252)",
   		"200": "rgb(113, 202, 243)",
   		"300": "rgb(43, 199, 252)",
   		"transparent": {
   			"50": "rgba(43, 199, 252, 50)",
   			"75": "rgba(43, 199, 252, 75)"
   		}
   	}
   }
   ```

   > The aliases design tokens are mapped to in the various consuming systems need not match up directly one another initially. The token is a standard atomic unit which can be referenced in many systems using many aliases but should be applied as high up in the dependency tree as possible.

3. When the first dataset is completed and ready for use, a tool stored in the NPM package would need to be created to convert these tokens into new formats, initially SASS. There are several existing tools which can do this such as [Style Dictionary](https://github.com/amzn/style-dictionary) (format is [easily utilized by the DSM](https://support.invisionapp.com/hc/en-us/articles/360049483032)), [Theo](https://github.com/salesforce-ux/theo), [JSON -> CSS](https://github.com/rlapoele/json-to-scss) and others.

   I believe the best option would be to write our own [Webpack Loader](https://webpack.js.org/contribute/writing-a-loader/) to convert these tokens to top level SASS files.

   1. In the case of the DS-Core, we would convert these tokens into variables which would be utilized by files in our /src/styles/settings/variables scss files and font.scss file initially. Since we would not be changing these files aside from referencing the token variable names in the tokens NPM package instead of providing hard coded values, the compiled output of these files should be compared to detect any breaking changes. Token variables would reside in scss files, checked into the token package. One advantage to using a custom webpack loader in our case is that we could do things like generate the list of @font-face includes based on what tokens are available, slimming overall DS package size.
   2. In the case of Sketch and the DSM, the tool chosen/created would be extended to output libraries for the DSM (if needed). Sketch and these libraries would also be versioned and live in the token package. These would be made available as release download libraries with which to work from. The [Sketch file format](https://developer.sketch.com/file-format/) is very easy to work with, as it is already made up of JSON files.

4. A Jenkins task for creating these releases would need to be created and tested for CI of changes to the tokens package.
5. Future work to structure similarities between component level variables in Sketch and the codebase would be ongoing from this point. These variables could be added and utilized on a component-by-component basis, and would make use of the highest level tokens for spacing, color, etc.. i.e.

   ```
   button-small-active-highlight-inverse-color (sketch)
   $button-small-active-highlight-inverse-color (scss)

   tokens.git/core/components/buttons.json
   {
   	"button": {
   		"small": {
   			"active": {
   				"highlight": {
   					"color": "ds.core.colors.lightblue.300"
   				}
   			}
   		}
   	}
   }
   ```

6. Documentation would need to be generated from the token build task. This could be another option in our existing site docs, filed under "Design Tokens." Component level variables could be included on the doc pages for each component.

### Other Notes

- There are several ways to transform values from one format to another. If we agree on standard units (px, rem, rgb) for each token type, we can utilize mixins to transform these values to other types dynamically. [A codepen example](https://codepen.io/jakob-e/pen/AHunv).
- There are many tickets currently in the backlog that would be resolved with this work automatically.

### Questions and Requested Feedback

1. What did I miss? Which steps do we forsee as the most troublesome to implement?
2. Is it realistic to consider restructuring our entire design system to utilize tokens over the next, 6 months? A year? Does my order of operations to complete this task seem logical?
