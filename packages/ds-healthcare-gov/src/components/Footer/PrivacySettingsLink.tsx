import PrivacySettingsDialog from '../PrivacySettings/PrivacySettingsDialog';
import { useState } from 'react';
import { TFunction } from '@cmsgov/design-system';

interface PrivacySettingsLinkProps {
  t: TFunction;
}

export const PrivacySettingsLink = (props: PrivacySettingsLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);

  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <button onClick={openDialog}>{props.t('footer.privacySettings')}</button>
      {showDialog && <PrivacySettingsDialog onExit={closeDialog} t={props.t} />}
    </>
  );
};

export default PrivacySettingsLink;
