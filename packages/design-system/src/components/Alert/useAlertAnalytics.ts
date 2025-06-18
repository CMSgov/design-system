import { useAnalyticsContent, eventExtensionText } from '../analytics';
import { AlertProps } from './Alert';
import { config } from '../config';

export default function useAlertAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  variation,
}: AlertProps) {
  // Order matters! Content comes from the heading first and falls back to body if heading doesn't exist
  const [headingRef, bodyRef] = useAnalyticsContent({
    onMount: (content: string | undefined) => {
      if (analytics !== true && (!config().alertSendsAnalytics || analytics === false)) {
        return;
      }

      const eventHeadingText = analyticsLabelOverride ?? content;
      if (!eventHeadingText) {
        console.error('No content found for Alert analytics event');
        return;
      }

      onAnalyticsEvent({
        event_name: 'alert_impression',
        event_extension: eventExtensionText,
        heading: eventHeadingText,
        type: variation ?? 'informational',
      });
    },
  });

  return { headingRef, bodyRef };
}
