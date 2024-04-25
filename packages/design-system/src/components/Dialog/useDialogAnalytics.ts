import { DialogProps } from './Dialog';
import { eventExtensionText } from '../analytics';
import { config } from '../config';
import { useNativeDialogAnalytics } from '../NativeDialog/useNativeDialogAnalytics';

export function useDialogAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  isOpen,
}: DialogProps) {
  function sendDialogEvent(content: string | undefined, eventAttributes: { event_name: string }) {
    if (analytics !== true && (!config().dialogSendsAnalytics || analytics === false)) {
      return;
    }

    const eventHeadingText = analyticsLabelOverride ?? content;

    if (!eventHeadingText) {
      console.error('No content found for Dialog analytics event');
      return;
    }

    onAnalyticsEvent({
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
      });
    },
    onClose: (content?: string) => {
      sendDialogEvent(content, {
        event_name: 'modal_closed',
      });
    },
  });

  return headingRef;
}

export default useDialogAnalytics;
