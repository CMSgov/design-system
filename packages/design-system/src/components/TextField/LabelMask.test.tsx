import React from 'react';
import { useState } from 'react';
import LabelMask from './LabelMask';
import { DATE_MASK } from './index';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const TestLabelMask = () => {
  const [value, setValue] = useState('');
  return (
    <LabelMask labelMask={DATE_MASK}>
      <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
    </LabelMask>
  );
};

describe('Label mask', function () {
  it('renders default date mask, MM/DD/YYYY, when no input value set', () => {
    const { container, asFragment } = render(<TestLabelMask />);
    const mask = container.querySelector('.ds-c-label-mask');
    const input = container.querySelector('input');

    expect(input.value).toBe('');
    expect(mask.textContent).toContain('MM/DD/YYYY');

    expect(asFragment()).toMatchSnapshot();
  });
  describe('updates label mask to reflect', () => {
    it('complete input value set', () => {
      const { container } = render(<TestLabelMask />);
      const data = '12345678';
      const maskText = '12/34/5678';

      const mask = container.querySelector('.ds-c-label-mask');
      const input = container.querySelector('input');

      userEvent.type(input, data);

      expect(input).toHaveValue(data);
      expect(mask.textContent).toContain(maskText);
    });
    it('partial input value set', () => {
      const { container } = render(<TestLabelMask />);
      const data = '1234';

      const mask = container.querySelector('.ds-c-label-mask');
      const input = container.querySelector('input');

      userEvent.type(input, data);

      expect(input).toHaveValue(data);
      expect(mask.textContent).toContain('12/34/YYYY');
    });
    it('padded values when incomplete input value set', () => {
      const { container } = render(<TestLabelMask />);
      const data = '1';
      const maskText = '01/DD/YYYY';

      const mask = container.querySelector('.ds-c-label-mask');
      const input = container.querySelector('input');

      userEvent.type(input, data);

      expect(input).toHaveValue(data);
      expect(mask.textContent).toContain(maskText);
    });
  });
  it('formats input value onBlur', () => {
    const { container } = render(<TestLabelMask />);
    const data = '12345678';
    const formattedData = '12/34/5678';

    const input = container.querySelector('input');

    userEvent.type(input, data);
    userEvent.tab();

    expect(input).toHaveValue(formattedData);
  });
});
