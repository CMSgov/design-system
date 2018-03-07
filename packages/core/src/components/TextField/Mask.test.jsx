import { mount, shallow } from 'enzyme';
import Mask from './Mask';
import React from 'react';

function render(customProps = {}, inputProps = {}, deep = false) {
  const component = (
    <Mask {...customProps}>
      <input name="foo" type="text" {...inputProps} />
    </Mask>
  );

  return {
    props: customProps,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('Mask', function() {
  it('calls onBlur when the value is the same', () => {
    const onBlur = jest.fn();
    const wrapper = render(
      { mask: 'currency' },
      { value: '123', onBlur: onBlur }
    ).wrapper;

    wrapper.simulate('blur', { target: { value: '123' }, persist: jest.fn() });

    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('calls onBlur when the value changes', () => {
    const onBlur = jest.fn();
    const wrapper = render(
      { mask: 'currency' },
      { value: '123', onBlur: onBlur },
      true
    ).wrapper;

    wrapper
      .find('input')
      .simulate('blur', { target: { value: '1234' }, persist: jest.fn() });

    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const wrapper = render(
      { mask: 'currency' },
      { value: '123', onChange: onChange }
    ).wrapper;

    wrapper.simulate('change', { target: { value: '123' } });

    expect(onChange.mock.calls.length).toBe(1);
  });

  describe('Currency', () => {
    it('renders a blank controlled field when value is empty', () => {
      const data = render({ mask: 'currency' }, { value: '' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('');
    });

    it('renders a blank controlled field when value is null', () => {
      const data = render({ mask: 'currency' }, { value: null });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('');
    });

    it('renders a blank controlled field when value is undefined', () => {
      const data = render({ mask: 'currency' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('');
    });

    it('accepts already masked value', () => {
      const data = render({ mask: 'currency' }, { value: '1,234.50' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('1,234.50');
    });

    it('adds commas to value with decimal ending in 0', () => {
      const data = render({ mask: 'currency' }, { value: '12345678.90' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12,345,678.90');
    });

    it('adds commas to value with decimal ending in non-zero number', () => {
      const data = render({ mask: 'currency' }, { value: '1234.95' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('1,234.95');
    });

    it('adds commas to value with no decimal', () => {
      const data = render({ mask: 'currency' }, { value: '1234' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('1,234');
    });

    it('adds commas to defaultValue and replaces with value prop', () => {
      const data = render(
        { mask: 'currency' },
        { defaultValue: '12345678.90' }
      );
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12,345,678.90');
    });
  });
});
