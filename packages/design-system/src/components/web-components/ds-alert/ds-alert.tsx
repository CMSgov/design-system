import { define } from '../preactement/define';
import { Alert, AlertProps } from '../../Alert';
import { analyticsAttrs } from '../shared-attributes/analytics';

const attributes = [
  'class-name',
  'heading',
  'heading-id',
  'hide-icon',
  'role',
  'weight',
  'variation',
  'root-id',
  ...analyticsAttrs,
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

define('ds-alert', () => Wrapper, { attributes, events: ['onAnalyticsEvent'] });
