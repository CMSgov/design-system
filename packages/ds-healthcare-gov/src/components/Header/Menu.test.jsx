import Menu from './Menu';
import React from 'react';
import { shallow } from 'enzyme';

describe('Menu', function () {
  const links = [
    { href: '#foo', label: 'Foo' },
    { href: '#bar', label: 'Bar' },
  ];

  it('has an id for ARIA attributes', () => {
    // Note: the ID attribute of this component is important and used as an
    // ARIA attribute in ActionMenu. Be mindful of this if you change it.
    const wrapper = shallow(<Menu links={links} />);
    expect(wrapper.prop('id')).toBe('hc-c-menu');
  });

  it('renders MenuList', () => {
    expect(shallow(<Menu links={links} />)).toMatchSnapshot();
  });

  it('removes hidden state', () => {
    expect(shallow(<Menu open links={links} />)).toMatchSnapshot();
  });
});
