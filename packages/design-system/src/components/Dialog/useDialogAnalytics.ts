import { DialogProps } from './Dialog';
import { useAnalyticsContent, eventExtensionText } from '../analytics';
import { config } from '../config';

export function useDialogAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
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

  const [headingRef] = useAnalyticsContent({
    onMount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_impression',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendDialogEvent(content, {
        event_name: 'modal_closed',
      });
    },
  });

  return headingRef;
}

export default useDialogAnalytics;
