import Button from './Button.jsx';
import React from 'react';
import { shallow } from 'enzyme';

/* eslint-disable react/display-name, react/prop-types */
const Link = props => {
  return <div {...props}>{props.children}</div>;
};

describe('Button', () => {
  const buttonText = 'Foo';

  it('renders as button', () => {
    const wrapper = shallow(<Button>{buttonText}</Button>);
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    const props = { type: 'submit' };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('submit');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const props = {
      href: '/example',
      target: '_blank',
      type: 'submit'
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.prop('href')).toBe('/example');
    expect(wrapper.prop('target')).toBe('_blank');
    expect(wrapper.prop('type')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a Link', () => {
    const props = {
      component: Link,
      type: 'submit'
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.is('Link')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.render().text()).toBe(buttonText);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled Link correctly', () => {
    const props = {
      href: 'javascript:void(0)',
      disabled: true
    };
    const wrapper = shallow(<Button {...props}>Link button</Button>);
    expect(wrapper.prop('disabled')).not.toBe(true);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    const props = { className: 'foobar' };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    expect(wrapper.hasClass('foobar')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies variation classes', () => {
    const props = { variation: 'danger' };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--danger')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies size classes', () => {
    const props = { size: 'small' };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--small')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled class', () => {
    const onClick = jest.fn();
    const disabled = true;
    const props = { onClick, disabled };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);
    wrapper.simulate('click');

    expect(wrapper.prop('disabled')).toBe(disabled);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(false);
    expect(onClick.mock.calls.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled, inverse, and variation classes together', () => {
    const props = {
      disabled: true,
      inversed: true,
      variation: 'transparent'
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.prop('disabled')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies inversed to default/transparent variations', () => {
    const props = {
      inversed: true,
      variation: 'transparent'
    };
    const wrapper = shallow(<Button {...props}>{buttonText}</Button>);

    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
