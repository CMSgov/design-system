module.exports = {
  extends: '@cmsgov/stylelint-config-design-system',
  rules: {
    /**
     * Class naming pattern for the core design system
     * ~~~~~~~~~~~~~~~~~~~~
     * Names:    ds-
     * Prefixes: l- c- u-
     * Pattern:  [NAMESPACE]-[PREFIX]-[BLOCK]__[ELEMENT]--[MODIFIER]
     * Examples: .ds-c-button--primary, .ds-c-card__title, .ds-u-text-underlined
     */
    'selector-class-pattern': /^(ds-)(l|c|u|)(-[a-z0-9]+)((--?|__)[a-z0-9]+)*$/,
  },
};
