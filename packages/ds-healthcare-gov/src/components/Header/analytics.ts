import { eventExtensionText } from '@cmsgov/design-system';
import { config } from '../config';

export function sendHeaderEvent(linkText: string, linkUrl?: string) {
  if (config().headerSendsAnalytics) {
    config().defaultAnalyticsFunction({
      event_name: 'header_click',
      event_type: 'ui interaction',
      category: 'consistent header',
      event_action: 'click',
      event_category: 'consistent header',
      event_label: linkText,
      event_extension: eventExtensionText,
      text: linkText,
      ...(linkUrl ? { link_url: linkUrl } : {}),
    });
  }
}
