import React from 'react';
import PrivacySettingsTable from './PrivacySettingsTable';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  t: (key) => key,
  privacySettings: [
    { settingsKey: 'key1', translationKey: 'setting1', value: '0' },
    { settingsKey: 'key2', translationKey: 'setting2', value: '1' },
    { settingsKey: 'key3', translationKey: 'setting3', value: '0' },
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
    expect(setPrivacySetting).toHaveBeenCalledWith('key1', '1');
  });
});
