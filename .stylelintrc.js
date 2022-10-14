module.exports = {
  customSyntax: 'postcss-scss',
  defaultSeverity: 'error',
  extends: 'stylelint-config-recommended',
  ignoreFiles: [
    '**/dist/**',
    '**/helpers/**',
    '**/__tests__/**',
    'tmp/**',
    '**/types/**',
    '**/styles/utilities/**',
    '**/docs/public/**',
    '**/docs/static/**',
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  reportDescriptionlessDisables: true,
  reportNeedlessDisables: true,
  reportInvalidScopeDisables: true,
  rules: {
    'order/order': ['custom-properties', 'declarations', 'rules'],
    'no-invalid-position-at-import-rule': null,
    'no-descending-specificity': null,
    'declaration-no-important': [
      true,
      {
        severity: 'warning',
      },
    ],
    'at-rule-no-unknown': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['percentage', 'calc', 'math.div'],
      },
    ],
    'selector-pseudo-class-case': 'lower',
    'order/properties-alphabetical-order': true,
    'no-empty-first-line': true,
    linebreaks: 'unix',
    'at-rule-allowed-list': [
      ['function', 'if', 'use', 'media', 'font-face', 'import', 'extend'],
      {
        severity: 'warning',
      },
    ],
    'function-max-empty-lines': 0,
    'scss/dollar-variable-no-missing-interpolation': true,
    'scss/selector-no-redundant-nesting-selector': true,
  },
};
