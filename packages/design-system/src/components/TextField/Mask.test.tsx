import Mask from './Mask';
import { useState } from 'react';
import { unmaskValue } from './maskHelpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Some tests are generated. When a new mask is added, add it here:
const masks = ['currency', 'ssn', 'zip', 'phone'];

function renderMask(customProps = {}, inputProps = {}) {
  return render(
    <Mask {...customProps}>
      <input name="foo" type="text" {...inputProps} />
    </Mask>
  );
}

function getInput() {
  return screen.getByRole('textbox') as HTMLInputElement;
}

describe('Mask', function () {
  masks.forEach((mask) => {
    describe(`${mask} fallbacks`, () => {
      it('renders a blank controlled field when value is empty', () => {
        renderMask({ mask: mask }, { value: '' });
        expect(getInput().value).toBe('');
      });

      it('renders a blank controlled field when value is null', () => {
        renderMask({ mask: mask }, { value: null });
        expect(getInput().value).toBe('');
      });

      it('renders a blank controlled field when value is undefined', () => {
        renderMask({ mask: mask });
        expect(getInput().value).toBe('');
      });
    });
  });

  it('renders mask', () => {
    const { asFragment } = renderMask({ mask: 'ssn' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders mask overlay', () => {
    const { asFragment } = renderMask({ mask: 'currency' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls onBlur when the value is the same', () => {
    const onBlur = jest.fn();
    renderMask({ mask: 'currency' }, { value: '123', onBlur });
    userEvent.click(getInput());
    userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    renderMask({ mask: 'currency' }, { value: '123', onChange });
    userEvent.type(getInput(), 'hello');
    expect(onChange).toHaveBeenCalledTimes('hello'.length);
  });

  it('changes to a controlled field using defaultValue', () => {
    renderMask({ mask: 'currency' }, { defaultValue: '1234' });
    expect(getInput().value).toBe('1,234');
  });

  describe('Controlled component behavior', () => {
    it('will not cause masking until blur when value prop still matches unmasked input', () => {
      // Simulate the change bubbling up to the controlling component and the
      // controlling component then updating the value prop.
      function ControlledComponentParent() {
        const [text, setText] = useState('1000');
        return (
          <Mask mask="currency">
            <input
              name="foo"
              type="text"
              value={text}
              onChange={(event) => setText(unmaskValue(event.target.value, 'currency'))}
            />
          </Mask>
        );
      }

      render(<ControlledComponentParent />);
      expect(getInput().value).toBe('1,000');

      // Remove the comma
      userEvent.type(getInput(), '{arrowleft}{arrowleft}{arrowleft}{backspace}');
      expect(getInput().value).toBe('1000');

      userEvent.tab();
      expect(getInput().value).toBe('1,000');
    });

    it('will change the value of the input when value prop changes (beyond unmasked/masked differences)', () => {
      // Simulate a prop change coming from the parent that makes the value entirely different
      function ControlledComponentParent() {
        const [text, setText] = useState('1000');
        return (
          <Mask mask="currency">
            <input name="foo" type="text" value={text} onChange={() => setText('2000')} />
          </Mask>
        );
      }

      render(<ControlledComponentParent />);
      expect(getInput().value).toBe('1,000');

      // Same thing we did in the previous test
      // Remove the comma
      userEvent.type(getInput(), '{arrowleft}{arrowleft}{arrowleft}{backspace}');
      // But this time the parent changed the value to 2000, so we expect it to be masked
      expect(getInput().value).toBe('2,000');
    });
  });

  describe('Currency', () => {
    // testComponent tests the entire <Mask mask="currency"> component
    // others will simply test the formatting function, toCurrency
    const testComponent = (value, expected) => {
      renderMask({ mask: 'currency' }, { value });
      expect(getInput().value).toBe(expected);
    };

    it('does not mask if value is empty string', () => testComponent('', ''));

    it('does not mask if value does not contain at least one digit', () =>
      testComponent('abcABC!@#', 'abcABC!@#'));

    it('will mask value as long as there is at least one digit', () => testComponent('a1!', '1'));
  });

  describe('Phone', () => {
    it('accepts partial phone #', () => {
      renderMask({ mask: 'phone' }, { value: '123' });
      expect(getInput().value).toBe('123');
    });

    it('accepts unexpectedly long value', () => {
      renderMask({ mask: 'phone' }, { value: '123456789000' });
      // Yes, this is invalid, but it should be up to to the app
      // to surface an error in these cases. The mask shouldn't
      // be changing the raw value a user has entered.
      expect(getInput().value).toBe('123-456-789000');
    });

    it('accepts masked phone #', () => {
      renderMask({ mask: 'phone' }, { value: '123-456-7890' });
      expect(getInput().value).toBe('123-456-7890');
    });

    it('masks phone #', () => {
      renderMask({ mask: 'phone' }, { value: '1234567890' });
      expect(getInput().value).toBe('123-456-7890');
    });
  });

  describe('SSN', () => {
    it('accepts partial ssn', () => {
      renderMask({ mask: 'ssn' }, { value: '123' });
      expect(getInput().value).toBe('123');
    });

    it('accepts unexpectedly long value', () => {
      renderMask({ mask: 'ssn' }, { value: '1234567890' });
      expect(getInput().value).toBe('123-45-67890');
    });

    it('accepts masked ssn', () => {
      renderMask({ mask: 'ssn' }, { value: '123-45-6789' });
      expect(getInput().value).toBe('123-45-6789');
    });

    it('accepts ssn masked with different characters', () => {
      renderMask({ mask: 'ssn' }, { value: '123 45 6789' });
      expect(getInput().value).toBe('123-45-6789');
    });

    it('accepts obfuscated ssns', () => {
      renderMask({ mask: 'ssn' }, { value: '*****6789' });
      expect(getInput().value).toBe('***-**-6789');
    });

    it('accepts masked, obfuscated ssns', () => {
      renderMask({ mask: 'ssn' }, { value: '***-**-6789' });
      expect(getInput().value).toBe('***-**-6789');
    });

    it('masks full ssn', () => {
      renderMask({ mask: 'ssn' }, { value: '123456789' });
      expect(getInput().value).toBe('123-45-6789');
    });

    it('masks partial (5) ssn', () => {
      renderMask({ mask: 'ssn' }, { value: '12345' });
      expect(getInput().value).toBe('123-45');
    });

    it('masks partial (7) ssn', () => {
      renderMask({ mask: 'ssn' }, { value: '1234567' });
      expect(getInput().value).toBe('123-45-67');
    });
  });

  describe('Zip code', () => {
    it('accepts partial zip code', () => {
      renderMask({ mask: 'zip' }, { value: '123' });
      expect(getInput().value).toBe('123');
    });

    it('accepts unexpectedly long value', () => {
      renderMask({ mask: 'zip' }, { value: '1234567890' });
      expect(getInput().value).toBe('12345-67890');
    });

    it('accepts five-digit zip code', () => {
      renderMask({ mask: 'zip' }, { value: '12345' });
      expect(getInput().value).toBe('12345');
    });

    it('accepts five-digits with bad extra chars', () => {
      renderMask({ mask: 'zip' }, { value: '1234-5' });
      expect(getInput().value).toBe('12345');
    });

    it('accepts nine-digits with bad extra chars', () => {
      renderMask({ mask: 'zip' }, { value: '1234-5-67-89' });
      expect(getInput().value).toBe('12345-6789');
    });

    it('accepts nine-digit zip code', () => {
      renderMask({ mask: 'zip' }, { value: '123456789' });
      expect(getInput().value).toBe('12345-6789');
    });

    it('accepts partial +4 zip code', () => {
      renderMask({ mask: 'zip' }, { value: '1234567' });
      expect(getInput().value).toBe('12345-67');
    });

    it('accepts masked nine-digit zip code', () => {
      renderMask({ mask: 'zip' }, { value: '12345-6789' });
      expect(getInput().value).toBe('12345-6789');
    });
  });
});
