import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import LabelMask from './LabelMask';
import {
  CURRENCY_MASK,
  DATE_MASK,
  MaskFunction,
  PHONE_MASK,
  SSN_MASK,
  ZIP_MASK,
} from './useLabelMask';

describe('LabelMask (child structure)', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it('renders correctly when a single valid child is provided', () => {
    const { getByRole } = render(
      <LabelMask labelMask={PHONE_MASK}>
        <input type="text" name="phone" value="" />
      </LabelMask>
    );

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('throws when multiple children are provided', () => {
    expect(() =>
      render(
        <LabelMask labelMask={PHONE_MASK}>
          <input type="text" name="phone1" value="" />
          <input type="text" name="phone2" value="" />
        </LabelMask>
      )
    ).toThrow();
  });

  it('throws when non-element children are provided (e.g., string or null)', () => {
    expect(() =>
      render(<LabelMask labelMask={PHONE_MASK}>{'not a input element'}</LabelMask>)
    ).toThrow();
  });
});

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

const renderLabelMask = (mask: MaskFunction) => {
  return {
    user: userEvent.setup(),
    ...render(<TestLabelMask mask={mask} />),
  };
};

allMasks.forEach((currentMask) => {
  describe(`${currentMask.name} Label mask`, function () {
    it(`renders default mask, ${currentMask.default}, when no input value set`, () => {
      const { container } = renderLabelMask(currentMask.mask);

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
      it('complete input value set', async () => {
        const { container, user } = renderLabelMask(currentMask.mask);
        const data = currentMask.defaultData;
        const maskText = currentMask.defaultResult;

        const mask = container.querySelector('.ds-c-label-mask');
        const input = container.querySelector('input');

        await act(async () => {
          await user.type(input, data);
        });

        expect(input).toHaveValue(data);
        expect(mask.textContent).toContain(maskText);
      });

      it('partial input value set', async () => {
        const { container, user } = renderLabelMask(currentMask.mask);
        const data = currentMask.partialData;

        const mask = container.querySelector('.ds-c-label-mask');
        const input = container.querySelector('input');

        await act(async () => {
          await user.type(input, data);
        });

        expect(input).toHaveValue(data);
        expect(mask.textContent).toContain(currentMask.partialResult);
      });
    });

    it('formats input value onBlur', async () => {
      const { container, user } = renderLabelMask(currentMask.mask);
      const data = currentMask.defaultData;
      const formattedData = currentMask.defaultResultBlur ?? currentMask.defaultResult;

      const input = container.querySelector('input');

      await act(async () => {
        await user.type(input, data);
      });

      await act(async () => {
        await user.tab();
      });

      expect(input).toHaveValue(formattedData);
    });
  });
});
