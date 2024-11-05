import { AnalyticsEvent } from '../analytics';
import { config } from '../config';

/**
 * The web component event configuration to pass into the define function's `events`
 * option that will allow users to override the default analytics function by creating
 * an event listener for the `ds-analytics-event` event and calling the `preventDefault`
 * function.
 *
 * For example,
 *
 * define('ds-button', () => Wrapper, { attributes, events: ['onClick', onAnalyticsEvent] });
 */
export const onAnalyticsEvent = [
  'onAnalyticsEvent',
  (event: AnalyticsEvent) => {
    let callDefaultAnalyticsFunction = true;

    function preventDefault() {
      callDefaultAnalyticsFunction = false;
    }

    // Give event listeners a chance to prevent default before we execute the default
    // analytics function from the config.
    setTimeout(() => {
      if (callDefaultAnalyticsFunction) {
        config().defaultAnalyticsFunction(event);
      }
    }, 10);

    return {
      detail: { event },
      preventDefault,
    };
  },
] as const;
