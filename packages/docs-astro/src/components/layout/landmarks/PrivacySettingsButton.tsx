import React from 'react';
import { useState } from 'react';
import { PrivacySettingsDialog } from '@cmsgov/design-system';

const PrivacySettingsButton = () => {
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return (
    <>
      <button className="c-footer__link" onClick={openDialog}>
        Privacy settings
      </button>
      {showDialog && (
        <PrivacySettingsDialog
          onExit={closeDialog}
          domain="CMS.gov"
          privacyPolicyUrl="https://www.cms.gov/privacy"
          thirdPartyPoliciesUrl="https://www.cms.gov/privacy#h57sjsyz3r1jqc1oje1naete3bvoi6g"
        />
      )}
    </>
  );
};

export default PrivacySettingsButton;
