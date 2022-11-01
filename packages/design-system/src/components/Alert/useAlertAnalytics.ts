import {
  defaultAnalyticsFunction,
  EventCategory,
  EventType,
  useAnalyticsContent,
} from '../analytics';
import { AlertProps } from './Alert';
import { alertSendsAnalytics } from '../flags';

export default function useAlertAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = defaultAnalyticsFunction,
  variation,
}: AlertProps) {
  // Order matters! Content comes from the heading first and falls back to body if heading doesn't exist
  const [headingRef, bodyRef] = useAnalyticsContent({
    componentName: 'Alert',
    onMount: (content: string | undefined) => {
      if (!alertSendsAnalytics() || analytics === false) {
        return;
      }

      // Do not send analytics event for default alerts
      if (!variation) {
        return;
      }

      const eventHeadingText = analyticsLabelOverride ?? content;
      if (!eventHeadingText) {
        console.error('No content found for Dialog analytics event');
        return;
      }

      onAnalyticsEvent({
        event_name: 'alert_impression',
        event_type: EventType.UI_INTERACTION,
        event_action: 'alert impression',
        event_category: EventCategory.UI_COMPONENTS,
        event_label: eventHeadingText,
        heading: eventHeadingText,
        type: variation,
      });
    },
  });

  return { headingRef, bodyRef };
}
