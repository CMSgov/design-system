import { define } from '../preactement/define';
import Button, { ButtonProps } from '../../Button/Button';
import { analyticsAttrs } from '../shared-attributes/analytics';

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

define('ds-button', () => Wrapper, { attributes, events: ['onClick', 'onAnalyticsEvent'] });
