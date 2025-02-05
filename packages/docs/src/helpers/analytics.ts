import { sendLinkEvent } from '@cmsgov/design-system';

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
