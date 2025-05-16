import { Badge, AlertIcon, CheckIcon } from '@cmsgov/design-system';
import { StatusInterface } from '../../helpers/graphQLTypes';
import React from 'react';

type StatusLevel = StatusInterface['level'];

interface StatusIndicatorProps {
  level: StatusLevel;
}

const statusConfig: Record<
  StatusLevel,
  {
    variation: 'success' | 'warn' | 'alert';
    label: string;
    Icon: React.ElementType;
    className: string;
  }
> = {
  use: {
    variation: 'success',
    label: 'Use',
    Icon: CheckIcon,
    className: 'ds-u-margin-right--1',
  },
  caution: {
    variation: 'warn',
    label: 'Caution',
    Icon: AlertIcon,
    className: '',
  },
  avoid: {
    variation: 'alert',
    label: 'Avoid',
    Icon: AlertIcon,
    className: '',
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ level }) => {
  const { variation, label, Icon, className } = statusConfig[level];

  return (
    <Badge variation={variation} className="ds-u-display--inline-flex ds-u-align-items--center">
      <Icon
        className={className}
        style={{ fontSize: '1em', height: '1em', width: '1em', verticalAlign: 'text-bottom' }}
      />
      {label}
    </Badge>
  );
};

export default StatusIndicator;
