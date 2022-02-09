# CMSDS Design Tokens

These folders contain all that is needed to generate and utilize the CMSDS Design Token Library.

Folder structure is as follows:

    ├── README.md                       -- this file
    ├── dist                            -- exported file directory
    ├── package.json                    -- npm dependencies
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
    outputTypes: scss (Sass)

As future exporters are added they will be listed in this document. Currently planned are options
to export W3C developing token standard JSON, CSV and YAML.

## Sketch Utilization

A plugin will be made availiable here for Sketch to import token data in the coming weeks.
