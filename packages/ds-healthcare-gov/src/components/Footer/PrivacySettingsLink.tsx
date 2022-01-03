import PrivacySettingsDialog from '../PrivacySettings/PrivacySettingsDialog';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

interface PrivacySettingsLinkProps {
  t: TFunction;
}

const _PrivacySettingsLink = (props: PrivacySettingsLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);

  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <button onClick={openDialog}>{props.t('footer.privacySettings')}</button>
      {showDialog && <PrivacySettingsDialog onExit={closeDialog} />}
    </>
  );
};

export const PrivacySettingsLink = withTranslation()(_PrivacySettingsLink);
export default PrivacySettingsLink;
