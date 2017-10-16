> A sharable [stylelint](https://stylelint.io) config object that enforces the design system's CSS and Sass rules

## Installation

```
npm install @cmsgov/stylelint-config-design-system stylelint --save-dev
```

## Usage

Once installed, you can use it by specifying `@cmsgov/stylelint-config-design-system` in the [`extends`](https://stylelint.io/user-guide/configuration/#extends) section of your [Stylelint configuration](https://stylelint.io/user-guide/configuration).

```js
{
  extends: ["@cmsgov/stylelint-config-design-system"],
  rules: {
    // Additional, per-project rules...
  }
}
```

## Credits

Our stylelint rules are based on those in [`@18F/stylelint-rules`](https://github.com/18F/stylelint-rules) and [`stylelint-config-primer`](https://github.com/primer/stylelint-config-primer)