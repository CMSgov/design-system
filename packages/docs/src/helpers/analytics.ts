import { sendLinkEvent } from '@cmsgov/design-system';

export function sendSearchInitiatedEvent(searchTerm: string) {
  sendLinkEvent({
    event_name: 'search_initiated',
    search_term: searchTerm,
    search_term_type: 'user_initiated',
  } as any);
}

export function sendFilterAppliedEvent({
  filterCategoriesUsed,
  resultsCountAfterFiltering,
  resultsCountPriorToFiltering,
}: {
  filterCategoriesUsed: string[];
  resultsCountAfterFiltering?: number;
  resultsCountPriorToFiltering?: number;
}) {
  sendLinkEvent({
    event_name: 'filters_applied',
    filter_categories_used: filterCategoriesUsed.join(', '),
    results_count_after_filtering: resultsCountAfterFiltering || null,
    results_count_prior_to_filtering: resultsCountPriorToFiltering || null,
  } as any);
}
