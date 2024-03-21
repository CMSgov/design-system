
const substitutions = [
  ['display', '5xl'],
  ['title', '4xl'],
  ['h1', '3xl'],
  ['h2', '2xl'],
  ['h3', 'xl'],
  ['h4', 'lg'],
  ['h5', 'md'],
  ['h6', 'sm'],
  ['lead', 'md'],
  ['small', 'sm'],
];

export default {
  description:
    "Replaces older, semantic typography classes with their newer class equivalent. See https://design.cms.gov/migration-guides/agnostic-typography-classes/ for more details.",
  patterns: ['**/*'],
  globbyConfig: {
    ignore: ['**/cmsds-migrate/**/*'],
  },
  expressions: [
    {
      from: /ds-display/gi,
      to: 'ds-text-heading--5xl',
    },
    {
      from: /ds-title/gi,
      to: 'ds-text-heading--4xl',
    },
    {
      from: /ds-h1/gi,
      to: 'ds-text-heading--3xl',
    },
    {
      from: /ds-h2/gi,
      to: 'ds-text-heading--2xl',
    },
    {
      from: /ds-h3/gi,
      to: 'ds-text-heading--xl',
    },
    {
      from: /ds-h4/gi,
      to: 'ds-text-heading--lg',
    },
    {
      from: /ds-h5/gi,
      to: 'ds-text-heading--md',
    },
    {
      from: /ds-h6/gi,
      to: 'ds-text-heading--sm',
    },
    {
      from: /ds-text--lead/gi,
      to: 'ds-text-body--lg',
    },
    {
      // Only match when "ds-text" is the entire class name
      from: /ds-text([^-])/gi,
      to: 'ds-text-body--md$1',
    },
    // Font size utilities
    ...substitutions.map(([from, to]) => ({
      from: new RegExp(`ds-u-font-size--${from}`, 'gi'),
      to: `ds-u-font-size--${to}`,
    })),
    // Responsive font size utilities
    ...substitutions.map(([from, to]) => ({
      from: new RegExp(`ds-u-sm-font-size--${from}`, 'gi'),
      to: `ds-u-sm-font-size--${to}`,
    })),
    ...substitutions.map(([from, to]) => ({
      from: new RegExp(`ds-u-md-font-size--${from}`, 'gi'),
      to: `ds-u-md-font-size--${to}`,
    })),
    ...substitutions.map(([from, to]) => ({
      from: new RegExp(`ds-u-lg-font-size--${from}`, 'gi'),
      to: `ds-u-lg-font-size--${to}`,
    })),
    ...substitutions.map(([from, to]) => ({
      from: new RegExp(`ds-u-xl-font-size--${from}`, 'gi'),
      to: `ds-u-xl-font-size--${to}`,
    })),
  ],
};
