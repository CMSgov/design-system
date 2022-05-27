import { DATE_MASK } from './useLabelMask';
// import {renderHook} from '@testing-library/react'

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
