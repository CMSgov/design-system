module.exports = {
  extends: [
    './packages/stylelint-config-design-system',
    'stylelint-config-prettier'
  ],
  ignoreFiles: [
    'packages/generator-cmsgov/*',
  ],
  rules: {
    // Prettier sometimes wraps !default to a new line
    'declaration-bang-space-before': null
  }
};
