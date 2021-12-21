import { Button, Dialog } from '@cmsgov/design-system';
import { getPrivacySettings, setPrivacySettings } from './privacySettings';
import PrivacySettingsTable from './PrivacySettingsTable';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation } from 'react-i18next';

const privacySettingConfigs = [
  { settingsKey: 'c3', translationKey: 'advertising' },
  { settingsKey: 'c4', translationKey: 'socialMedia' },
  { settingsKey: 'c2', translationKey: 'webAnalytics' },
];

class _PrivacySettingsDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = getPrivacySettings();
  }

  setPrivacySetting = (settingsKey, value) => {
    this.setState({ [settingsKey]: value });
  };

  savePrivacySettings = () => {
    setPrivacySettings(this.state);
    this.props.onExit();
  };

  render() {
    const { t, ...dialogProps } = this.props;
    const privacySettings = privacySettingConfigs.map((config) => ({
      ...config,
      value: this.state[config.settingsKey],
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
          <Button variation="primary" onClick={this.savePrivacySettings}>
            {t('privacy.save')}
          </Button>
        }
      >
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: t('privacy.introText') }} />

        <PrivacySettingsTable
          t={t}
          privacySettings={privacySettings}
          setPrivacySetting={this.setPrivacySetting}
        />
      </Dialog>
    );
  }
}

_PrivacySettingsDialog.propTypes = {
  onExit: PropTypes.func.isRequired,
};

export const PrivacySettingsDialog = withTranslation()(_PrivacySettingsDialog);
export default PrivacySettingsDialog;
