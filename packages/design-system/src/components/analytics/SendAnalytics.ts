import merge from 'lodash/merge';
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
  ga_eventAction: string;
  ga_eventCategory: string;
  ga_eventLabel: string;
  ga_eventType: string;
  ga_eventValue: string;
  [additional_props: string]: unknown;
}

export const EVENT_CATEGORY = {
  contentTools: 'content tools',
  uiComponents: 'ui components',
  uiInteraction: 'ui interaction',
};

export const MAX_LENGTH = 100;

interface AnalyticsEventProps {
  ga_eventAction: string;
  ga_eventCategory: string;
  ga_eventLabel: string;
  ga_eventType?: string;
  ga_eventValue?: string;
  [additional_props: string]: unknown;
}

export function sendAnalytics(event: EventType, props: AnalyticsPayload, retry = 0): string {
  if (window.utag && window.utag[event]) {
    try {
      window.utag[event](props);
      return `Tealium event sent: ${props.ga_eventCategory} - ${props.ga_eventAction} - ${props.ga_eventLabel}`;
    } catch (e) {
      return `Error sending event to Tealium ${e}`;
    }
  } else {
    if (++retry <= MAX_RETRIES) {
      setTimeout(() => sendAnalytics(event, props, retry), retry * TIMEOUT);
    } else {
      return `Tealium event max retries reached`;
    }
  }
}

export function sendAnalyticsEvent(
  overrides: boolean | Record<string, unknown>,
  defaultPayload: AnalyticsEventProps
): string {
  const analyticsDisabled = overrides === false;
  if (window.utag && !analyticsDisabled) {
    const mergedPayload = merge(defaultPayload, overrides);
    const {
      ga_eventAction,
      ga_eventCategory,
      ga_eventLabel,
      ga_eventType = 'cmsds', // default value
      ga_eventValue = '', // default value
      ...other_props
    } = mergedPayload;
    const payload: AnalyticsPayload = {
      ga_eventAction,
      ga_eventCategory,
      ga_eventLabel,
      ga_eventType,
      ga_eventValue,
      ...other_props,
    };
    return sendAnalytics('link', payload);
  } else {
    return '';
  }
}
/* eslint-enable camelcase */

export default sendAnalytics;
