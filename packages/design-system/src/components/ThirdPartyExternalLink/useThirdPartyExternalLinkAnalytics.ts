import { ThirdPartyExternalLinkProps } from './ThirdPartyExternalLink';
import { eventExtensionText, getAnalyticsContentFromRefs } from '../analytics';
import { config } from '../config';
import { useRef } from 'react';

export function useThirdPartyExternalLinkAnalytics({
  analytics,
  analyticsLabelOverride,
  analyticsParentHeading,
  analyticsParentType,
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

    const linkParentHeading = analyticsParentHeading ?? ' ';
    const linkParentType = analyticsParentType ?? ' ';

    onAnalyticsEvent({
      event_name: 'external_link_click',
      event_extension: eventExtensionText,
      text: linkContent,
      link_type: 'link_external',
      link_url: href,
      parent_component_heading: linkParentHeading,
      parent_component_type: linkParentType,
    });
  }

  return { contentRef, clickHandler };
}

export default useThirdPartyExternalLinkAnalytics;
