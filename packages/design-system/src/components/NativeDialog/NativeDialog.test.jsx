import NativeDialog from './NativeDialog';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Should testing be done here or within child components?

describe('NativeDialog', function () {
  it('renders with correct classNames', () => {
    // Does it accept dialog or drawer classes when prop set?
  });
  it('accepts additional classNames', () => {
    // Can user add their own class?
  });
  it('provides appropriate open function', () => {
    // Does it open correctly for modal and drawer?
  });
  it('provides correct focus-trap', () => {
    // Does it trap focus if prop set?
  });
  it('provides close function', {
    // Does it close when called?
  });
});
