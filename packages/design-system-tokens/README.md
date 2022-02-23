# CMSDS Design Tokens

These folders contain all that is needed to generate and utilize the CMSDS Design Token Library.

Folder structure is as follows:

    ├── README.md                       -- this file
    ├── dist                            -- exported file directory
    ├── package.json                    -- npm dependencies
    ├── sketch                          -- sketch plugin directory
    ├── src
    │   ├── index.ts                    -- command line functionality
    │   ├── lib
    │   │   ├── exportScss.tsr          -- sass (scss) file exporter
    │   │   ├── types.ts                -- typescript type definitions
    │   │   └── utility.ts              -- helper functions
    │   ├── themes
    │   │   └── core                    -- themes organized by package name
    │   │       └── defaultTheme.ts     -- package default theme
    │   └── tokens
    │       ├── color.ts                -- color tokens
    │       ├── index.ts                -- all token exports
    │       └── spacing.ts              -- spacing tokens
    └── tsconfig.json                   -- typescript configuration

## How to use

    yarn install
    yarn build inputType outputType

    inputTypes: tokens (all tokens), themes (all themes)
    outputTypes: scss (Sass), csv (comma separated values), json (for sketch import or general use)

## Sketch Utilization

A plugin will be made availiable here for Sketch to import token data in the coming weeks.
