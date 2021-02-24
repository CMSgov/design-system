// Functions for sending events to Google Analytics
// Based on HRA Tool & SEP screener & Coverage Tools analytics service:
// hra-tool/src/services/analytics.js
// screener/src/assets/js/utils/analytics-util.js
// coverage-tools-frontend/src/helpers/objectUtilities.ts

import { AnalyticsPayload } from '.';

export const EVENT_CATEGORY = {
  contentTools: 'content tools',
};

export const EVENT_ACTION = {
  helpDrawerOpen: 'opened help drawer',
  helpDrawerClose: 'closed help drawer',
};

/* eslint-disable camelcase */
interface AnalyticsEventProps {
  event_category: string;
  event_action: string;
  event_label: string;
  event_value: string;
  additional_props?: Record<string, unknown>;
}

export async function sendTealiumEvent(props: AnalyticsEventProps): Promise<string> {
  const { event_category, event_action, event_label, event_value = '', additional_props } = props;

  if (!window.utag) return '';

  const payload: AnalyticsPayload = {
    event_type: 'cmsds',
    event_category,
    event_action,
    event_label,
    event_value,
    additional_props,
  };

  window.utag.link(payload);

  return `Tealium event sent: ${event_category} - ${event_action} - ${event_label}`;
}
/* eslint-enable camelcase */
