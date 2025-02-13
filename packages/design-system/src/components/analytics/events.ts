/**
 * Functions for sending events to Tealium/Google Analytics
 * Based on HRA Tool & SEP screener & Coverage Tools analytics service:
 * - hra-tool/src/services/analytics.js
 * - screener/src/assets/js/utils/analytics-util.js
 * - coverage-tools-frontend/src/helpers/objectUtilities.ts
 */

import { Language } from '../i18n';

export interface UtagObject {
  link: (params: AnalyticsEvent) => void;
  gdpr?: {
    showConsentPreferences: (lang: Language) => any;
  };
  view: (params: AnalyticsEvent) => void;
}

export interface UtagContainer {
  utag?: UtagObject;
}

export type UtagEventType = 'link' | 'view';

// This is the default event 'extension' for events arising from the DS
export const eventExtensionText = 'Design system integration';

export interface AnalyticsEvent {
  event_name: string;
  event_extension: string;
  [additional_props: string]: unknown;
}

export const MAX_STRING_LENGTH = 100;
/**
 * Clip all the string values to the MAX_STRING_LENGTH on an event object in place by mutation
 */
function clipStrings<T>(event: T): T {
  for (const key in event) {
    const value = event[key];
    if (typeof value === 'string') {
      event[key] = value.substring(0, MAX_STRING_LENGTH) as any;
    }
  }
  return event;
}

const MAX_RETRIES = 3;
const TIMEOUT = 300;

/**
 * Use existing window.utag.link function to send analytics events. If the function does not
 * exist right away, try again after TIMEOUT milliseconds until we've reached MAX_RETRIES.
 */
export function sendAnalytics(eventType: UtagEventType, event: AnalyticsEvent, retry = 0) {
  // If we were to define this on the window object using `declare global { interface Window { utag: ... } }`
  // that type definition of window.utag can conflict with downstream declarations. This happened before, and
  // our fix is to only have a local type so we can get some type-checking without risk of conflicts. This
  // feature of TypeScript is well intentioned (because if you're using globals, you want to make sure every
  // module agrees on what they are), but in reality this type definition could vary in trivial ways but
  // break a build.
  const utag = (window as any as UtagContainer).utag;

  if (utag && utag[eventType]) {
    clipStrings(event);
    try {
      utag[eventType](event);
    } catch (error) {
      console.warn('Error sending analytics event: ', error);
    }
  } else {
    if (++retry <= MAX_RETRIES) {
      setTimeout(() => sendAnalytics(eventType, event, retry), retry * TIMEOUT);
    }
  }
}

export function sendLinkEvent(event: AnalyticsEvent) {
  return sendAnalytics('link', event);
}

export function sendViewEvent(event: AnalyticsEvent) {
  return sendAnalytics('view', event);
}

export type AnalyticsFunction = typeof sendLinkEvent;
