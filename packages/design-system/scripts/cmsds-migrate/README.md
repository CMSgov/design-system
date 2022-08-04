# CMSDS-MIGRATE

A helper tool for codebase search and replace functions.
A bit more friendly than using unix command line tools.

## Configuration

- Stored in `design-system/scripts/cmsds-migrate/configs`
- Configuration files are ES6 modules that contain a single default export with the following keys:
  - description : A description of the config, what it will do, presented to user before changes occur
  - patterns : An array of glob patterns to search for, minimatch compatible
  - globbyConfig : A configuration object passed to globby, defaults provided, `optional`
  - expressions : An array of expression objects in the format `{ from: RegExp to: replacement }`
- Can be specified from the command line.

## Command Line Options

Use `yarn cmsds-migrate --help` for optional command line options. `cwd`, `ignore`, `file (config)`, `force` can be specified to override defaults.

## Additional notes

- `cmsds-migrate` will ignore minified files.

## Additional Documentation and Resources:

- https://regex101.com/
- https://github.com/sindresorhus/globby
- https://github.com/isaacs/minimatch#usage
- https://github.com/mrmlnc/fast-glob
