import { useAnalyticsContent, eventExtensionText } from '../analytics';
import { HelpDrawerProps } from './HelpDrawer';
import { config } from '../config';

export default function useHelpDrawerAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
}: HelpDrawerProps) {
  function sendHelpDrawerEvent(
    content: string | undefined,
    eventAttributes: { event_name: string }
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

  const [headingRef] = useAnalyticsContent({
    onMount: (content: string | undefined) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_opened',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_closed',
      });
    },
  });

  return headingRef;
}
