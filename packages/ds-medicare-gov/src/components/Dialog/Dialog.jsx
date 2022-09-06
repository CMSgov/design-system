import React from 'react';
import { Dialog, CloseIconThin } from '@cmsgov/design-system';

Dialog.defaultProps = {
  ...Dialog.defaultProps,
  closeButtonText: null,
  closeIcon: <CloseIconThin />,
};

export default Dialog;
