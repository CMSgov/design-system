import React from 'react';
import { define } from './preactement/define';
import { Alert, AlertProps } from '../Alert';

const attributes = [
  'class-name',
  'heading',
  'heading-id',
  'hide-icon',
  'role',
  'weight',
  'variation',
  'analytics',
  'analytics-label-override',
  'analytics-event-type-override',
  'analytics-parent-heading',
  'analytics-parent-type',
  'root-id',
];

interface WrapperProps extends Omit<AlertProps, 'hideIcon' | 'analytics'> {
  analytics?: string;
  hideIcon?: string;
  rootId?: string;
}

const Wrapper = ({ analytics, hideIcon, rootId, ...otherProps }: WrapperProps) => (
  <Alert
    {...otherProps}
    {...{
      analytics: analytics && Boolean(JSON.parse(analytics)),
      hideIcon: hideIcon && Boolean(JSON.parse(hideIcon)),
    }}
    id={rootId}
  />
);

define('ds-alert', () => Wrapper, { attributes });
