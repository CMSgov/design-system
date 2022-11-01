import {
  defaultAnalyticsFunction,
  EventCategory,
  EventType,
  useAnalyticsContent,
} from '../analytics';
import { HelpDrawerProps } from './HelpDrawer';
import { helpDrawerSendsAnalytics } from '../flags';

export default function useHelpDrawerAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = defaultAnalyticsFunction,
}: HelpDrawerProps) {
  function sendHelpDrawerEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; event_action: string }
  ) {
    if (!helpDrawerSendsAnalytics() || analytics === false) {
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
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_opened',
        event_action: 'opened help drawer',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_closed',
        event_action: 'closed help drawer',
      });
    },
  });

  return headingRef;
}
