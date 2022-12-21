import React from 'react';
import PrivacySettingsDialog from '../PrivacySettings/PrivacySettingsDialog';
import { useState } from 'react';
import { TFunction } from '@cmsgov/design-system';

interface PrivacySettingsLinkProps {
  t: TFunction;
  className?: string;
}

export const PrivacySettingsLink = (props: PrivacySettingsLinkProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);

  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <button className={props.className ?? ''} onClick={openDialog}>
        {props.t('footer.privacySettings')}
      </button>
      {showDialog && <PrivacySettingsDialog onExit={closeDialog} t={props.t} />}
    </>
  );
};

export default PrivacySettingsLink;
