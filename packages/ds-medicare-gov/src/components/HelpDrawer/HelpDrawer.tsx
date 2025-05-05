import { HelpDrawer as DSHelpDrawer, CloseIconThin, HelpDrawerProps } from '@cmsgov/design-system';

const HelpDrawer = function (props: HelpDrawerProps) {
  const {
    closeButtonText = <CloseIconThin className="ds-u-font-size--lg" />,
    closeButtonVariation = 'ghost',
  } = props;

  return (
    <DSHelpDrawer
      closeButtonText={closeButtonText}
      closeButtonVariation={closeButtonVariation}
      {...props}
    />
  );
};

// We need this for the medicare story to work, and we also need to declare the side
// effects for the src path.
export { HelpDrawer };
