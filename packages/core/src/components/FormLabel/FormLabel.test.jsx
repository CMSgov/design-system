import FormLabel from './FormLabel';
import React from 'react';
import { shallow } from 'enzyme';

describe('FormLabel', () => {
  const labelText = 'Hello world';

  it('renders label text', () => {
    const props = { fieldId: 'name' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.text()).toBe(labelText);
    expect(wrapper.is('label')).toBe(true);
    expect(wrapper.prop('htmlFor')).toBe(props.fieldId);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders error state', () => {
    const props = {
      errorMessage: 'Nah, try again.',
      fieldId: 'name'
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    // Label becomes bold when there's an error
    expect(wrapper.find('.ds-u-font-weight--bold').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders hint string', () => {
    const props = { hint: 'President #44' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders hint node', () => {
    const props = {
      hint: <strong>President #44</strong>
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders requirementLabel string', () => {
    const props = {
      requirementLabel: 'Optional'
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders requirementLabel node', () => {
    const props = {
      requirementLabel: <em>It is really optional</em>
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds punctuation to requirementLabel when hint is also present', () => {
    const props = { hint: 'Hint', requirementLabel: 'Optional' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });

  it('avoids duplicate punctuation after requirementLabel', () => {
    const props = { hint: 'Hint', requirementLabel: 'Optional.' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a legend element', () => {
    const props = { component: 'legend' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper.is('legend')).toBe(true);
  });

  it('is inversed', () => {
    const props = {
      hint: 'Foo',
      inversed: true
    };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(
      wrapper
        .find('.ds-c-field__hint')
        .first()
        .hasClass('ds-c-field__hint--inverse')
    ).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('supports additional classNames', () => {
    const props = { className: 'ds-u-foo', labelClassName: 'ds-u-bar' };
    const wrapper = shallow(<FormLabel {...props}>{labelText}</FormLabel>);

    expect(wrapper).toMatchSnapshot();
  });
});
