import { DialogProps } from './Dialog';
import {
  EventCategory,
  EventType,
  eventExtensionText,
  getAnalyticsContentFromRefs,
} from '../analytics';
import { config } from '../config';
import { useEffect, useRef } from 'react';
import usePrevious from '../utilities/usePrevious';

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

  // We need to send modal_impression when it's open once and only once
  // And we need to send modal_closed only when it was open and then closed
  const headingRef = useRef();
  const prevIsOpen = usePrevious(isOpen);
  useEffect(() => {
    const content = getAnalyticsContentFromRefs([headingRef]);
    if (isOpen && isOpen !== prevIsOpen) {
      // It either started open or was closed and now is open
      sendDialogEvent(content, {
        event_name: 'modal_impression',
        event_action: 'modal impression',
      });
    } else if (!isOpen && prevIsOpen === true) {
      // Only trigger if it was previously open
      sendDialogEvent(content, {
        event_name: 'modal_closed',
        event_action: 'closed modal',
      });
    }
  }, [isOpen, prevIsOpen]);

  return headingRef;
}

export default useDialogAnalytics;
