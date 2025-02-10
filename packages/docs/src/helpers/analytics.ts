import { sendLinkEvent } from '@cmsgov/design-system';

const composeButtonAnalytics = (id: string, _collapsed: boolean) => {
  const isSideNav = Boolean(id.match(/\//));
  return {
    event_name: 'button_engagement',
    button_style: 'default',
    button_type: 'sidenav_dropdown',
    link_type: 'link_other',
    link_url: 'null',
    parent_component_heading: isSideNav ? id.split('/')[0] : 'null',
    parent_component_type: 'LI',
    text: isSideNav ? id.split('/')[1] : id.split('/')[0],
  } as any;
};

export function sendButtonAnalytics(id: string, _collapsed: boolean) {
  sendLinkEvent(composeButtonAnalytics(id, _collapsed));
}

export function composeLinkAnalyticsEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
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

export function linkAnalytics(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  sendLinkEvent(composeLinkAnalyticsEvent(event));
}

export function sendSearchInitiatedEvent(searchTerm: string) {
  sendLinkEvent({
    event_name: 'search_initiated',
    search_term: searchTerm,
    search_term_type: 'user_initiated',
  } as any);
}

export function sendFilterAppliedEvent({
  filterCategoriesUsedString,
}: {
  filterCategoriesUsedString: string;
}) {
  sendLinkEvent({
    event_name: 'filters_applied',
    filter_categories_used: filterCategoriesUsedString,
  } as any);
}
