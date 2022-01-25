import Button, { ButtonProps, ButtonComponentType } from './Button';
import React from 'react';
import { shallow } from 'enzyme';

function mockWarn(testFunction: () => void) {
  const original = console.warn;
  const mock = jest.fn();
  console.warn = mock;
  testFunction();
  console.warn = original;
  return mock;
}

const Link = (props: any) => {
  return <div {...props}>{props.children}</div>;
};

const defaultProps = {
  children: 'Foo',
};

describe('Button', () => {
  it('renders as button', () => {
    const wrapper = shallow(<Button {...defaultProps} />);
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as submit button', () => {
    const wrapper = shallow(<Button {...defaultProps} {...{ type: 'submit' }} />);
    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.prop('type')).toBe('submit');
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as an anchor with custom prop', () => {
    const wrapper = shallow(
      <Button
        {...defaultProps}
        {...{
          href: '/example',
          target: '_blank',
          type: 'submit',
        }}
      />
    );
    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.prop('href')).toBe('/example');
    expect(wrapper.prop('target')).toBe('_blank');
    expect(wrapper.prop('type')).toBeUndefined();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders as a custom Link component', () => {
    mockWarn(() => {
      const wrapper = shallow(
        <Button
          {...defaultProps}
          component={Link}
          type="submit"
          // @ts-ignore: This custom prop isn't supported
          to="anywhere"
        />
      );
      expect(wrapper.is('Link')).toBe(true);
      expect(wrapper.hasClass('ds-c-button')).toBe(true);
      expect(wrapper.render().text()).toBe(defaultProps.children);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders disabled link correctly', () => {
    const wrapper = shallow(
      <Button
        {...defaultProps}
        {...{
          href: 'javascript:void(0)',
          disabled: true,
          children: 'Link button',
        }}
      />
    );
    expect(wrapper.prop('disabled')).not.toBe(true);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies additional classes', () => {
    const wrapper = shallow(<Button {...defaultProps} {...{ className: 'foobar' }} />);
    expect(wrapper.hasClass('foobar')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies variation classes', () => {
    const wrapper = shallow(<Button {...defaultProps} {...{ variation: 'primary' }} />);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--primary')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies size classes', () => {
    const wrapper = shallow(<Button {...defaultProps} {...{ size: 'small' }} />);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--small')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled class', () => {
    const onClick = jest.fn();
    const disabled = true;
    const wrapper = shallow(<Button {...defaultProps} {...{ onClick, disabled }} />);
    wrapper.simulate('click');

    expect(wrapper.prop('disabled')).toBe(disabled);
    expect(wrapper.hasClass('ds-c-button--disabled')).toBe(false);
    expect(onClick.mock.calls.length).toBe(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies disabled, inverse, and variation classes together', () => {
    const wrapper = shallow(
      <Button
        {...defaultProps}
        {...{
          disabled: true,
          inversed: true,
          variation: 'transparent',
        }}
      />
    );
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.prop('disabled')).toBe(true);
    expect(wrapper.hasClass('ds-c-button')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('applies inversed to default/transparent variations', () => {
    const wrapper = shallow(
      <Button
        {...defaultProps}
        {...{
          inversed: true,
          variation: 'transparent',
        }}
      />
    );
    expect(wrapper.hasClass('ds-c-button--inverse')).toBe(true);
    expect(wrapper.hasClass('ds-c-button--transparent')).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it('prints deprecation warning for "component" prop', () => {
    const mock = mockWarn(() => {
      shallow(
        <Button
          {...defaultProps}
          component={Link}
          type="submit"
          // @ts-ignore: This custom prop isn't supported
          to="anywhere"
        />
      );
    });
    expect(mock).toHaveBeenCalledWith(
      "[Deprecated]: Please remove the 'component' prop in <Button>. This prop will be removed in a future release."
    );
  });
});
