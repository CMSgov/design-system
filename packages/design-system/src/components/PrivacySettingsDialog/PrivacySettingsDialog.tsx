import React from 'react';
import PrivacySettingsTable from './PrivacySettingsTable';
import { Button } from '../Button/index';
import { Dialog } from '../Dialog/index';
import { getPrivacySettings, setPrivacySettings } from './privacySettings';
import { t } from '../i18n';
import { useState } from 'react';

export const privacySettingConfigs = [
  { settingsKey: 'c3', translationKey: 'advertising' },
  { settingsKey: 'c4', translationKey: 'socialMedia' },
  { settingsKey: 'c2', translationKey: 'webAnalytics' },
];

interface PrivacySettingsDialogProps {
  domain: string;
  privacyPolicyUrl: string;
  thirdPartyPoliciesUrl?: string;
  onExit: () => void;
}

/**
 * The PrivacySettingsDialog allows users to adjust their privacy settings.
 * Typically these settings are accessed from a button in the footer of a CMS
 * website. Props allow for customizing on a per-domain basis.
 */
export const PrivacySettingsDialog = (props: PrivacySettingsDialogProps) => {
  const [localPrivacySettings, setLocalPrivacySettings] = useState(getPrivacySettings());

  function setPrivacySetting(settingsKey: string, value: string) {
    setLocalPrivacySettings({
      ...localPrivacySettings,
      [settingsKey]: value,
    });
  }

  function savePrivacySettings() {
    setPrivacySettings(localPrivacySettings);
    props.onExit();
  }

  const { domain, privacyPolicyUrl, thirdPartyPoliciesUrl, ...dialogProps } = props;
  const privacySettingsProperties = privacySettingConfigs.map((config) => ({
    ...config,
    value: localPrivacySettings[config.settingsKey],
  }));

  let intro = t('privacy.introText', { domain });
  intro += ' ' + t('privacy.privacyPolicy', { url: privacyPolicyUrl });
  if (thirdPartyPoliciesUrl) {
    intro += ' ' + t('privacy.thirdPartyPolicies', { url: thirdPartyPoliciesUrl });
  }
  intro += '.';

  return (
    <Dialog
      {...dialogProps}
      heading={t('privacy.dialogTitle', { domain })}
      size="full"
      actions={
        <Button variation="solid" onClick={savePrivacySettings}>
          {t('privacy.save')}
        </Button>
      }
    >
      <p className="ds-u-margin-top--0" dangerouslySetInnerHTML={{ __html: intro }} />

      <PrivacySettingsTable
        domain={domain}
        privacySettings={privacySettingsProperties}
        setPrivacySetting={setPrivacySetting}
      />
    </Dialog>
  );
};

export default PrivacySettingsDialog;
