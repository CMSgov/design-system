declare global {
  interface Window {
    utag?: {
      link: (params: AnalyticsPayload) => void;
    };
  }
}

/* eslint-disable camelcase */
export interface AnalyticsPayload {
  event_type: 'cmsds';
  event_category: string;
  event_action: string;
  event_label: string;
  event_value: string;
  additional_props?: Record<string, unknown>;
}
/* eslint-enable camelcase */
