import { Dialog, CloseIconThin } from '@cmsgov/design-system';

Dialog.defaultProps = {
  ...Dialog.defaultProps,
  closeButtonText: '',
  closeIconComponent: CloseIconThin,
};

export default Dialog;
