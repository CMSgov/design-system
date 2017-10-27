module.exports = {
  extends: [
    './packages/stylelint-config-design-system',
    'stylelint-config-prettier'
  ],
  ignoreFiles: [
    'packages/generator-cmsgov/*',
    'packages/support/src/vendor/**/*.scss'
  ]
};
