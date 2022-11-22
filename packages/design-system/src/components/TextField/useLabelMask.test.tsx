import React from 'react';
import useLabelMask, {
  DATE_MASK,
  SSN_MASK,
  PHONE_MASK,
  ZIP_MASK,
  CURRENCY_MASK,
  MaskFunction,
} from './useLabelMask';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

describe('SSN_MASK', () => {
  it('returns just the mask when given no input', () => {
    expect(SSN_MASK('')).toEqual('###-##-####');
  });

  it('masks complete social security numbers', () => {
    expect(SSN_MASK('123-45-6789')).toEqual('123-45-6789');
    expect(SSN_MASK('123 45 6789')).toEqual('123-45-6789');
    expect(SSN_MASK('123456789')).toEqual('123-45-6789');
    expect(SSN_MASK('123.45.6789')).toEqual('123-45-6789');
  });

  it('masks incomplete social security numbers', () => {
    expect(SSN_MASK('123')).toEqual('123-##-####');
    expect(SSN_MASK('1234')).toEqual('123-4#-####');
    expect(SSN_MASK('1234567')).toEqual('123-45-67##');
  });

  it('handles valueOnly parameter', () => {
    expect(SSN_MASK('123', true)).toEqual('123');
    expect(SSN_MASK('12345', true)).toEqual('123-45');
    expect(SSN_MASK('1234567', true)).toEqual('123-45-67');
  });
});

describe('ZIP_MASK', () => {
  it('returns just the mask when given no input', () => {
    expect(ZIP_MASK('')).toEqual('#####');
  });

  it('masks complete zip codes', () => {
    expect(ZIP_MASK('12345')).toEqual('12345');
  });

  it('masks incomplete social zip codes', () => {
    expect(ZIP_MASK('1')).toEqual('1####');
    expect(ZIP_MASK('12')).toEqual('12###');
    expect(ZIP_MASK('123')).toEqual('123##');
    expect(ZIP_MASK('1234')).toEqual('1234#');
  });

  it('handles valueOnly parameter', () => {
    expect(ZIP_MASK('1', true)).toEqual('1');
    expect(ZIP_MASK('12', true)).toEqual('12');
    expect(ZIP_MASK('123', true)).toEqual('123');
  });
});

describe('CURRENCY_MASK', () => {
  it('returns just the mask when given no input', () => {
    expect(CURRENCY_MASK('')).toEqual('$0.00');
  });

  it('returns correctly formatted dollar amounts', () => {
    expect(CURRENCY_MASK('1')).toEqual('$1.00');
    expect(CURRENCY_MASK('12.479')).toEqual('$12.47');
    expect(CURRENCY_MASK('123456789')).toEqual('$123,456,789.00');
    expect(CURRENCY_MASK('0.05')).toEqual('$0.05');
    expect(CURRENCY_MASK('$25')).toEqual('$25.00');
    expect(CURRENCY_MASK('2,300.4')).toEqual('$2,300.40');
    expect(CURRENCY_MASK('-400')).toEqual('-$400.00');
    expect(CURRENCY_MASK('ABCD$500.22')).toEqual('$500.22');
    expect(CURRENCY_MASK('-2500,0.12')).toEqual('-$25,000.12');
  });
});

describe('PHONE_MASK', () => {
  it('returns just the mask when given no input', () => {
    expect(PHONE_MASK('')).toEqual('###-###-####');
  });

  it('masks complete us phone numbers', () => {
    expect(PHONE_MASK('2225551212')).toEqual('222-555-1212');
    expect(PHONE_MASK('222-555-1212')).toEqual('222-555-1212');
    expect(PHONE_MASK('(222)555-1212')).toEqual('222-555-1212');
    expect(PHONE_MASK('(222) 555-1212')).toEqual('222-555-1212');
    expect(PHONE_MASK('222.555.1212')).toEqual('222-555-1212');
    expect(PHONE_MASK('222 555 1212')).toEqual('222-555-1212');
  });

  it('masks incomplete phone numbers', () => {
    expect(PHONE_MASK('2')).toEqual('2##-###-####');
    expect(PHONE_MASK('222')).toEqual('222-###-####');
    expect(PHONE_MASK('22255')).toEqual('222-55#-####');
    expect(PHONE_MASK('2225551')).toEqual('222-555-1###');
  });

  it('handles valueOnly parameter', () => {
    expect(PHONE_MASK('222', true)).toEqual('222');
    expect(PHONE_MASK('222555', true)).toEqual('222-555');
    expect(PHONE_MASK('2225551212', true)).toEqual('222-555-1212');
  });
});

