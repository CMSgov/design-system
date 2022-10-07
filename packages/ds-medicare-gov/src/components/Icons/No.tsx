import { FunctionComponent } from 'react';
import { CloseIcon } from '@cmsgov/design-system';

interface NoProps {
  className?: string;
}

const No: FunctionComponent<NoProps> = ({ className = '' }) => {
  console.error(
    `[Deprecated]: Please use the <CloseIcon /> component with 'ds-c-icon-color--error' CSS class instead. This component will be removed in a future release.`
  );

  return <CloseIcon title="Caret" className={`ds-c-icon-color--error ${className}`} />;
};

export default No;
