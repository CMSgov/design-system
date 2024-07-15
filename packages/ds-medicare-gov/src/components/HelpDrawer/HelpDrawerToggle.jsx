import { HelpDrawerToggle } from '@cmsgov/design-system';
import InfoCircleOutlineIcon from '../Icons/InfoCircleOutlineIcon';

HelpDrawerToggle.defaultProps = {
  icon: <InfoCircleOutlineIcon />,
};

// We need this for the medicare story to work, and we also need to declare the side
// effects for the src path.
export { HelpDrawerToggle };
