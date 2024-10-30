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

export const analyticsEventDocs = {
  'ds-analytics-event': {
    description:
      'This event is dispatched whenever the component emits an analytics event. Listening to this event will allow you to handle the analytics event yourself instead of relying on the `defaultAnalyticsFunction` defined in the design system config. [Read more about analytics.](https://design.cms.gov/components/analytics/)',
    eventObjectDescription:
      '`event.details.event` - The analytics event object being emitted.\n\n`event.preventDefault()` - Calling this prevents the `defaultAnalyticsFunction` from the [global config](https://design.cms.gov/components/config/) from being called.',
  },
};

export const alertAnalyticsEventDocs = {
  'ds-analytics-event': {
    description:
      'This event is dispatched whenever the component emits an analytics event. [Read more about analytics.](https://design.cms.gov/components/analytics/)',
    eventObjectDescription:
      '`event.details.event` - The analytics event object being emitted.\n\n`event.preventDefault()` - ⚠️ Note that the alert\'s impression event is emitted immediately upon render, so calling `preventDefault` within an event listener bound after first render will be too late to stop `defaultAnalyticsFunction` from being called. If you need to customize this event for a particular instance, please apply the `analytics="false"` attribute to your element and then emit the analytics event yourself.',
  },
};
