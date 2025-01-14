# CMSDS Design Tokens

This package is the source of truth for design tokens and contains scripts for exporting to useful formats and syncing with design tools.

This package is a dependency for most of the other packages in this repository, which expect to be able to reference CSS and SCSS files from this package's `dist` directory. In order for those packages to work correctly and be up-to-date, this package needs to be "built" using the build script.

We also sync our tokens with Figma so they can be used in designs across all CMS brands. Figma's multi-mode variable system allows us to define theme variants for each of our theme-level tokens and use them in a single, shared design library. Our design team can also update the tokens within Figma and sync them back to this code repository because Figma's variable tables are actually a really nice visual way of editing the tokens.

Folder structure is as follows:

    ├── dist       -- files exported during token build process
    └── src
        ├── css    -- scripts for exporting to CSS/SCSS
        ├── figma  -- scripts for exporting to and importing from Figma
        ├── lib    -- code shared between scripts
        └── tokens -- token files for both system- and theme-level tokens

## Scripts

- `npm run build`
  - Builds files that our other packages rely on, namely the CSS and SCSS files generated from our tokens
- `npm run clean`
  - Cleans out the build (`dist`) folder
- `npm run sync:to-figma` and `npm run sync:from-figma`
  - Connects to Figma's API to export our local tokens into Figma variables or updates our local tokens from Figma variables
  - Requires `PERSONAL_ACCESS_TOKEN` and `FILE_KEY` environment variables to be defined, which can go in a `.env` file at the root of this package directory. The `FILE_KEY` refers to the Figma file we're syncing to (the library file). For a quick start, copy the `.env.example` to `.env` and replace `YOUR_FIGMA_PERSONAL_ACCESS_TOKEN`.

## Token structure

There are _three_ main tiers for our design tokens organized into _two_ general buckets:

1. System-level tokens
2. Theme-level tokens, which derive their values from system-level tokens
   1. Theme-wide semantic tokens, which can be applied to multiple component tokens
   2. Component tokens

### System tokens

System tokens can be thought of as the box of crayons that the whole system has to work with. They're standardized color families, spacing units, font information, etc.

### Theme tokens

Theme tokens apply to a specific brand or _theme_ and generally derive their values from system tokens. There are two categories for theme tokens. One is the set of high-level semantic tokens (which at the time of writing consists of colors and fonts), and the other is the component-specific tokens that deal with the most granular information like the background color of a particular type of button or the text color of a visited link. Semantic tokens can be applied to multiple component tokens and answer general questions like _what is the brand's primary color?_ Component tokens answer specific questions like _how is the brand's primary color applied?_
