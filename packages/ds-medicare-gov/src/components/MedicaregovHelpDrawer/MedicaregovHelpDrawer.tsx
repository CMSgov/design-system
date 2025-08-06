import { HelpDrawer, CloseIconThin, HelpDrawerProps } from '@cmsgov/design-system';

const MedicaregovHelpDrawer = function (props: HelpDrawerProps) {
  const {
    closeButtonText = <CloseIconThin className="ds-u-font-size--lg" />,
    closeButtonVariation = 'ghost',
  } = props;

  return (
    <HelpDrawer
      closeButtonText={closeButtonText}
      closeButtonVariation={closeButtonVariation}
      {...props}
    />
  );
};

export { MedicaregovHelpDrawer };
