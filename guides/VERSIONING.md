# Versioning

The design system follows the [SemVer specification](http://semver.org/).

## Semantic Versioning

#### Patch release

Bug fixes and other minor changes: Increment the last number, e.g. `1.0.1`

Example changes:

- Backwards compatible Sass/JS bug fixes
- Tiny visual changes to make the UI more consistent

#### Minor release
Backwards compatible new functionality, newly deprecated APIs, or substantial new functionality/improvements to private code: Increment the middle number, e.g. `1.1.0`

Example changes:

- Addition of a new component
- New classes, global variables, mixins, functions, or deprecated code
- Minor visual changes to existing components

#### Major release

Changes which break backwards compatibility: Increment the first number, e.g. `2.0.0`

Example changes:

- Renamed or removed classes, mixins, functions, placeholders, or global variables.
- Major visual changes to existing components

## Auto-increment package versions

```
./scripts/prepublish.sh
```

This will prompt you to select the version bump type and update the versions in the `package.json` files in the repo.
