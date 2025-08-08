import { HelpDrawerToggle, HelpDrawerToggleProps } from '@cmsgov/design-system';
import InfoCircleOutlineIcon from '../Icons/InfoCircleOutlineIcon';

const MedicaregovHelpDrawerToggle = function (props: HelpDrawerToggleProps) {
  const { icon = <InfoCircleOutlineIcon /> } = props;

  return <HelpDrawerToggle icon={icon} {...props} />;
};

export { MedicaregovHelpDrawerToggle };
