/**
 * Functions for sending events to Tealium/Google Analytics
 * Based on HRA Tool & SEP screener & Coverage Tools analytics service:
 * - hra-tool/src/services/analytics.js
 * - screener/src/assets/js/utils/analytics-util.js
 * - coverage-tools-frontend/src/helpers/objectUtilities.ts
 */

 /* Extend the global Window interface to fix ts error TS2339 */
declare global {
  interface Window {
    utag?: {
      link: (params: AnalyticsPayload) => void;
    };
  }
}

/* eslint-disable camelcase */
export interface AnalyticsPayload {
  ga_eventType: 'cmsds';
  ga_eventCategory: string;
  ga_eventAction: string;
  ga_eventLabel: string;
  ga_eventValue: string;
  additional_props?: Record<string, unknown>;
}

export const EVENT_CATEGORY = {
  contentTools: 'content tools',
};

export const EVENT_ACTION = {
  helpDrawerOpen: 'opened help drawer',
  helpDrawerClose: 'closed help drawer',
};

interface AnalyticsEventProps {
  ga_eventCategory: string;
  ga_eventAction: string;
  ga_eventLabel: string;
  ga_eventValue: string;
  additional_props?: Record<string, unknown>;
}

export async function sendTealiumEvent(props: AnalyticsEventProps): Promise<string> {
  const {
    ga_eventCategory,
    ga_eventAction,
    ga_eventLabel,
    ga_eventValue = '',
    ...other_props
  } = props;

  console.log('event->', props);
  /**
   * If utag is not loaded on the page we don't want to track event
   */
  if (!window.utag) return '';

  const payload: AnalyticsPayload = {
    ga_eventType: 'cmsds',
    ga_eventCategory,
    ga_eventAction,
    ga_eventLabel,
    ga_eventValue,
    ...other_props,
  };
  
  console.log('send link->', payload);
  /**
   * Track links and events with the utag.link() function
   */
  window.utag.link(payload);

  return `Tealium event sent: ${ga_eventCategory} - ${ga_eventAction} - ${ga_eventLabel}`;
}
/* eslint-enable camelcase */
