import React from 'react';
import PrivacySettingsTable from './PrivacySettingsTable';
import userEvent from '@testing-library/user-event';
import { privacySettingConfigs } from './PrivacySettingsDialog';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  domain: 'Test.gov',
  privacySettings: [
    { ...privacySettingConfigs[0], value: '0' },
    { ...privacySettingConfigs[1], value: '1' },
    { ...privacySettingConfigs[2], value: '0' },
  ],
  setPrivacySetting: jest.fn(),
};

function makePrivacySettingsTable(props) {
  props = Object.assign({}, defaultProps, props);
  return render(<PrivacySettingsTable {...props} />);
}

describe('<PrivacySettingsTable />', function () {
  it('renders the privacy settings table', () => {
    expect(makePrivacySettingsTable()).toMatchSnapshot();
  });

  it('calls the setPrivacySetting prop on Choice change', () => {
    const setPrivacySetting = jest.fn();
    makePrivacySettingsTable({ setPrivacySetting });
    const choice = screen.getAllByRole('radio');
    userEvent.click(choice[1]);
    expect(setPrivacySetting).toHaveBeenCalledWith('c3', '1');
  });
});
