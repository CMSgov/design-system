import { FunctionComponent } from 'react';
import { CloseIconThin } from '@cmsgov/design-system';

interface CloseProps {
  className?: string;
}

const Close: FunctionComponent<CloseProps> = ({ className }) => {
  console.error(
    `[Deprecated]: Please use the <CloseIconThin /> component with 'ds-c-icon-color--error' CSS class instead. This component will be removed in a future release.`
  );

  return <CloseIconThin className={className} />;
};

export default Close;
