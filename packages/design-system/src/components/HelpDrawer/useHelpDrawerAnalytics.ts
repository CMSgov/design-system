import { EventCategory, sendLinkEvent, useAnalyticsContent } from '../analytics';
import { HelpDrawerProps } from './HelpDrawer';
import { helpDrawerSendsAnalytics } from '../flags';

export default function useHelpDrawerAnalytics({
  analytics,
  analyticsLabelOverride,
}: HelpDrawerProps) {
  function sendHelpDrawerEvent(
    content: string | undefined,
    eventAttributes: { event_name: string; ga_eventAction: string }
  ) {
    if (!helpDrawerSendsAnalytics() || analytics === false) {
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
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_opened',
        ga_eventAction: 'opened help drawer',
      });
    },
    onUnmount: (content: string | undefined) => {
      sendHelpDrawerEvent(content, {
        event_name: 'help_drawer_closed',
        ga_eventAction: 'closed help drawer',
      });
    },
  });

  return headingRef;
}
