import { CheckCircleIcon, WarningIcon, AlertCircleIcon } from '../Icons';
import classNames from 'classnames';

export const StatusIcon = ({ status }) => {
  const iconClass = classNames('ds-u-margin-right--1', {
    'ds-c-icon-color--success': status === 'use',
    'ds-c-icon-color--warn': status === 'caution',
    'ds-c-icon-color--error': status === 'avoid',
  });

  const iconStyle = {
    height: '1em',
    width: '1em',
    verticalAlign: 'text-bottom',
  };

  if (status === 'use') return <CheckCircleIcon className={iconClass} style={iconStyle} />;
  if (status === 'caution') return <WarningIcon className={iconClass} style={iconStyle} />;
  if (status === 'avoid') return <AlertCircleIcon className={iconClass} style={iconStyle} />;
  return null;
};
