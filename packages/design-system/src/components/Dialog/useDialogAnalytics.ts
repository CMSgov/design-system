import { DialogProps } from './Dialog';
import { EventCategory, EventType, useAnalyticsContent, eventExtensionText } from '../analytics';
import { config } from '../config';

export function useDialogAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
}: DialogProps) {
  function sendDialogEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; event_action: string }
  ) {
    if (analytics !== true && (!config().dialogSendsAnalytics || analytics === false)) {
      return;
    }

    const eventHeadingText = analyticsLabelOverride ?? content;

    if (!eventHeadingText) {
      console.error('No content found for Dialog analytics event');
      return;
    }

    onAnalyticsEvent({
      event_type: EventType.UI_INTERACTION,
      event_category: EventCategory.UI_COMPONENTS,
      event_label: eventHeadingText,
      event_extension: eventExtensionText,
      heading: eventHeadingText,
      ...eventAttributes,
    });
  }

  const [headingRef] = useAnalyticsContent({
    onMount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_impression',
        event_action: 'modal impression',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_closed',
        event_action: 'closed modal',
      });
    },
  });

  return headingRef;
}

export default useDialogAnalytics;
