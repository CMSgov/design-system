import { Dialog } from '@cmsgov/design-system';
import PrivacySettingsDialog from './PrivacySettingsDialog';
import PrivacySettingsTable from './PrivacySettingsTable';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('./privacySettings', () => ({
  getPrivacySettings: jest.fn(() => ({
    c2: '0',
    c3: '0',
    c4: '1',
  })),
  setPrivacySettings: jest.fn(),
}));

const defaultProps = {
  onExit: () => {},
};

function render(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(<PrivacySettingsDialog {...props} />).dive();
  return { wrapper, props };
}

describe('<PrivacySettingsDialog />', function () {
  it('renders the privacy settings dialog', () => {
    expect(render().wrapper).toMatchSnapshot();
  });

  it('passes the onExit prop to the Dialog component', () => {
    const { wrapper, props } = render();
    expect(wrapper.find(Dialog).props().onExit).toEqual(props.onExit);
  });

  it('calls setPrivacySettings and closes dialog on save', () => {
    const { setPrivacySettings } = require('./privacySettings');
    const { wrapper, props } = render({ onExit: jest.fn() });

    expect(wrapper.state()).toEqual({
      c2: '0',
      c3: '0',
      c4: '1',
    });

    wrapper.setState({ c3: '1' });
    const dialog = wrapper.find(Dialog);
    const saveButton = dialog.props().actions;
    saveButton.props.onClick();

    expect(props.onExit).toHaveBeenCalled();
    expect(setPrivacySettings).toHaveBeenCalledWith({
      c2: '0',
      c3: '1',
      c4: '1',
    });
  });

  it('passes appropriate props to PrivacySettingsTable', () => {
    const { wrapper } = render();
    const settingsTable = wrapper.find(PrivacySettingsTable);
    expect(settingsTable.props().privacySettings).toEqual([
      { settingsKey: 'c3', translationKey: 'advertising', value: '0' },
      { settingsKey: 'c4', translationKey: 'socialMedia', value: '1' },
      { settingsKey: 'c2', translationKey: 'webAnalytics', value: '0' },
    ]);
    settingsTable.props().setPrivacySetting('c2', '1');
    expect(wrapper.state('c2')).toEqual('1');
  });
});
