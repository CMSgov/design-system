import { sendLinkEvent } from '@cmsgov/design-system';

function composeAnalyticsEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  return {
    event_name: `internal_link_clicked`,
    link_url: (event.target as HTMLAnchorElement).baseURI,
    link_type: 'link_other',
    parent_component_heading:
      (event.target as HTMLAnchorElement).parentElement.innerText ?? undefined,
    parent_component_type: (event.target as HTMLAnchorElement).parentElement.tagName ?? undefined,
    text: (event.target as HTMLAnchorElement).innerText,
  } as any;
}

function linkAnalytics(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  sendLinkEvent(composeAnalyticsEvent(event));
}

export default linkAnalytics;
