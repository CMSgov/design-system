# CMSDS Design Tokens

These folders contain all that is needed to generate and utilize the CMSDS Design Token Library.

Folder structure is as follows:

    ├── dist                            -- files exported during token build process
    ├── sketch/cmsds-token-importer     -- sketch plugin directory
    │   ├── sketchtool                  -- command line tool for sketch plugins
    │   └── src
    │       ├── json-token-importer.js  -- sketch token importer plugin code
    │       └── manifest.json           -- commands for plugin dropdown
    └── src
        ├── index.ts                    -- command line functionality
        ├── copy_themes.sh              -- shell script to copy themes to child systems
        ├── lib                         -- token exporters, utilities
        ├── themes                      -- themes & component themes organized by brand name
        └── tokens                      -- tokens by type

## How to use

    `yarn install`
    `yarn build inputType outputType`

    inputTypes: `tokens` (all tokens), `themes` (all themes)
    outputTypes: `csv` (comma separated values), `json` (for sketch import or general use), `css-vars` (CSS custom properties, plus required SCSS variables)

    `yarn clean` - clean dist directory
    `yarn dist` - copy themes from dist directory to appropriate settings folder for child systems

## CMSDS Theming

Themes for each brand are stored under `src/themes`. Themes are broken up into two files, the component theme variables and the main theme file. The component theme inherits the main theme file and uses it's variables for defining component-level visual settings. To create a new brand, copy the `core.ts` and `core-components.ts` files to new `brand.ts, brand-components.ts` files and modify as needed.

After creating a new theme, you will need to update the `/src/copy_themes.sh` file, which runs during the main DS build process, to distribute the new themes to the appropriate folder.

## Sketch

The sketch plugin should generally only be used by the design team to import tokens into the main CMSDS libraries when libraries change. Instructions for use of the plugin are in the [cmsds-sketch-plugin](./sketch/cmsds-token-importer/README.md) folder.
