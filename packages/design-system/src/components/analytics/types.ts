import type { AnalyticsFunction } from './events';

export interface AnalyticsOverrideProps {
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to
   * disable tracking for this component instance.
   *
   * [Read more about analytics.](https://design.cms.gov/components/analytics/)
   */
  analytics?: boolean;
  /**
   * An override for the dynamic content sent to analytics services. By default this
   * content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**,
   * use this prop to override what is sent to analytics.
   *
   * [Read more about analytics.](https://design.cms.gov/components/analytics/)
   */
  analyticsLabelOverride?: string;
  /**
   * If you need the `event_type` to be overridden for your use case, you can provide
   * an alternate string here. Suggested values can be found in the EventType enum.
   * @deprecated The event_type is no longer an analytics dimension being tracked.
   */
  analyticsEventTypeOverride?: string;
  /**
   * Optional callback that will intercept analytics events for this component.
   * If none is specified, the design system will use the default analytics
   * function, which can be overwritten globally with the `defaultAnalyticsFunction`
   * config property.
   *
   * [Read more about analytics.](https://design.cms.gov/components/analytics/)
   */
  onAnalyticsEvent?: AnalyticsFunction;
}

export interface AnalyticsParentDataProps {
  /**
   * If needed for analytics, pass heading text of parent component of button.
   *
   * [Read more about analytics.](https://design.cms.gov/components/analytics/)
   */
  analyticsParentHeading?: string;
  /**
   * If needed for analytics, pass type of parent component of button.
   *
   * [Read more about analytics.](https://design.cms.gov/components/analytics/)
   */
  analyticsParentType?: string;
}
