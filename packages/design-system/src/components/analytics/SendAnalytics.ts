/**
 * Functions for sending events to Tealium/Google Analytics
 * Based on HRA Tool & SEP screener & Coverage Tools analytics service:
 * - hra-tool/src/services/analytics.js
 * - screener/src/assets/js/utils/analytics-util.js
 * - coverage-tools-frontend/src/helpers/objectUtilities.ts
 */

export interface UtagObject {
  link: (params: AnalyticsEvent) => void;
}

export interface UtagContainer {
  utag?: UtagObject;
}

export type EventType = 'link';

export const MAX_LENGTH = 100;

export const EVENT_CATEGORY = {
  contentTools: 'content tools',
  uiComponents: 'ui components',
  uiInteraction: 'ui interaction',
};

/* eslint-disable camelcase */
export interface AnalyticsEvent {
  ga_eventAction: string;
  ga_eventCategory: string;
  ga_eventLabel: string;
  ga_eventType?: string;
  ga_eventValue?: string;
  [additional_props: string]: unknown;
}

const MAX_RETRIES = 3;
const TIMEOUT = 300;

export function sendAnalytics(
  eventType: EventType,
  event: Required<AnalyticsEvent>,
  retry = 0
): string {
  // If we were to define this on the window object using `declare global { interface Window { utag: ... } }`
  // that type definition of window.utag can conflict with downstream declarations. This happened before, and
  // our fix is to only have a local type so we can get some type-checking without risk of conflicts. This
  // feature of TypeScript is well intentioned (because if you're using globals, you want to make sure every
  // module agrees on what they are), but in reality this type definition could vary in trivial ways but
  // break a build.
  const utag = ((window as any) as UtagContainer).utag;

  if (utag && utag[eventType]) {
    try {
      utag[eventType](event);
      return `Tealium event sent: ${event.ga_eventCategory} - ${event.ga_eventAction} - ${event.ga_eventLabel}`;
    } catch (e) {
      return `Error sending event to Tealium ${e}`;
    }
  } else {
    if (++retry <= MAX_RETRIES) {
      setTimeout(() => sendAnalytics(eventType, event, retry), retry * TIMEOUT);
    } else {
      return `Tealium event max retries reached`;
    }
  }
}

export function sendLinkEvent(payload: AnalyticsEvent) {
  return sendAnalytics('link', {
    ga_eventType: 'cmsds', // default value
    ga_eventValue: '', // default value
    ...payload,
  });
}
/* eslint-enable camelcase */

export default sendAnalytics;
