import { DialogProps } from './Dialog';
import { EventCategory, EventType, eventExtensionText } from '../analytics';
import { config } from '../config';
import { useNativeDialogAnalytics } from '../NativeDialog/useNativeDialogAnalytics';

export function useDialogAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  isOpen,
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

  // We need to send modal_impression when it's open once and only once.
  // We need to send modal_closed only when it was open and then closed.
  const headingRef = useNativeDialogAnalytics({
    isOpen,
    onOpen: (content?: string) => {
      sendDialogEvent(content, {
        event_name: 'modal_impression',
        event_action: 'modal impression',
      });
    },
    onClose: (content?: string) => {
      sendDialogEvent(content, {
        event_name: 'modal_closed',
        event_action: 'closed modal',
      });
    },
  });

  return headingRef;
}

export default useDialogAnalytics;
