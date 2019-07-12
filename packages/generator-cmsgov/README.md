A Yeoman [generator](http://yeoman.io/) for automating the creation of a new design system component.

## Usage

### Run `yo cmsgov` and answer the prompts.
  - Enter a title (ie. Data Table) - A user-friendly title displayed in the documentation
  - Component name - Used for filenames and React's displayName
    - This will take your title and create a default like this `(datatable)` which can be overridden.
    - Hit `Enter` to use the default.
  - Slug - Used for CSS class name and slug in the documentation URL
    - This will take your title and create a default like this `(data-table)` which can be overridden.
    - Hit `Enter` to use the default.
  - Generate React files too?
    - Type `Y` or `n` and hit `Enter`.
  - Package
    - The default is `(core)` which will place your new component in `core/src/components/`.
    - Hit `Enter` to use the default.
