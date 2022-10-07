import { FunctionComponent } from 'react';
import { MenuIconThin } from '@cmsgov/design-system';

interface CloseProps {
  className?: string;
}

const HamburgerSymbol: FunctionComponent<CloseProps> = ({ className }) => {
  console.error(
    `[Deprecated]: Please use the <MenuIconThin /> component with 'ds-c-icon-color--primary' CSS class instead. This component will be removed in a future release.`
  );

  return <MenuIconThin className={`ds-c-icon-color--primary ${className}`} />;
};

export default HamburgerSymbol;
