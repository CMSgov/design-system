import Button from './Button.jsx';
import { Button as CoreButton } from '@cmsgov/design-system';
import React from 'react';
import { shallow } from 'enzyme';

describe('Button', () => {
  const buttonText = 'Foo';

  it('renders as core button with new variation class', () => {
    const wrapper = shallow(<Button>{buttonText}</Button>);
    expect(wrapper.is(CoreButton)).toBe(true);
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper).toMatchSnapshot();
  });
});
