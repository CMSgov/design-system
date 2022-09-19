import React from 'react';
import useLabelMask, { DATE_MASK } from './useLabelMask';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';

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

  function renderUseLabelMask(inputProps = {}) {
    return renderHook(() => useLabelMask(DATE_MASK, { ...defaultInputProps, ...inputProps }));
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
});
