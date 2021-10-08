import { ChoiceList } from '@cmsgov/design-system';
import PropTypes from 'prop-types';
import React from 'react';

export class PrivacySettingsTable extends React.PureComponent {
  renderToggle(settingsKey, value, category, description) {
    const { t, setPrivacySetting } = this.props;
    const choices = [
      {
        label: t('privacy.allow'),
        value: '0',
        checked: value === '0',
      },
      {
        label: t('privacy.dontAllow'),
        value: '1',
        checked: value === '1',
      },
    ];
    const label = (
      <span className="ds-u-visibility--screen-reader">{category}</span>
    );
    return (
      <ChoiceList
        type="checkbox"
        choices={choices}
        onChange={(event) => {
          setPrivacySetting(settingsKey, event.target.value);
        }}
        className="ds-u-margin-top--0"
        label={label}
        aria-label={description}
        name={`cookie-${settingsKey}`}
      />
    );
  }

  renderRow({ settingsKey, translationKey, value }) {
    const { t } = this.props;
    const category = t(`privacy.${translationKey}.category`);
    const description = t(`privacy.${translationKey}.description`);
    return (
      <tr key={settingsKey}>
        <td data-title={t('privacy.category')}>{category}</td>
        <td data-title={t('privacy.description')}>{description}</td>
        <td data-title={t('privacy.status')}>
          {this.renderToggle(settingsKey, value, category, description)}
        </td>
      </tr>
    );
  }

  render() {
    const { t, privacySettings } = this.props;
    return (
      <table className="ds-c-table ds-c-table--borderless hc-c-privacy-settings-table">
        <thead>
          <tr>
            <th scope="col">{t('privacy.category')}</th>
            <th scope="col">{t('privacy.description')}</th>
            <th scope="col">{t('privacy.status')}</th>
          </tr>
        </thead>
        <tbody>
          {privacySettings.map((setting) => this.renderRow(setting))}
        </tbody>
      </table>
    );
  }
}

PrivacySettingsTable.propTypes = {
  t: PropTypes.func.isRequired,
  privacySettings: PropTypes.arrayOf(
    PropTypes.shape({
      settingsKey: PropTypes.string.isRequired,
      translationKey: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPrivacySetting: PropTypes.func.isRequired,
};

export default PrivacySettingsTable;
