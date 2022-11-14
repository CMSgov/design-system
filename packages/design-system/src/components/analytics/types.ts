import type { AnalyticsFunction } from './events';

export interface AnalyticsOverrideProps {
  /**
   * Analytics events tracking is enabled by default. Set this value to `false` to
   * disable tracking for this component instance.
   */
  analytics?: boolean;
  /**
   * An override for the dynamic content sent to analytics services. By default this
   * content comes from the heading.
   *
   * In cases where this component’s heading may contain **sensitive information**,
   * use this prop to override what is sent to analytics.
   */
  analyticsLabelOverride?: string;
  /**
   * If you need the `event_type` to be overridden for your use case, you can provide
   * an alternate string here. Suggested values can be found in the EventType enum.
   */
  analyticsEventTypeOverride?: string;
  /**
   * Optional callback that will intercept analytics events for this component.
   * If none is specified, the design system will use the default analytics
   * function, which can be overwritten globally with `setDefaultAnalyticsFunction`.
   */
  onAnalyticsEvent?: AnalyticsFunction;
}

export interface AnalyticsParentDataProps {
  /**
   * If needed for analytics, pass heading text of parent component of button.
   */
  analyticsParentHeading?: string;
  /**
   * If needed for analytics, pass type of parent component of button.
   */
  analyticsParentType?: string;
}
