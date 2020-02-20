module.exports = {
  extends: [
    './packages/stylelint-config-design-system',
    'stylelint-config-prettier'
  ],
  ignoreFiles: [],
  rules: {
    // Prettier sometimes wraps !default to a new line
    'declaration-bang-space-before': null
  }
};
