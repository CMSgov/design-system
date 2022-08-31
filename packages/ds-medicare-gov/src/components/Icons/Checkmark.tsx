import React, { FunctionComponent } from 'react';
import { CheckIcon } from '@cmsgov/design-system';

interface CheckmarkProps {
  className?: string;
}

const Checkmark: FunctionComponent<CheckmarkProps> = ({ className }) => {
  console.error(
    `[Deprecated]: Please use the <CheckIcon /> component with 'ds-c-icon-color--primary' CSS class instead. This component will be removed in a future release.`
  );

  return <CheckIcon className={`ds-c-icon-color--primary ${className}`} />;
};

export default Checkmark;
