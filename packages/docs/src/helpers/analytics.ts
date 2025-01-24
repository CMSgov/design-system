import { sendLinkEvent } from '@cmsgov/design-system';

export function sendSearchInitiatedEvent(searchTerm: string) {
  sendLinkEvent({
    event_name: 'search_initiated',
    search_term: searchTerm,
    search_term_type: 'user_initiated',
  } as any);
}
