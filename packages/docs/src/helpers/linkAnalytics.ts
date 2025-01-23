import { sendLinkEvent } from '@cmsgov/design-system';

type LinkType = 'internal' | 'external';

function composeAnalyticsEvent(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  type: LinkType
) {
  return {
    event_name: `${type}_link_clicked`,
    link_url: (event.target as HTMLAnchorElement).baseURI,
    link_type: 'link_other',
    parent_component_heading:
      (event.target as HTMLAnchorElement).parentElement.innerText ?? undefined,
    parent_component_type: (event.target as HTMLAnchorElement).parentElement.tagName ?? undefined,
    text: (event.target as HTMLAnchorElement).innerText,
  } as any;
}

function linkAnalytics(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  type: LinkType = 'internal'
) {
  sendLinkEvent(composeAnalyticsEvent(event, type));
}

export default linkAnalytics;
