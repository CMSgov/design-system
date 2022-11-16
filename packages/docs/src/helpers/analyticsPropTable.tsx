export const analyticsPropTable = [
  {
    name: 'analytics',
    type: 'boolean',
    defaultValue: 'true',
    text: (
      <>
        Analytics events tracking is enabled by default. Set this value to <code>false</code> to
        disable tracking for this component instance.
      </>
    ),
    isRequired: false,
    id: 'a1',
  },
  {
    name: 'analyticsLabelOverride',
    type: 'string',
    defaultValue: 'Heading Content',
    text: (
      <>
        An override for the dynamic content sent to analytics services. By default this content
        comes from the heading. \n In cases where this component’s heading may contain{' '}
        <em>sensitive information</em>, use this prop to override what is sent to analytics.
      </>
    ),
    isRequired: false,
    id: 'a2',
  },
  {
    name: 'analyticsEventTypeOverride',
    type: 'string',
    defaultValue: '',
    text: (
      <>
        If you need the <code>event_type</code> to be overridden for your use case, you can provide
        an alternate string here. Suggested values can be found in the EventType enum.
      </>
    ),
    isRequired: false,
    id: 'a3',
  },
  {
    name: 'onAnalyticsEvent',
    type: '(event: AnalyticsEvent) => any',
    defaultValue: '',
    text: (
      <>
        Optional callback that will intercept analytics events for this component. If none is
        specified, the design system will use the default analytics function, which can be
        overwritten globally with <code>setDefaultAnalyticsFunction</code>.
      </>
    ),
    isRequired: false,
    id: 'a4',
  },
];

export default analyticsPropTable;
