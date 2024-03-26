import { useState } from 'react';
import type * as React from 'react';
import { PrivacySettingsDialog } from '@cmsgov/design-system';
import { tWithLanguage } from '../i18n';

interface PrivacySettingsLinkProps {
  children?: React.ReactNode;
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
        {props.children || t('footer.privacySettings')}
      </button>
      <PrivacySettingsDialog
        isOpen={showDialog}
        onExit={closeDialog}
        domain="HealthCare.gov"
        privacyPolicyUrl="https://www.healthcare.gov/privacy/"
        thirdPartyPoliciesUrl="https://www.healthcare.gov/third-party-privacy-policies/"
      />
    </>
  );
};

export default PrivacySettingsLink;
