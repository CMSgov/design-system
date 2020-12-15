import { mount, shallow } from 'enzyme';
import React from 'react';
import TextInput from './TextInput';

const defaultProps = {
  name: 'spec-field',
  setRef: jest.fn(),
  id: '1',
  type: 'text',
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
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.is('input')).toBe(true);
    expect(field.prop('rows')).toBeUndefined();
    expect(data.wrapper).toMatchSnapshot();
  });

  it('is a textarea', () => {
    const data = render({ multiline: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.is('textarea')).toBe(true);
    expect(field.prop('rows')).toBeUndefined();
    expect(field.prop('type')).toBeUndefined();
    expect(data.wrapper).toMatchSnapshot();
  });

  it('is a password field', () => {
    const data = render({ type: 'password' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('type')).toBe('password');
  });

  it('is disabled', () => {
    const data = render({ disabled: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('disabled')).toBe(data.props.disabled);
  });

  it('has error', () => {
    const data = render({ errorMessage: 'Error' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.hasClass('ds-c-field--error')).toBe(true);
  });

  it('has inversed theme', () => {
    const data = render({ inversed: true });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.hasClass('ds-c-field--inverse')).toBe(true);
  });

  it('has a defaultValue', () => {
    const data = render({ defaultValue: 'Yay' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('defaultValue')).toBe(data.props.defaultValue);
    expect(field.prop('value')).toBeUndefined();
  });

  it('has a value', () => {
    const data = render({ value: 'Yay' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('value')).toBe(data.props.value);
    expect(field.prop('defaultValue')).toBeUndefined();
  });

  it('shows 5 rows of text', () => {
    const data = render({
      multiline: true,
      rows: 5,
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('rows')).toBe(data.props.rows);
  });

  it('adds className to field', () => {
    const data = render({ className: 'bar' });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.hasClass('ds-c-field')).toBe(true);
    expect(field.hasClass('bar')).toBe(true);
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
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('max')).toBe(data.props.max);
    expect(field.prop('min')).toBe(data.props.min);
  });

  it('adds aria-label attribute', () => {
    const data = render({
      ariaLabel: 'Foo',
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('aria-label')).toBe(data.props.ariaLabel);
  });

  it('adds undocumented prop to input field', () => {
    const data = render({
      'data-foo': 'bar',
    });
    const field = data.wrapper.find('.ds-c-field').first();

    expect(field.prop('data-foo')).toBe(data.props['data-foo']);
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

  describe('masks', () => {
    it('renders TextInput', () => {
      const data = render();

      expect(data.wrapper).toMatchSnapshot();
    });

    it('renders currency mask', () => {
      const data = render({
        mask: 'currency',
      });

      expect(data.wrapper).toMatchSnapshot();
    });

    it('updates input classes when props are updated', () => {
      const wrapper = render({ mask: 'currency' }, true).wrapper;

      expect(wrapper.find('input').hasClass('ds-c-field--error')).toBe(false);

      wrapper.setProps({ errorMessage: 'Oh no' });

      expect(wrapper.find('input').hasClass('ds-c-field--error')).toBe(true);
    });
  });
});
