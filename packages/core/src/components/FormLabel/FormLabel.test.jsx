import FormLabel from './FormLabel';
import React from 'react';
import {shallow} from 'enzyme';

describe('FormLabel', () => {
  const labelText = 'Hello world';

  it('renders label text', () => {
    const props = {fieldId: 'name'};
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.text()).toBe(labelText);
    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.prop('htmlFor')).toBe(props.fieldId);
  });

  it('renders error state', () => {
    const props = {
      errorMessage: 'Nah, try again.',
      fieldId: 'name'
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);
    const $error = wrapper.render().find('.ds-u-color--error');

    expect($error.text()).toBe(props.errorMessage);
    expect($error.attr('id')).toBe(`${props.fieldId}-message`);
    // Label becomes bold when there's an error
    expect(wrapper.find('.ds-u-font-weight--bold').length).toBe(1);
  });

  it('renders hint string', () => {
    const props = {hint: 'President #44'};
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);
    const hint = wrapper.find('.ds-c-field__hint');

    expect(hint.text())
      .toBe(props.hint);
    expect(hint.hasClass('ds-c-field__hint--inverse'))
      .toBe(false);
  });

  it('renders hint node', () => {
    const props = {
      hint: <strong>President #44</strong>
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);
    const hint = wrapper.find('.ds-c-field__hint');

    expect(hint.html())
      .toMatch(/<strong>/);
  });

  it('renders as a legend element', () => {
    const props = {component: 'legend'};
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.is('legend')).toBe(true);
  });

  it('is inversed', () => {
    const props = {
      hint: 'Foo',
      inversed: true
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.find('.ds-c-field__hint').first().hasClass('ds-c-field__hint--inverse'))
      .toBe(true);
  });

  it('supports additional classNames', () => {
    const props = { className: 'ds-u-foo' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.hasClass('ds-u-foo')).toBe(true);
  });
});
