import Mask, { unmaskValue } from './Mask';
import { mount, shallow } from 'enzyme';
import React from 'react';

// Some tests are generated. When a new mask is added, add it here:
const masks = ['currency', 'ssn', 'zip', 'phone'];

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
  masks.forEach(mask => {
    describe(`${mask} fallbacks`, () => {
      it('renders a blank controlled field when value is empty', () => {
        const data = render({ mask: mask }, { value: '' });
        const input = data.wrapper.find('input');

        expect(input.prop('value')).toBe('');
      });

      it('renders a blank controlled field when value is null', () => {
        const data = render({ mask: mask }, { value: null });
        const input = data.wrapper.find('input');

        expect(input.prop('value')).toBe('');
      });

      it('renders a blank controlled field when value is undefined', () => {
        const data = render({ mask: mask });
        const input = data.wrapper.find('input');

        expect(input.prop('value')).toBe('');
      });
    });
  });

  it('renders mask', () => {
    const data = render({
      mask: 'ssn'
    });

    expect(data.wrapper).toMatchSnapshot();
  });

  it('renders mask overlay', () => {
    const data = render({
      mask: 'currency'
    });

    expect(data.wrapper).toMatchSnapshot();
  });

  it('calls onBlur when the value is the same', () => {
    const onBlur = jest.fn();
    const wrapper = render({ mask: 'currency' }, { value: '123', onBlur: onBlur }).wrapper;
    const input = wrapper.find('input');

    input.simulate('blur', { target: { value: '123' }, persist: jest.fn() });

    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('calls onBlur when the value changes', () => {
    const onBlur = jest.fn();
    const wrapper = render({ mask: 'currency' }, { value: '123', onBlur: onBlur }).wrapper;

    // The wrapper is actually the input element that it renders
    wrapper
      .find('input')
      .props()
      .onBlur({ target: { value: '1234' }, persist: jest.fn() });

    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const wrapper = render({ mask: 'currency' }, { value: '123', onChange: onChange }).wrapper;
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: '123' } });

    expect(onChange.mock.calls.length).toBe(1);
  });

  it('changes to a controlled field using defaultValue', () => {
    const data = render({ mask: 'currency' }, { defaultValue: '1234' });
    const input = data.wrapper.find('input');

    expect(input.prop('value')).toBe('1,234');
  });

  describe('Controlled component behavior', () => {
    it('will not cause masking until blur when value prop still matches unmasked input', () => {
      const onChange = event => {
        // Simulate the change bubbling up to the controlling component and the
        // controlling component then updating the value prop.
        wrapper.setProps({
          children: (
            <input name="foo" type="text" value={unmaskValue(event.target.value, 'currency')} />
          )
        });
      };
      const { wrapper } = render({ mask: 'currency', onChange }, { value: '1000' });
      const input = () => wrapper.find('input');

      expect(input().prop('value')).toBe('1,000');

      input()
        .props()
        .onChange({ target: { value: '1,0000' } });
      expect(input().prop('value')).toBe('1,0000');

      input()
        .props()
        .onBlur({ target: { value: '1,0000' }, persist: jest.fn() });
      expect(input().prop('value')).toBe('10,000');
    });

    it('will change the value of the input when value prop changes (beyond unmasked/masked differences)', () => {
      const { wrapper } = render({ mask: 'currency' }, { value: '1000' });
      const input = () => wrapper.find('input');

      expect(input().prop('value')).toBe('1,000');
      // Make sure we can change the value
      wrapper.setProps({
        children: <input name="foo" type="text" value="2000" />
      });
      expect(input().prop('value')).toBe('2,000');
    });
  });

  describe('Currency', () => {
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

    it('accepts negative values', () => {
      const data = render({ mask: 'currency' }, { value: '-1,234' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('-1,234');
    });
  });

  describe('Phone', () => {
    it('accepts partial phone #', () => {
      const data = render({ mask: 'phone' }, { value: '123' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123');
    });

    it('accepts unexpectedly long value', () => {
      const data = render({ mask: 'phone' }, { value: '123456789000' });
      const input = data.wrapper.find('input');

      // Yes, this is invalid, but it should be up to to the app
      // to surface an error in these cases. The mask shouldn't
      // be changing the raw value a user has entered.
      expect(input.prop('value')).toBe('123-456-789000');
    });

    it('accepts masked phone #', () => {
      const data = render({ mask: 'phone' }, { value: '123-456-7890' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-456-7890');
    });

    it('masks phone #', () => {
      const data = render({ mask: 'phone' }, { value: '1234567890' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-456-7890');
    });
  });

  describe('SSN', () => {
    it('accepts partial ssn', () => {
      const data = render({ mask: 'ssn' }, { value: '123' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123');
    });

    it('accepts unexpectedly long value', () => {
      const data = render({ mask: 'ssn' }, { value: '1234567890' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-45-67890');
    });

    it('accepts masked ssn', () => {
      const data = render({ mask: 'ssn' }, { value: '123-45-6789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-45-6789');
    });

    it('accepts ssn masked with different characters', () => {
      const data = render({ mask: 'ssn' }, { value: '123 45 6789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-45-6789');
    });

    it('accepts obfuscated ssns', () => {
      const data = render({ mask: 'ssn' }, { value: '*****6789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('***-**-6789');
    });

    it('accepts masked, obfuscated ssns', () => {
      const data = render({ mask: 'ssn' }, { value: '***-**-6789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('***-**-6789');
    });

    it('masks full ssn', () => {
      const data = render({ mask: 'ssn' }, { value: '123456789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-45-6789');
    });

    it('masks partial (5) ssn', () => {
      const data = render({ mask: 'ssn' }, { value: '12345' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-45');
    });

    it('masks partial (7) ssn', () => {
      const data = render({ mask: 'ssn' }, { value: '1234567' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123-45-67');
    });
  });

  describe('Zip code', () => {
    it('accepts partial zip code', () => {
      const data = render({ mask: 'zip' }, { value: '123' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('123');
    });

    it('accepts unexpectedly long value', () => {
      const data = render({ mask: 'zip' }, { value: '1234567890' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345-67890');
    });

    it('accepts five-digit zip code', () => {
      const data = render({ mask: 'zip' }, { value: '12345' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345');
    });

    it('accepts five-digits with bad extra chars', () => {
      const data = render({ mask: 'zip' }, { value: '1234-5' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345');
    });

    it('accepts nine-digits with bad extra chars', () => {
      const data = render({ mask: 'zip' }, { value: '1234-5-67-89' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345-6789');
    });

    it('accepts nine-digit zip code', () => {
      const data = render({ mask: 'zip' }, { value: '123456789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345-6789');
    });

    it('accepts partial +4 zip code', () => {
      const data = render({ mask: 'zip' }, { value: '1234567' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345-67');
    });

    it('accepts masked nine-digit zip code', () => {
      const data = render({ mask: 'zip' }, { value: '12345-6789' });
      const input = data.wrapper.find('input');

      expect(input.prop('value')).toBe('12345-6789');
    });
  });
});

describe('unmaskValue', () => {
  it('returns value when mask is undefined', () => {
    expect(unmaskValue(' 1,234 Foo ')).toBe(' 1,234 Foo ');
  });

  it('returns value when mask is unknown', () => {
    expect(unmaskValue('1,234', 'foo')).toBe('1,234');
  });

  it('exits when value is undefined or null', () => {
    expect(unmaskValue()).toBeUndefined();
    expect(unmaskValue(null)).toBeNull();
  });

  it('returns same string back when there are no numeric characters in the value', () => {
    expect(unmaskValue('banana', 'currency')).toBe('banana');
    expect(unmaskValue('banana', 'zip')).toBe('banana');
    expect(unmaskValue('banana', 'ssn')).toBe('banana');
    expect(unmaskValue('banana', 'phone')).toBe('banana');
  });

  it('returns just the numbers when there is other garbage mixed in', () => {
    expect(unmaskValue('b4n4n4', 'currency')).toBe('444');
    expect(unmaskValue('b4n4n4', 'zip')).toBe('444');
    expect(unmaskValue('b4n4n4', 'ssn')).toBe('444');
    expect(unmaskValue('b4n4n4', 'phone')).toBe('444');

    expect(unmaskValue('a1.b2c3', 'currency')).toBe('1.23');
    expect(unmaskValue('1,,00.b', 'currency')).toBe('100.');
    expect(unmaskValue('1-1-1-2-3-4', 'zip')).toBe('111234');
    expect(unmaskValue('4---31', 'ssn')).toBe('431');
    expect(unmaskValue('--2-3444', 'phone')).toBe('23444');
  });

  it('removes mask from currency value', () => {
    const name = 'currency';

    expect(unmaskValue('', name)).toBe('');
    expect(unmaskValue(' 1,234 ', name)).toBe('1234'); // whitespace
    expect(unmaskValue('1,234', name)).toBe('1234');
    expect(unmaskValue('1,234.5', name)).toBe('1234.5');
    expect(unmaskValue('1,234,000.50', name)).toBe('1234000.50');
    expect(unmaskValue('-1,234,000.50', name)).toBe('-1234000.50');
  });

  it('removes mask from zip code', () => {
    const name = 'zip';

    expect(unmaskValue('', name)).toBe('');
    expect(unmaskValue(' 12345 ', name)).toBe('12345');
    expect(unmaskValue('12345-6789', name)).toBe('123456789');
  });

  it('removes mask from ssn value', () => {
    const name = 'ssn';

    expect(unmaskValue('', name)).toBe('');
    expect(unmaskValue(' 123-45-6789 ', name)).toBe('123456789');
    expect(unmaskValue('123456789', name)).toBe('123456789');
    expect(unmaskValue('***-**-6789', name)).toBe('*****6789');
  });

  it('removes mask from phone number', () => {
    const name = 'phone';

    expect(unmaskValue('', name)).toBe('');
    expect(unmaskValue(' 123-456-7890 ', name)).toBe('1234567890');
  });
});
