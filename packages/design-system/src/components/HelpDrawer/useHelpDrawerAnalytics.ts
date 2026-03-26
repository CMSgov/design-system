import { eventExtensionText } from '../analytics';
import { HelpDrawerProps } from './HelpDrawer';
import { config } from '../config';
import { t } from '../i18n';
import { useNativeDialogAnalytics } from '../NativeDialog/useNativeDialogAnalytics';

export default function useHelpDrawerAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  isOpen,
  triggerButtonText,
}: HelpDrawerProps) {
  function sendHelpDrawerEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; text?: string }
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
        text: triggerButtonText ?? t('drawer.triggerButtonText'),
      });
    },
    onClose: (content?: string) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_closed',
      });
    },
  });

  return headingRef;
}