describe('DATE_MASK', () => {
  it('returns just the mask when given no input', () => {
    expect(DATE_MASK('')).toEqual('MM/DD/YYYY');
  });

  it('masks complete dates', () => {
    expect(DATE_MASK('01-02-2030')).toEqual('01/02/2030');
    expect(DATE_MASK('01 02 2030')).toEqual('01/02/2030');
    expect(DATE_MASK('01.02.2030')).toEqual('01/02/2030');
    expect(DATE_MASK('01/02/2030')).toEqual('01/02/2030');
    expect(DATE_MASK('01022030')).toEqual('01/02/2030');
  });

  it('masks incomplete dates', () => {
    expect(DATE_MASK('01')).toEqual('01/DD/YYYY');
    expect(DATE_MASK('1')).toEqual('01/DD/YYYY');
    expect(DATE_MASK('0102')).toEqual('01/02/YYYY');
    expect(DATE_MASK('012')).toEqual('01/02/YYYY');
    expect(DATE_MASK('0112')).toEqual('01/12/YYYY');
    expect(DATE_MASK('011220')).toEqual('01/12/20YY');
  });

  it('pads zeros', () => {
    expect(DATE_MASK('1-2-2030')).toEqual('01/02/2030');
    expect(DATE_MASK('1-02-2030')).toEqual('01/02/2030');
    expect(DATE_MASK('01-2-2030')).toEqual('01/02/2030');
    expect(DATE_MASK('1')).toEqual('01/DD/YYYY');
  });

  it('handles valueOnly parameter', () => {
    expect(DATE_MASK('01', true)).toEqual('01');
    expect(DATE_MASK('1', true)).toEqual('01');
    expect(DATE_MASK('0102', true)).toEqual('01/02');
    expect(DATE_MASK('012', true)).toEqual('01/02');
    expect(DATE_MASK('0112', true)).toEqual('01/12');
    expect(DATE_MASK('011220', true)).toEqual('01/12/20');
    expect(DATE_MASK('01-2-2030', true)).toEqual('01/02/2030');
  });
});

describe('useLabelMask', () => {
  const defaultInputProps = { type: 'text', value: '' };

  function renderInput(props = {}) {
    return render(<input {...props} />);
  }

  function renderUseLabelMask(inputProps = {}, mask: MaskFunction = DATE_MASK) {
    return renderHook(() => useLabelMask(mask, { ...defaultInputProps, ...inputProps }));
  }

  it('returns labelMask and input elements', () => {
    const { result } = renderUseLabelMask();
    const { labelMask, inputProps } = result.current;
    expect(render(labelMask).asFragment()).toMatchSnapshot();
    expect(renderInput(inputProps).asFragment()).toMatchSnapshot();
  });

  it('shows masked value when focused', () => {
    const { result } = renderUseLabelMask({ value: '12' });
    renderInput(result.current.inputProps);
    userEvent.click(screen.getByRole('textbox'));
    expect(render(result.current.labelMask).asFragment()).toMatchSnapshot();
  });

  it('shows unfilled mask when not focused', () => {
    const { result } = renderUseLabelMask({ value: '12250001' });
    renderInput(result.current.inputProps);
    userEvent.click(screen.getByRole('textbox'));
    userEvent.tab();
    expect(render(result.current.labelMask).asFragment()).toMatchSnapshot();
  });

  it('renders the appropriate dom for a PHONE_MASK', () => {
    const { result } = renderUseLabelMask({}, PHONE_MASK);
    expect(render(result.current.labelMask).asFragment()).toMatchSnapshot();
  });
  it('renders the appropriate dom for a ZIP_MASK', () => {
    const { result } = renderUseLabelMask({}, ZIP_MASK);
    expect(render(result.current.labelMask).asFragment()).toMatchSnapshot();
  });
  it('renders the appropriate dom for a SSN_MASK', () => {
    const { result } = renderUseLabelMask({}, SSN_MASK);
    expect(render(result.current.labelMask).asFragment()).toMatchSnapshot();
  });
  it('renders the appropriate dom for a CURRENCY_MASK', () => {
    const { result } = renderUseLabelMask({}, CURRENCY_MASK);
    expect(render(result.current.labelMask).asFragment()).toMatchSnapshot();
  });
});
