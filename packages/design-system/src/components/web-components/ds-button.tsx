import React from 'react';
import { define } from './preactement/define';
import Button, { ButtonProps } from '../Button/Button';

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
  'analytics',
  'analytics-label-override',
  'analytics-event-type-override',
  'analytics-parent-heading',
  'analytics-parent-type',
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

define('ds-button', () => Wrapper, { attributes });
