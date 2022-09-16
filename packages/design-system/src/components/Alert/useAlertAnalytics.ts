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

      // This is complicated but allows us to match the old behavior exactly
      // TODO: Remove it during a breaking change after warning stakeholders that
      // a11y labels will start to appear in the analytics content.
      const rawPropsContent = heading ?? children;
      const rawPropsContentString =
        typeof rawPropsContent === 'string' ? rawPropsContent : undefined;

      const eventHeadingText = analyticsLabelOverride ?? rawPropsContentString ?? content;
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
