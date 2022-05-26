import TextInput, { OmitProps, TextInputProps } from './TextInput';
import { mount, shallow } from 'enzyme';
import React from 'react';

const defaultProps: Omit<React.ComponentPropsWithRef<'textarea'>, OmitProps> &
  Omit<React.ComponentPropsWithRef<'input'>, OmitProps> &
  TextInputProps = {
  name: 'spec-field',
  setRef: jest.fn(),
  id: '1',
  type: 'text',
  errorPlacement: 'top',
};

function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <TextInput {...props} />;

  return {
    props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('TextInput', function () {
  it('is an input field', () => {
    const data = render();

    expect(data.wrapper.is('input')).toBe(true);
    expect(data.wrapper.prop('rows')).toBeUndefined();
    expect(data.wrapper).toMatchSnapshot();
  });

  it('is a textarea', () => {
    const data = render({ multiline: true });

    expect(data.wrapper.is('textarea')).toBe(true);
    expect(data.wrapper.prop('rows')).toBeUndefined();
    expect(data.wrapper.prop('type')).toBeUndefined();
    expect(data.wrapper).toMatchSnapshot();
  });

  it('is a password field', () => {
    const data = render({ type: 'password' });

    expect(data.wrapper.prop('type')).toBe('password');
  });

  it('is disabled', () => {
    const data = render({ disabled: true });

    expect(data.wrapper.prop('disabled')).toBe(data.props.disabled);
  });

  it('has error', () => {
    const data = render({ errorMessage: 'Error' });

    expect(data.wrapper.prop('aria-invalid')).toBe(true);
    expect(data.wrapper.hasClass('ds-c-field--error')).toBe(true);
  });

  it('handles bottom placed error', () => {
    const data = render({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId: '1_error',
    });

    expect(data.wrapper.prop('aria-invalid')).toBe(true);
    expect(data.wrapper.prop('aria-describedby')).toBe('1_error');
    expect(data.wrapper.hasClass('ds-c-field--error')).toBe(true);
    expect(data.wrapper).toMatchSnapshot();
  });

  it('has inversed theme', () => {
    const data = render({ inversed: true });

    expect(data.wrapper.hasClass('ds-c-field--inverse')).toBe(true);
  });

  it('has a defaultValue', () => {
    const data = render({ defaultValue: 'Yay' });

    expect(data.wrapper.prop('defaultValue')).toBe(data.props.defaultValue);
    expect(data.wrapper.prop('value')).toBeUndefined();
  });

  it('has a value', () => {
    const data = render({ value: 'Yay' });

    expect(data.wrapper.prop('value')).toBe(data.props.value);
    expect(data.wrapper.prop('defaultValue')).toBeUndefined();
  });

  it('shows 5 rows of text', () => {
    const data = render({
      multiline: true,
      rows: 5,
    });

    expect(data.wrapper.prop('rows')).toBe(data.props.rows);
  });

  it('adds className to field', () => {
    const data = render({ fieldClassName: 'bar' });

    expect(data.wrapper.hasClass('ds-c-field')).toBe(true);
    expect(data.wrapper.hasClass('bar')).toBe(true);
  });

  it('adds size classes to input', () => {
    const mediumData = render({ size: 'medium' });
    const mediumField = mediumData.wrapper.find('.ds-c-field').first();
    const smallData = render({ size: 'small' });
    const smallField = smallData.wrapper.find('.ds-c-field').first();

    expect(mediumField.hasClass('ds-c-field--medium')).toBe(true);
    expect(smallField.hasClass('ds-c-field--small')).toBe(true);
  });

  it('adds min/max input attributes', () => {
    const data = render({
      max: 10,
      min: 1,
    });

    expect(data.wrapper.prop('max')).toBe(data.props.max);
    expect(data.wrapper.prop('min')).toBe(data.props.min);
  });

  it('adds aria-label attribute', () => {
    const data = render({
      ariaLabel: 'Foo',
    });

    expect(data.wrapper.prop('aria-label')).toBe(data.props.ariaLabel);
  });

  it('adds undocumented prop to input field', () => {
    const data = render({
      'data-foo': 'bar',
    });

    expect(data.wrapper.prop('data-foo')).toBe(data.props['data-foo']);
  });

  describe('event handlers', () => {
    let data;

    beforeEach(() => {
      data = render({
        onBlur: jest.fn(),
        onChange: jest.fn(),
      });
    });

    it('calls onBlur', () => {
      data.wrapper.find('.ds-c-field').first().simulate('blur');

      expect(data.props.onBlur.mock.calls.length).toBe(1);
    });

    it('calls onChange', () => {
      data.wrapper.find('.ds-c-field').first().simulate('change');

      expect(data.props.onChange.mock.calls.length).toBe(1);
    });
  });
});
