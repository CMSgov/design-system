import PageHeader from '../PageHeader';
import React from 'react';
import {shallow} from 'enzyme';

describe('PageHeader', () => {
  it('renders tabs', () => {
    const wrapper = shallow(<PageHeader header='Hello' />);
    expect(wrapper.find('Tab').length).toBe(2);
  });
});
