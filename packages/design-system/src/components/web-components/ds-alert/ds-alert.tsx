import { define } from '../preactement/define';
import { Alert, AlertProps } from '../../Alert';
import { analyticsOverrideAttrs } from '../shared-attributes/analytics';
import { onAnalyticsEvent } from '../analytics';

const attributes = [
  'class-name',
  'heading',
  'heading-id',
  'hide-icon',
  'role',
  'weight',
  'variation',
  'root-id',
  ...analyticsOverrideAttrs,
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

define('ds-alert', () => Wrapper, { attributes, events: [onAnalyticsEvent] });
