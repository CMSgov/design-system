import { sendLinkEvent } from '@cmsgov/design-system';

const noValue = 'no value available';

const composeButtonAnalytics = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): any => {
  return {
    event_name: 'button_engagement',
    button_style: 'default',
    button_type: 'default',
    link_type: 'link_other',
    parent_component_heading:
      (event.target as HTMLButtonElement).parentElement.innerText ?? noValue,
    parent_component_type: (event.target as HTMLButtonElement).parentElement.tagName ?? noValue,
    text: (event.target as HTMLButtonElement).innerText,
  } as any;
};

export function sendButtonAnalytics(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  sendLinkEvent(composeButtonAnalytics(event));
}

const composeNavigationOpenedAnalytics = (id: string): any => {
  const heading = id.split('/');
  const subNav = id.match(/\//);
  return {
    event_name: 'navigation_opened',
    navigation_type: 'main nav',
    heading: subNav ? heading[1] : heading[0],
  } as any;
};

export function sendNavigationOpenedAnalytics(id: string) {
  sendLinkEvent(composeNavigationOpenedAnalytics(id));
}

export function composeLinkAnalyticsEvent(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  return {
    event_name: `internal_link_clicked`,
    link_url: (event.target as HTMLAnchorElement).baseURI,
    link_type: 'link_other',
    parent_component_heading:
      (event.target as HTMLAnchorElement).parentElement.innerText ?? noValue,
    parent_component_type: (event.target as HTMLAnchorElement).parentElement.tagName ?? noValue,
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
