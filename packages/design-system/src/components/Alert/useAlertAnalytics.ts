import { EventCategory, sendLinkEvent, useAnalyticsContent } from '../analytics';
import { AlertProps } from './Alert';
import { alertSendsAnalytics } from '../flags';

export default function useAlertAnalytics({
  analytics,
  analyticsLabelOverride,
  children,
  heading,
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

      sendLinkEvent({
        event_name: 'alert_impression',
        event_type: EventCategory.UI_INTERACTION,
        ga_eventAction: 'alert impression',
        ga_eventCategory: EventCategory.UI_COMPONENTS,
        ga_eventLabel: eventHeadingText,
        heading: eventHeadingText,
        type: variation,
      });
    },
  });

  return { headingRef, bodyRef };
}
