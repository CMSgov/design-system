# Coding guidelines

Our coding guidelines are enforced by our linting process, which gets ran automatically when a pull request is created. You can also manually run the linter by running `yarn test`.

These should be treated as guides — rules can be modified according to project needs.

## Tooling

To make it easier to catch issues early, we suggest integrating linting tools into your IDE.

- Sublime Text
  - [SublimeLinter](http://www.sublimelinter.com)
  - [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)
  - [SublimeLinter-contrib-stylelint](https://github.com/kungfusheep/SublimeLinter-contrib-stylelint)

## CSS

The CSS coding guidelines for this project try to stay as consistent with [those used by 18F](https://github.com/18F/stylelint-rules). In some cases we've made the decision to be more strict than 18F, using some of [GitHub's stylelint guidelines](https://github.com/primer/stylelint-config-primer). You can [view a full list of stylelint rules here](https://stylelint.io/user-guide/rules).

## JavaScript

JavaScript coding guidelines are enforced using [Nava's ESLint ruleset](https://github.com/navahq/eslint-config-nava), which very closely resembles [StandardJS](http://standardjs.com/). You can [view a full list of ESLint rules here](http://eslint.org/docs/rules/).

### React

- Always use JSX syntax (don't use `React.createElement`)
- Use PascalCase for React component names, e.g. `ChoiceList`
- Use the `.jsx` extension and component name for filenames. E.g., `ChoiceList.jsx`
- When possible, use [stateless functional components](https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components). When that's not possible, extend [`React.PureComponent`](https://facebook.github.io/react/docs/react-api.html#react.purecomponent). When that's not possible, then extend [`React.Component`](https://facebook.github.io/react/docs/react-api.html#react.component)
- Build components that are safe to render server-side. This means components must be pure functions of their `props` and `state`, and you only have access to a subset of lifecycle methods:
  - `getInitialState()`
  - `getDefaultProps()`
  - `componentWillMount()`
  - `render()`
- Each component is exported twice, to support different ways developers might import it:
  - A named export. For example: `export function Button(props) {`
  - A default export. For example: `export default Button`
- Each component is exported from `components/index.js`
- Follow the conventions of HTML as much as possible when naming your component's props. If you have a boolean prop, its presence should mean true. This is the case in HTML with attributes like `selected`, `required`, and `checked`.
