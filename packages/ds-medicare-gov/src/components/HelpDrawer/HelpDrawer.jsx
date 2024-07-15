import { HelpDrawer, CloseIconThin } from '@cmsgov/design-system';

HelpDrawer.defaultProps = {
  ...HelpDrawer.defaultProps,
  closeButtonText: <CloseIconThin className="ds-u-font-size--lg" />,
  closeButtonVariation: 'ghost',
};

// We need this for the medicare story to work, and we also need to declare the side
// effects for the src path.
export { HelpDrawer };
