import React from 'react';
import register from '@amindunited/preact-custom-element';
import Alert, { AlertProps } from '../Alert/Alert';

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
  'id',
  'alert-ref',
];

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-alert': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          [K in (typeof attributes)[number]]?: string;
        },
        HTMLElement
      >;
    }
  }
}

interface WrapperProps
  extends Omit<
    AlertProps,
    | 'className'
    | 'analytics'
    | 'analytics-label-override'
    | 'analytics-event-type-override'
    | 'analytics-parent-heading'
    | 'analytics-parent-type'
  > {
  'class-name'?: string;
  analytics?: string;
  'analytics-label-override'?: string;
  'analytics-event-type-override'?: string;
  'analytics-parent-heading'?: string;
  'analytics-parent-type'?: string;
}

const Wrapper = ({
  'class-name': className,
  analytics,
  'analytics-label-override': analyticsLabelOverride,
  'analytics-event-type-override': analyticsEventTypeOverride,
  'analytics-parent-heading': analyticsParentHeading,
  'analytics-parent-type': analyticsParentType,
  ...otherProps
}: WrapperProps) => (
  <Alert
    {...otherProps}
    {...{
      className,
      analytics: analytics && Boolean(JSON.parse(analytics)),
      analyticsLabelOverride,
      analyticsEventTypeOverride,
      analyticsParentHeading,
      analyticsParentType,
    }}
  />
);

register(Wrapper, 'ds-alert', attributes as any);
