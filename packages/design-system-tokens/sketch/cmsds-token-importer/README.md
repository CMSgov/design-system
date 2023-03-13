# cmsds-token-importer

The cmsds-token-importer plugin updates a sketch documents 'components' page with settings and variables from the CMSDS Design tokens library from either the main tokens.json (for all color variables) or from an individual themes json representation.

If a token theme is chosen, layer styles and font styles will also be updated based on the component level definitions.

## installation / usage

To install the plugin, simply double click on the `cmsds-token-importer.sketchplugin` file. So long as you have Sketch installed on your computer it will install the plugin for you automatically.

The plugin will appear under the Plugins menu option and can be used to select a JSON data file to import. **Note: The import will wipe out all current component styles in the current file** depending on the type. Theme files will overwrite all Color, Layer Style and Font Definition types and complete Token files will overwrite all current Color definitions.

This is the intended behavior as these styles are imported as Libraries by the CMSDS's primary Sketch UI toolkits, so each file that imports these tokens should really only include this content.

## building JSON files

1. Run `yarn install && yarn build` to create a new cmsds-token-importer.sketchplugin file.
2. Run `yarn build themes json` from the `packages/design-system-tokens/` folder
3. The JSON files will be placed in the `dist` folder under the `packages/design-system-tokens/` folder.
