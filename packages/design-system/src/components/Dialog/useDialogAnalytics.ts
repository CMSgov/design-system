import { DialogProps } from './Dialog';
import {
  defaultAnalyticsFunction,
  EventCategory,
  EventType,
  useAnalyticsContent,
} from '../analytics';
import { dialogSendsAnalytics } from '../flags';

export function useDialogAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = defaultAnalyticsFunction,
}: DialogProps) {
  function sendDialogEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; event_action: string }
  ) {
    if (!dialogSendsAnalytics() || analytics === false) {
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
      heading: eventHeadingText,
      ...eventAttributes,
    });
  }

  const [headingRef] = useAnalyticsContent({
    componentName: 'Dialog',
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
