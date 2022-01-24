import { ChoiceList } from '@cmsgov/design-system';
import PrivacySettingsTable from './PrivacySettingsTable';
import React from 'react';
import { shallow } from 'enzyme';

const defaultProps = {
  t: (key) => key,
  privacySettings: [
    { settingsKey: 'key1', translationKey: 'setting1', value: '0' },
    { settingsKey: 'key2', translationKey: 'setting2', value: '1' },
    { settingsKey: 'key3', translationKey: 'setting3', value: '0' },
  ],
  setPrivacySetting: () => {},
};

function render(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(<PrivacySettingsTable {...props} />);
  return { wrapper, props };
}

describe('<PrivacySettingsTable />', function () {
  it('renders the privacy settings table', () => {
    expect(render().wrapper).toMatchSnapshot();
  });

  it('calls the setPrivacySetting prop on Choice change', () => {
    const setPrivacySetting = jest.fn();
    const { wrapper } = render({ setPrivacySetting });
    const choiceList = wrapper.find(ChoiceList).first();
    choiceList.props().onChange({ target: { value: '1' } });
    expect(setPrivacySetting).toHaveBeenCalledWith('key1', '1');
  });
});
