import { ThirdPartyExternalLinkProps } from './ThirdPartyExternalLink';
import { getAnalyticsContentFromRefs } from '../analytics';
import { config } from '../config';
import { useRef } from 'react';

export function useThirdPartyExternalLinkAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  href,
}: ThirdPartyExternalLinkProps) {
  const contentRef = useRef<HTMLAnchorElement>();

  function clickHandler() {
    if (
      analytics !== true &&
      (!config().thirdPartyExternalLinkSendsAnalytics || analytics === false)
    ) {
      return;
    }

    const linkContent = analyticsLabelOverride ?? getAnalyticsContentFromRefs([contentRef]);
    if (!linkContent) {
      console.error('No content found for Dialog analytics event');
      return;
    }

    onAnalyticsEvent({
      event_name: 'external_link_click',
      text: linkContent,
      link_type: 'link_external',
      link_url: href,
      // TODO: Do we actually need to collect this info from app devs?
      // "parent_component_heading": <<parent component heading, if applicable>>,
      // "parent_component_type":

      // TODO: What about these properties that were required for other events?
      // event_name: 'external_link_click',
      // event_category: EventCategory.UI_COMPONENTS,
      // event_label: eventHeadingText,
      // event_extension: eventExtensionText,
    });
  }

  return { contentRef, clickHandler };
}

export default useThirdPartyExternalLinkAnalytics;
