import React from 'react';
import { useState } from 'react';
import LabelMask from './LabelMask';
import {
  DATE_MASK,
  PHONE_MASK,
  ZIP_MASK,
  SSN_MASK,
  CURRENCY_MASK,
  MaskFunction,
} from './useLabelMask';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const allMasks = [
  {
    name: 'Date',
    mask: DATE_MASK,
    default: 'MM/DD/YYYY',
    defaultData: '04072022',
    defaultResult: '04/07/2022',
    partialData: '041',
    partialResult: '04/01/YYYY',
  },
  {
    name: 'Social Security Number',
    mask: SSN_MASK,
    default: '###-##-####',
    defaultData: '123456789',
    defaultResult: '123-45-6789',
    defaultResultBlur: '***-**-6789',
    partialData: '1234',
    partialResult: '123-4#-####',
  },
  {
    name: 'Phone Number',
    mask: PHONE_MASK,
    default: '###-###-####',
    defaultData: '1234567890',
    defaultResult: '123-456-7890',
    partialData: '1234',
    partialResult: '123-4##-####',
  },
  {
    name: 'US Zip Code',
    mask: ZIP_MASK,
    default: '#####',
    defaultData: '12345',
    defaultResult: '12345',
    partialData: '123',
    partialResult: '123##',
  },
  {
    name: 'US Currency',
    mask: CURRENCY_MASK,
    default: '$',
    defaultData: '12345.67',
    defaultResult: '$12,345.67',
    partialData: '123',
    partialResult: '$123',
  },
];

const TestLabelMask = (props: { mask: MaskFunction }) => {
  const { mask } = props;
  const [value, setValue] = useState('');
  return (
    <LabelMask labelMask={mask}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        id="static-id"
      />
    </LabelMask>
  );
};

allMasks.forEach((currentMask) => {
  describe(`${currentMask.name} Label mask`, function () {
    it(`renders default mask, ${currentMask.default}, when no input value set`, () => {
      const { container, asFragment } = render(<TestLabelMask mask={currentMask.mask} />);

      const input = container.querySelector('input');
      expect(input).toHaveValue('');
      expect(input).toHaveAttribute('inputmode', 'numeric');
      expect(input).toHaveAttribute('type', 'text');

      const mask = container.querySelector('.ds-c-label-mask');
      expect(mask.textContent).toContain(currentMask.default);
      expect(mask.firstChild.textContent).toContain(currentMask.default);
      expect(mask.lastChild).toHaveAttribute('aria-hidden', 'true');
      expect(mask.lastChild).toHaveClass('ds-u-display--none');
      expect(mask.lastChild.textContent).toContain(currentMask.default);
    });

    describe('updates label mask to reflect', () => {
      it('complete input value set', () => {
        const { container } = render(<TestLabelMask mask={currentMask.mask} />);
        const data = currentMask.defaultData;
        const maskText = currentMask.defaultResult;

        const mask = container.querySelector('.ds-c-label-mask');
        const input = container.querySelector('input');

        userEvent.type(input, data);

        expect(input).toHaveValue(data);
        expect(mask.textContent).toContain(maskText);
      });

      it('partial input value set', () => {
        const { container } = render(<TestLabelMask mask={currentMask.mask} />);
        const data = currentMask.partialData;

        const mask = container.querySelector('.ds-c-label-mask');
        const input = container.querySelector('input');

        userEvent.type(input, data);

        expect(input).toHaveValue(data);
        expect(mask.textContent).toContain(currentMask.partialResult);
      });
    });

    it('formats input value onBlur', () => {
      const { container } = render(<TestLabelMask mask={currentMask.mask} />);
      const data = currentMask.defaultData;
      const formattedData = currentMask.defaultResultBlur ?? currentMask.defaultResult;

      const input = container.querySelector('input');

      userEvent.type(input, data);
      userEvent.tab();

      expect(input).toHaveValue(formattedData);
    });
  });
});
