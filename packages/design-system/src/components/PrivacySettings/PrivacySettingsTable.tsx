import React from 'react';
import { ChoiceList } from '../ChoiceList';
import { t } from '../i18n';

export interface PrivacySettingsProperty {
  settingsKey: string;
  translationKey: string;
  value: string;
}

export interface PrivacySettingsTableProps {
  domain: string;
  privacySettings: PrivacySettingsProperty[];
  setPrivacySetting: (key: string, value: string) => any;
}

export const PrivacySettingsTable = ({
  domain,
  privacySettings,
  setPrivacySetting,
}: PrivacySettingsTableProps) => {
  function renderToggle(settingsKey: string, value: string, category: string, description: string) {
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
    const label = <span className="ds-u-visibility--screen-reader">{category}</span>;
    return (
      <ChoiceList
        type="radio"
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

  function renderRow({ settingsKey, translationKey, value }: PrivacySettingsProperty) {
    const category = t(`privacy.${translationKey}.category`);
    const description = t(`privacy.${translationKey}.description`, { domain });
    return (
      <tr key={settingsKey}>
        <td data-title={t('privacy.category')}>{category}</td>
        <td data-title={t('privacy.description')}>{description}</td>
        <td data-title={t('privacy.status')}>
          {renderToggle(settingsKey, value, category, description)}
        </td>
      </tr>
    );
  }

  return (
    <table className="ds-c-table ds-c-table--borderless ds-c-privacy-settings-table">
      <thead>
        <tr>
          <th scope="col">{t('privacy.category')}</th>
          <th scope="col">{t('privacy.description')}</th>
          <th scope="col">{t('privacy.status')}</th>
        </tr>
      </thead>
      <tbody>{privacySettings.map(renderRow)}</tbody>
    </table>
  );
};

export default PrivacySettingsTable;
