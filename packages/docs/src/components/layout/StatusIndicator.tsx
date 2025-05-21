import { Badge, AlertIcon, CheckIcon } from '@cmsgov/design-system';
import { BadgeVariation } from '@cmsgov/design-system/dist/react-components/types/Badge/Badge.js';
import { StatusInterface } from '../../helpers/graphQLTypes';
import React from 'react';

type StatusLevel = StatusInterface['level'];

interface StatusIndicatorProps {
  level: StatusLevel;
}

const statusConfig: Record<
  StatusLevel,
  {
    variation: BadgeVariation;
    label: string;
    Icon: React.ElementType;
    iconClassName?: string;
  }
> = {
  use: {
    variation: 'success',
    label: 'Use',
    Icon: CheckIcon,
    iconClassName: 'ds-u-margin-right--1',
  },
  caution: {
    variation: 'warn',
    label: 'Caution',
    Icon: AlertIcon,
  },
  avoid: {
    variation: 'alert',
    label: 'Avoid',
    Icon: AlertIcon,
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ level }) => {
  const { variation, label, Icon, iconClassName } = statusConfig[level];

  return (
    <Badge variation={variation} className="ds-u-display--inline-flex ds-u-align-items--center">
      <Icon
        className={iconClassName}
        style={{ fontSize: '1em', height: '1em', width: '1em', verticalAlign: 'text-bottom' }}
      />
      {label}
    </Badge>
  );
};

export default StatusIndicator;
