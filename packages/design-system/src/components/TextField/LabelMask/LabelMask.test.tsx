import React, { useState } from 'react';
import LabelMask, { BuiltInMask } from './LabelMask';
import { render, fireEvent } from '@testing-library/react';

const TestLabelMask = () => {
  const [value, setValue] = useState('');
  return (
    <LabelMask labelMask={BuiltInMask.DATE}>
      <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    </LabelMask>
  );
};

describe('Label mask', function () {
  it('renders default date mask, MM/DD/YYYY, when no input value set', () => {
    const { container, asFragment } = render(<TestLabelMask />);
    const mask = container.querySelector('.ds-c-label-mask__mask--active');
    const input = container.querySelector('input');

    expect(input.value).toBe('');
    expect(mask.textContent).toBe('MM/DD/YYYY');

    expect(asFragment()).toMatchSnapshot();
  });
  describe('updates label mask to reflect', () => {
    it('complete input value set', () => {
      const { container, asFragment } = render(<TestLabelMask />);
      const data = '12345678';
      const maskText = '12/34/5678';

      const mask = container.querySelector('.ds-c-label-mask__mask--active');
      const input = container.querySelector('input');

      fireEvent.change(input, { target: { value: data } });

      expect(input).toHaveValue(data);
      expect(mask.textContent).toBe(maskText);

      expect(asFragment()).toMatchSnapshot();
    });
    it('partial input value set', () => {
      const { container, asFragment } = render(<TestLabelMask />);
      const data = '1234';

      const mask = container.querySelector('.ds-c-label-mask__mask--active');
      const input = container.querySelector('input');

      fireEvent.change(input, { target: { value: data } });

      expect(input).toHaveValue(data);
      expect(mask.textContent).toBe('12/34/YYYY');

      expect(asFragment()).toMatchSnapshot();
    });
    it('padded values when incomplete input value set', () => {
      const { container, asFragment } = render(<TestLabelMask />);
      const data = '1';
      const maskText = '01/DD/YYYY';

      const mask = container.querySelector('.ds-c-label-mask__mask--active');
      const input = container.querySelector('input');

      fireEvent.change(input, { target: { value: data } });

      expect(input).toHaveValue(data);
      expect(mask.textContent).toBe(maskText);

      expect(asFragment()).toMatchSnapshot();
    });
  });
  it('formats input value onBlur', () => {
    const { container, asFragment } = render(<TestLabelMask />);
    const data = '12345678';
    const formattedData = '12/34/5678';

    const input = container.querySelector('input');

    fireEvent.change(input, { target: { value: data } });
    fireEvent.blur(input);

    expect(input).toHaveValue(formattedData);

    expect(asFragment()).toMatchSnapshot();
  });
});
