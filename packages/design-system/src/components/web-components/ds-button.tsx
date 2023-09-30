import React from 'react';
import { define } from './preactement/define';
import Button, { ButtonProps } from '../Button/Button';

const attributes = [
  'class-name',
  'disabled',
  'href',
  'is-alternate',
  'on-dark',
  'size',
  'type',
  'variation',
  'analytics',
  'analytics-label-override',
  'analytics-event-type-override',
  'analytics-parent-heading',
  'analytics-parent-type',
  'target',
];

interface WrapperProps extends Omit<ButtonProps, 'isAlternate' | 'onDark' | 'analytics'> {
  analytics?: string;
  isAlternate?: string;
  onDark?: string;
}

const Wrapper = ({ isAlternate, onDark, analytics, ...otherProps }: WrapperProps) => (
  <Button
    {...otherProps}
    {...{
      isAlternate: isAlternate && Boolean(JSON.parse(isAlternate)),
      onDark: onDark && Boolean(JSON.parse(onDark)),
      analytics: analytics && Boolean(JSON.parse(analytics)),
    }}
  />
);

define('ds-button', () => Wrapper, { attributes });