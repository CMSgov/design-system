# CMSDS Design Tokens

These folders contain all that is needed to generate and utilize the CMSDS Design Token Library.

Folder structure is as follows:

    ├── README.md                       -- this file
    ├── dist                            -- exported files
    ├── package.json                    -- yarn/npm dependencies
    ├── sketch/cmsds-token-importer     -- sketch plugin directory
    │   ├── README.md
    │   ├── assets
    │   │   └── icon.png                -- token plugin icon
    │   ├── package.json
    │   ├── sketch-assets
    │   │   └── icons.sketch            -- needed by plugin, not used
    │   ├── sketchtool                  -- command line tool for sketch plugins
    │   ├── src
    │   │   ├── json-token-importer.js  -- sketch token importer plugin code
    │   │   └── manifest.json           -- commands for plugin dropdown
    │   └── yarn.lock
    ├── src
    │   ├── index.ts                    -- command line functionality
    │   ├── copy_themes.sh              -- shell script to copy themes to child systems
    │   ├── lib
    │   │   ├── exportCsv.ts            -- CSV file exporter
    │   │   ├── exportJson.ts           -- JSON file exporter
    │   │   ├── exportScss.ts           -- Sass (scss) file exporter
    │   │   ├── types.ts                -- typescript type definitions
    │   │   └── utility.ts              -- helper functions
    │   ├── themes                      -- themes organized by package name
    │   │   ├── core
    │   │   │   └── defaultTheme.ts
    │   │   ├── healthcare
    │   │   │   └── defaultTheme.ts
    │   │   └── medicare
    │   │       └── defaultTheme.ts
    │   └── tokens                      -- tokens by type
    │       ├── animation.ts
    │       ├── color.ts
    │       ├── font.ts
    │       ├── index.ts
    │       ├── media.ts
    │       ├── radius.ts
    │       ├── spacer.ts
    │       ├── time.ts
    │       └── zIndex.ts
    └── tsconfig.json                   -- typescript configuration

## How to use

    `yarn install`
    `yarn build inputType outputType`

    inputTypes: `tokens` (all tokens), `themes` (all themes)
    outputTypes: `scss` (Sass), `csv` (comma separated values), `json` (for sketch import or general use)

    `yarn clean` - clean dist directory
    `yarn dist` - copy themes from dist directory to appropriate settings folder for child systems

## Sketch Utilization

    The sketch plugin should generally only be used by the design team to import tokens into
    the main CMSDS libraries when libraries change. Instructions for use of the plugin are
    in the [cmsds-sketch-plugin](./sketch/cmsds-token-importer/README.md) folder.
