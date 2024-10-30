import { analyticsOverrideAttrs, analyticsParentDataAttrs } from './analytics';
import { ArgTypes } from '@storybook/react';

type ArgTypesFromAttributes<Attributes extends readonly string[]> = ArgTypes<{
  [K in Attributes[number]]: any;
}>;

// Descriptions come from the `AnalyticsOverrideProps` type
export const analyticsOverrideArgTypes: ArgTypesFromAttributes<typeof analyticsOverrideAttrs> = {
  analytics: {
    description:
      'Analytics events tracking is enabled by default. Set this value to `false` to disable tracking for this component instance. [Read more about analytics.](https://design.cms.gov/components/analytics/)',
    control: 'boolean',
  },
  'analytics-label-override': {
    description:
      'Optional callback that will intercept analytics events for this component. If none is specified, the design system will use the default analytics function, which can be overwritten globally with the `defaultAnalyticsFunction` config property. [Read more about analytics.](https://design.cms.gov/components/analytics/)',
    control: 'text',
  },
};

export const analyticsParentDataArgTypes: ArgTypesFromAttributes<typeof analyticsParentDataAttrs> =
  {
    'analytics-parent-heading': {
      description:
        'If needed for analytics, pass heading text of parent component of button. [Read more about analytics.](https://design.cms.gov/components/analytics/)',
      control: 'text',
    },
    'analytics-parent-type': {
      description:
        'If needed for analytics, pass type of parent component of button. [Read more about analytics.](https://design.cms.gov/components/analytics/) ',
      control: 'text',
    },
  };
