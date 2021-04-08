import Badge from './Badge';
import React from 'react';
import { shallow } from 'enzyme';

describe('Badge', () => {
  it('should include children as label', () => {
    expect(shallow(<Badge>Foo</Badge>).text()).toEqual('Foo');
  });

  it('renders span and should not disappear when clicked if dismissible prop is not included', () => {
    const wrapper = shallow(<Badge>Foo</Badge>);
    expect(wrapper.text()).toEqual('Foo');

    const span = wrapper.find('span');
    const button = wrapper.find('button');
    expect(span.length).toEqual(1);
    expect(button.length).toEqual(0);

    span.simulate('click');
    wrapper.update();
    expect(wrapper.text()).toEqual('Foo');
  });

  it('renders button and should disappear when clicked if dismissible prop is included', () => {
    const wrapper = shallow(<Badge dismissible>Foo</Badge>);
    expect(wrapper.text()).toEqual('Foo<ClearIcon />');

    const span = wrapper.find('span');
    const button = wrapper.find('button');
    expect(span.length).toEqual(1);
    expect(button.length).toEqual(1);

    button.simulate('click');
    wrapper.update();
    expect(wrapper.text()).toEqual('');
  });
});
