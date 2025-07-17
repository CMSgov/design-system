import {
  HelpDrawerToggle as DSHelpDrawerToggle,
  HelpDrawerToggleProps,
} from '@cmsgov/design-system';
import InfoCircleOutlineIcon from '../Icons/InfoCircleOutlineIcon';

const HelpDrawerToggle = function (props: HelpDrawerToggleProps) {
  const { icon = <InfoCircleOutlineIcon /> } = props;

  return <DSHelpDrawerToggle icon={icon} {...props} />;
};

// We need this for the medicare story to work, and we also need to declare the side
// effects for the src path.
export { HelpDrawerToggle };
