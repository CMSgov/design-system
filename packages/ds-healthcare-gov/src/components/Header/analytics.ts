import { headerSendsAnalytics } from '../flags';
import { defaultAnalyticsFunction } from '@cmsgov/design-system';

export function sendHeaderEvent(linkText: string, linkUrl?: string) {
  if (headerSendsAnalytics()) {
    defaultAnalyticsFunction({
      event_name: 'header_click',
      event_type: 'ui interaction',
      category: 'consistent header',
      event_action: 'click',
      event_category: 'consistent header',
      event_label: linkText,
      text: linkText,
      ...(linkUrl ? { link_url: linkUrl } : {}),
    });
  }
}
