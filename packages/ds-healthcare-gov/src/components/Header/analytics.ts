import { eventExtensionText } from '@cmsgov/design-system';
import { config } from '../config';

export function sendHeaderEvent(linkText: string, linkUrl?: string) {
  if (config().headerSendsAnalytics) {
    config().defaultAnalyticsFunction({
      event_name: 'header_click',
      category: 'consistent header',
      event_extension: eventExtensionText,
      text: linkText,
      ...(linkUrl ? { link_url: linkUrl } : {}),
    });
  }
}
