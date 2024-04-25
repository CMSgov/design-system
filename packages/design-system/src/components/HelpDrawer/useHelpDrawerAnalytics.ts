import { EventCategory, EventType, useAnalyticsContent, eventExtensionText } from '../analytics';
import { HelpDrawerProps } from './HelpDrawer';
import { config } from '../config';
import { useNativeDialogAnalytics } from '../NativeDialog/useNativeDialogAnalytics';

export default function useHelpDrawerAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  isOpen,
}: HelpDrawerProps) {
  function sendHelpDrawerEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; event_action: string }
  ) {
    if (analytics !== true && (!config().helpDrawerSendsAnalytics || analytics === false)) {
      return;
    }

    const eventHeadingText = analyticsLabelOverride ?? content;

    if (!eventHeadingText) {
      console.error('No content found for Help Drawer analytics event');
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

  // We need to send help_drawer_opened when it's open once and only once.
  // We need to send help_drawer_closed only when it was open and then closed.
  const headingRef = useNativeDialogAnalytics({
    isOpen,
    onOpen: (content?: string) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_opened',
        event_action: 'opened help drawer',
      });
    },
    onClose: (content?: string) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_closed',
        event_action: 'closed help drawer',
      });
    },
  });

  return headingRef;
}
