import { eventExtensionText } from '@cmsgov/design-system';
import { config } from '../config';

export function sendFooterLinkEvent(linkText: string, linkUrl?: string, heading?: string) {
  if (config().footerSendsAnalytics) {
    config().defaultAnalyticsFunction({
      event_name: 'navigation_clicked',
      event_extension: eventExtensionText,
      navigation_type: 'footer',
      link_text: linkText,
      ...(linkUrl ? { link_url: linkUrl } : {}),
      ...(heading ? { heading } : {}),
    });
  }
}
