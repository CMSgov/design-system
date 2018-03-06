import { mount, shallow } from 'enzyme';
import Mask from './Mask';
import React from 'react';

function render(customProps = {}, inputProps = {}, deep = false) {
  const props = Object.assign({}, customProps);
  const component = (
    <Mask {...props}>
      <input name="foo" type="text" {...inputProps} />
    </Mask>
  );

  return {
    props: props,
    wrapper: deep ? mount(component) : shallow(component)
  };
}

describe('Mask', function() {
  it('calls onBlur', () => {
    const onBlur = jest.fn();
    const wrapper = render(
      { mask: 'currency' },
      { value: '123', onBlur: onBlur }
    ).wrapper;

    wrapper.simulate('blur', { target: { value: '123' } });

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
