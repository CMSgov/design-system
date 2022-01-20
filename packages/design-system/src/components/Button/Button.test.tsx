import Button, { ButtonProps } from './Button';
import React from 'react';
import { shallow } from 'enzyme';

const Link = (props) => {
  /* eslint-disable-next-line react/prop-types */
  return <div {...props}>{props.children}</div>;
};

const defaultProps = {
  children: 'Foo',
};

function renderButton(props: Partial<ButtonProps<any>> = {}) {
  return shallow(<Button {...defaultProps} {...props} />);
}

describe('Button', () => {
  it('renders as button', () => {
    const wrapper = renderButton();
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('button');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    const wrapper = renderButton({ type: 'submit' });
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('submit');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const wrapper = renderButton({
      href: '/example',
      target: '_blank',
      type: 'submit',
    });
    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.prop('href')).toBe('/example');
    expect(wrapper.prop('target')).toBe('_blank');
    expect(wrapper.prop('type')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a Link', () => {
    const wrapper = renderButton({
      component: Link,
      type: 'submit',
    });
    expect(wrapper.is('Link')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.render().text()).toBe(defaultProps.children);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders disabled Link correctly', () => {
    const wrapper = renderButton({
      href: 'javascript:void(0)',
      disabled: true,
      children: 'Link button',
    });
    expect(wrapper.prop('disabled')).not.toBe(true);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    const wrapper = renderButton({ className: 'foobar' });
    expect(wrapper.hasClass('foobar')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies variation classes', () => {
    const wrapper = renderButton({ variation: 'primary' });
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--primary')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies size classes', () => {
    const wrapper = renderButton({ size: 'small' });
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--small')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled class', () => {
    const onClick = jest.fn();
    const disabled = true;
    const wrapper = renderButton({ onClick, disabled });
    wrapper.simulate('click');

    expect(wrapper.prop('disabled')).toBe(disabled);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(false);
    expect(onClick.mock.calls.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled, inverse, and variation classes together', () => {
    const wrapper = renderButton({
      disabled: true,
      inversed: true,
      variation: 'transparent',
    });
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.prop('disabled')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies inversed to default/transparent variations', () => {
    const wrapper = renderButton({
      inversed: true,
      variation: 'transparent',
    });
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
});
