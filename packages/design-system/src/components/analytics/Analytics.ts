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

type EventType = 'link';
const MAX_RETRIES = 3;
const TIMEOUT = 300;

/* eslint-disable camelcase */
export interface AnalyticsPayload {
  ga_eventType: string;
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
  ga_eventType: string;
  ga_eventCategory: string;
  ga_eventAction: string;
  ga_eventLabel: string;
  ga_eventValue: string;
  additional_props?: Record<string, unknown>;
}

function sendEvent(event: EventType, props: AnalyticsPayload, retry = 0): void {
  if (window.utag && window.utag[event]) {
    try {
      window.utag[event](props);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Error sending event to Tealium', e);
    }
  } else {
    if (++retry <= MAX_RETRIES) {
      setTimeout(() => sendEvent(event, props, retry), retry * TIMEOUT);
    } else {
      // eslint-disable-next-line no-console
      console.log('Tealium event max retries reached');
    }
  }
}

export function sendTealiumEvent(props: AnalyticsEventProps): void {
  /**
   * If utag is not loaded on the page we don't want to track event
   */
  if (!window.utag) return;

  const {
    ga_eventType = 'cmsds',
    ga_eventCategory,
    ga_eventAction,
    ga_eventLabel,
    ga_eventValue = '',
    ...other_props
  } = props;

  const payload: AnalyticsPayload = {
    ga_eventType,
    ga_eventCategory,
    ga_eventAction,
    ga_eventLabel,
    ga_eventValue,
    ...other_props,
  };

  sendEvent('link', payload);
}
/* eslint-enable camelcase */
