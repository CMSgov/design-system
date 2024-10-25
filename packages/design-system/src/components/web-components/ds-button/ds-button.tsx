import { define } from '../preactement/define';
import Button, { ButtonProps } from '../../Button/Button';
import { analyticsAttrs } from '../shared-attributes/analytics';
import { AnalyticsEvent } from '../../analytics';
import { config } from '../../config';

const attributes = [
  'class-name',
  'disabled',
  'href',
  'is-alternate',
  'is-on-dark',
  'size',
  'type',
  'variation',
  'target',
  ...analyticsAttrs,
];

// Mapping `onDark` to `isOnDark` because props starting with "on" indicate an event handler and tests fail due to this expectation
interface WrapperProps extends Omit<ButtonProps, 'isAlternate' | 'onDark' | 'analytics'> {
  analytics?: string;
  isAlternate?: string;
  isOnDark?: string;
}

const Wrapper = ({ isAlternate, isOnDark, analytics, ...otherProps }: WrapperProps) => (
  <Button
    {...otherProps}
    {...{
      isAlternate: isAlternate && Boolean(JSON.parse(isAlternate)),
      onDark: isOnDark && Boolean(JSON.parse(isOnDark)),
      analytics: analytics && Boolean(JSON.parse(analytics)),
    }}
  />
);

// What if we called config().defaultAnalyticsEvent within our own listener in here if
// the user does not preventDefault()? Or maybe if some boolean is provided?

define('ds-button', () => Wrapper, {
  attributes,
  events: [
    'onClick',
    [
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
    ],
  ],
});
