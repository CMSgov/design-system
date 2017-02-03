# Installation

_TODO: Publish to NPM, then add install instructions._

# Local development

To contribute to this package locally, you can symlink the package into a project directory by running the following commands:

1. Within the package directory, run: `npm link`
1. Within the project directory where you want to use this package, run `npm link hcgov-pattern-library`

## Build process

#### Watch and build on changes:

```
npm run watch
```

#### Build all the things:

```
npm run build
```

## Dev notes

- Follow the naming conventions of [USWDS](https://github.com/18F/web-design-standards) as closely as possible. This would allow us to use our own React components, but switch over to their CSS if we wanted to do this down the road.