# cmsds-token-importer

The cmsds-token-importer plugin updates a Sketch document's 'components' page with the design tokens for a given CMSDS theme.

## Installation

To install the plugin, simply double click on the `cmsds-token-importer.sketchplugin` file. So long as you have Sketch installed on your computer it will install the plugin for you automatically.

## Usage

The plugin will appear under the Plugins menu and can be used to change themes by updating our color tokens. If a token theme is chosen, layer styles and font styles will also be updated based on the component level definitions.

## Development

When you update files in the `src` folder, you need to build again to update the plugin. You do not have to reinstall the plugin. Sketch should automatically update it, even if you have Sketch running. You just need to rebuild with the following command:

```
yarn build
```

Make sure you've done a `yarn install` first, though.

### Debugging

There's a log file generated in `~/Library/Logs/com.bohemiancoding.sketch3` that can be opened with macOS's Console app if you want to be able to see the console or error output of sketch plugin code.
