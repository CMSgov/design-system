import { DialogProps } from './Dialog';
import { EventCategory, sendLinkEvent, useAnalyticsContent } from '../analytics';
import { dialogSendsAnalytics } from '../flags';

export function useDialogAnalytics({ analytics, analyticsLabelOverride }: DialogProps) {
  function sendDialogEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; ga_eventAction: string }
  ) {
    if (!dialogSendsAnalytics() || analytics === false) {
      return;
    }

    const eventHeadingText = analyticsLabelOverride ?? content;

    if (!eventHeadingText) {
      console.error('No content found for Dialog analytics event');
      return;
    }

    sendLinkEvent({
      event_type: EventCategory.UI_INTERACTION,
      ga_eventCategory: EventCategory.UI_COMPONENTS,
      ga_eventLabel: eventHeadingText,
      heading: eventHeadingText,
      ...eventAttributes,
    });
  }

  const [headingRef] = useAnalyticsContent({
    componentName: 'Dialog',
    onMount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_impression',
        ga_eventAction: 'modal impression',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_closed',
        ga_eventAction: 'closed modal',
      });
    },
  });

  return headingRef;
}

export default useDialogAnalytics;
