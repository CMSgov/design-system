import React from 'react';
import PrivacySettingsDialog from '../PrivacySettings/PrivacySettingsDialog';
import { useState } from 'react';

import { tWithLanguage } from '../i18n';

interface PrivacySettingsLinkProps {
  className?: string;
}

export const PrivacySettingsLink = (props: PrivacySettingsLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const t = tWithLanguage();

  const openDialog = () => setShowDialog(true);

  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <button className={props.className} onClick={openDialog}>
        {t('footer.privacySettings')}
      </button>
      {showDialog && <PrivacySettingsDialog onExit={closeDialog} t={t} />}
    </>
  );
};

export default PrivacySettingsLink;
