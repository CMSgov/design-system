import FormLabel from './FormLabel';
import React from 'react';
import {shallow} from 'enzyme';

describe('FormLabel', () => {
  const labelText = 'Hello world';

  it('renders label text', () => {
    const wrapper = shallow(<FormLabel>{labelText}</FormLabel>);
    expect(wrapper.text()).toBe(labelText);
    expect(wrapper.is('label')).toBe(true);
  });

  it('renders error state', () => {
    const props = {errorMessage: 'Nah, try again.'};
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.find('.ds-u-color--error').text()).toBe(props.errorMessage);
    // Label becomes bold when there's an error
    expect(wrapper.find('.ds-u-font-weight--bold').length).toBe(1);
  });

  it('renders help text', () => {
    const props = {hint: 'President #44'};
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.find('.ds-c-field__hint').text()).toBe(props.hint);
  });

  it('renders as a legend element', () => {
    const props = {component: 'legend'};
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.is('legend')).toBe(true);
  });

  it('sets correct "id" attribute value on error message element');
  it('sets correct "for" attribute value on root label element');
});
