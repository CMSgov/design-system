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

export enum EventCategory {
  // These are likely unrelated and will need to be separated
  UI_COMPONENTS = 'ui components',
  // TODO: Right now this is used as the category of the Button events, but it should
  // be consistent. After talking to the analytics team, we decided that it can be
  // changed after Open Enrollment season.
  UI_INTERACTION = 'ui interaction',
}

export interface AnalyticsEvent {
  event_name: string;
  event_type: string;
  event_category: string;
  event_action: string;
  event_label: string;
  [additional_props: string]: unknown;
}

/**
 * Clip all the string values to the MAX_LENGTH on an event object in place by mutation
 */
function clipStrings<T>(event: T): T {
  for (const key in event) {
    const value = event[key];
    if (typeof value === 'string') {
      event[key] = value.substring(0, MAX_LENGTH) as any;
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
export function sendAnalytics(eventType: EventType, event: Required<AnalyticsEvent>, retry = 0) {
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
      utag[eventType]({
        // Expand the event object to support the properties expected on healthcare.gov
        ga_eventValue: '', // default value
        ga_eventType: event.event_type,
        ga_eventAction: event.event_action,
        ga_eventCategory: event.event_category,
        ga_eventLabel: event.event_label,
        // But always recognize the incoming event as the authority on truth
        ...event,
      });
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

export type AnalyticsFunction = typeof sendLinkEvent;

export let defaultAnalyticsFunction = sendLinkEvent;

export function setDefaultAnalyticsFunction(analyticsFunction: AnalyticsFunction) {
  defaultAnalyticsFunction = analyticsFunction;
}
