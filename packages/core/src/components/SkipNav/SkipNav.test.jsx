import React from 'react';
import SkipNav from './SkipNav';
import { shallow } from 'enzyme';

describe('SkipNav', function() {
  it('uses children as link text content', () => {
    const wrapper = shallow(<SkipNav href="#main">Foo</SkipNav>);

    expect(wrapper.text()).toBe('Foo');
  });

  it('has href', () => {
    const wrapper = shallow(<SkipNav href="#main" />);

    expect(wrapper.prop('href')).toBe('#main');
  });

  it('has default text content', () => {
    const wrapper = shallow(<SkipNav href="#main" />);

    expect(wrapper.text()).toBe('Skip to main content');
  });
});
