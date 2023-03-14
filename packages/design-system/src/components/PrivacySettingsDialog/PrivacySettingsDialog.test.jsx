import React from 'react';
import '@testing-library/jest-dom';
import PrivacySettingsDialog from './PrivacySettingsDialog';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('./privacySettings', () => ({
  getPrivacySettings: jest.fn(() => ({
    c2: '0',
    c3: '0',
    c4: '1',
  })),
  setPrivacySettings: jest.fn(),
}));

const defaultProps = {
  domain: 'Test.gov',
  privacyPolicyUrl: 'https://www.healthcare.gov/privacy/',
  thirdPartyPoliciesUrl: 'https://www.healthcare.gov/third-party-privacy-policies/',
  onExit: () => {},
};

function renderComponent(props) {
  props = Object.assign({}, defaultProps, props);
  return render(<PrivacySettingsDialog {...props} />);
}

describe('<PrivacySettingsDialog />', function () {
  it('clicking close button calls onExit and does not save settings', () => {
    const { setPrivacySettings } = require('./privacySettings');
    const onExit = jest.fn();
    renderComponent({ onExit });
    fireEvent.click(screen.getByRole('button', { name: 'Close modal dialog' }));
    expect(onExit).toHaveBeenCalled();
    expect(setPrivacySettings).not.toHaveBeenCalled();
  });

  it('sets settings and closes dialog on save', () => {
    const { setPrivacySettings } = require('./privacySettings');
    const onExit = jest.fn();
    renderComponent({ onExit });
    const radios = screen.getAllByRole('radio');

    function getSettingRadios(name) {
      return radios.filter((radio) => radio.name === `cookie-${name}`);
    }

    function getSettingValue(name) {
      const radio = getSettingRadios(name).find((radio) => radio.checked);
      return radio.value;
    }

    expect(getSettingValue('c2')).toEqual('0');
    expect(getSettingValue('c3')).toEqual('0');
    expect(getSettingValue('c4')).toEqual('1');

    const allow = getSettingRadios('c3').find((radio) => radio.value === '1');
    fireEvent.click(allow);
    fireEvent.click(screen.getByRole('button', { name: /Update my settings/ }));

    expect(onExit).toHaveBeenCalled();
    expect(setPrivacySettings).toHaveBeenCalledWith({
      c2: '0',
      c3: '1',
      c4: '1',
    });
  });
});
