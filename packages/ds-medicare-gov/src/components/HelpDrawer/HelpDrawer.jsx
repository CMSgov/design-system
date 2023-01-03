import React from 'react';
import { HelpDrawer, CloseIconThin } from '@cmsgov/design-system';

HelpDrawer.defaultProps = {
  ...HelpDrawer.defaultProps,
  closeButtonText: <CloseIconThin className="ds-u-font-size--lg" />,
  closeButtonVariation: 'ghost',
};

export default HelpDrawer;
