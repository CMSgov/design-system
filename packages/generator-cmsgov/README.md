A Yeoman [generator](http://yeoman.io/) for automating the creation of a new design system component.

## Usage

### Run `yo cmsgov` and answer the prompts.

1. Enter a title (ie. Data Table) - A user-friendly title displayed in the documentation

1. Enter a component name - Used for filenames and React's displayName

   - This will take your title and create a default like this `(datatable)` which can be overridden.
   - Hit `Enter` to use the default.

1. Enter a slug - Used for the CSS class name and the documentation URL
   - This will take your title and create a default like this `(data-table)` which can be overridden.
   - Hit `Enter` to use the default.
1. Generate React files too? - this will create a .jsx starter file

   - Type `Y` or `n` and hit `Enter`.

1. Enter the package the component should be added to
   - The default is `(core)` which will place your new component in `core/src/components/`.
   - Hit `Enter` to use the default.
