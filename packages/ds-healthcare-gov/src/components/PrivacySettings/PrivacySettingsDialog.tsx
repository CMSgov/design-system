import { Button, Dialog } from '@cmsgov/design-system';
import { getPrivacySettings, setPrivacySettings } from './privacySettings';
import PrivacySettingsTable from './PrivacySettingsTable';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';

const privacySettingConfigs = [
  { settingsKey: 'c3', translationKey: 'advertising' },
  { settingsKey: 'c4', translationKey: 'socialMedia' },
  { settingsKey: 'c2', translationKey: 'webAnalytics' },
];

interface PrivacySettingsDialogProps {
  onExit: () => void;
  t: (key: string) => string;
}

const _PrivacySettingsDialog = (props: PrivacySettingsDialogProps) => {
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

  const { t, ...dialogProps } = props;
  const privacySettingsProperties = privacySettingConfigs.map((config) => ({
    ...config,
    value: localPrivacySettings[config.settingsKey],
  }));

  return (
    <Dialog
      {...dialogProps}
      title={t('privacy.dialogTitle')}
      size="full"
      closeButtonSize="small"
      closeButtonVariation="secondary"
      actionsClassName="ds-u-text-align--right"
      actions={
        <Button variation="primary" onClick={savePrivacySettings}>
          {t('privacy.save')}
        </Button>
      }
    >
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: t('privacy.introText') }} />

      <PrivacySettingsTable
        t={t}
        privacySettings={privacySettingsProperties}
        setPrivacySetting={setPrivacySetting}
      />
    </Dialog>
  );
};

export const PrivacySettingsDialog = withTranslation()(_PrivacySettingsDialog);
export default PrivacySettingsDialog;
