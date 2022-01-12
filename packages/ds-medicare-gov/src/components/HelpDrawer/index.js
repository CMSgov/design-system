import React from 'react';
import { HelpDrawerToggle } from '@cmsgov/design-system';
import InfoCircleOutlineIcon from '../Icons/InfoCircleOutlineIcon';

HelpDrawerToggle.defaultProps = {
  ...HelpDrawerToggle.defaultProps,
  icon: <InfoCircleOutlineIcon />,
};
