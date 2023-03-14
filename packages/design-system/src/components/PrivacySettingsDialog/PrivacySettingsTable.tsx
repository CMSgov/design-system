import React from 'react';
import { ChoiceList } from '../ChoiceList/index';
import { Table, TableHead, TableRow, TableCell, TableBody } from '../Table/index';
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
      <TableRow key={settingsKey}>
        <TableCell stackedTitle={t('privacy.category')}>{category}</TableCell>
        <TableCell stackedTitle={t('privacy.description')}>{description}</TableCell>
        <TableCell stackedTitle={t('privacy.status')}>
          {renderToggle(settingsKey, value, category, description)}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table className="ds-c-privacy-settings-table" borderless stackable stackableBreakpoint="md">
      <TableHead>
        <TableRow>
          <TableCell>{t('privacy.category')}</TableCell>
          <TableCell>{t('privacy.description')}</TableCell>
          <TableCell>{t('privacy.status')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{privacySettings.map(renderRow)}</TableBody>
    </Table>
  );
};

export default PrivacySettingsTable;
