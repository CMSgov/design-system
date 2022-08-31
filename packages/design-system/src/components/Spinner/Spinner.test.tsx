import React from 'react';
import Spinner from './Spinner';
import { render, screen } from '@testing-library/react';

function renderSpinner(customProps = {}) {
  return render(<Spinner {...customProps} />);
}

describe('Spinner', () => {
  it('renders spinner', () => {
    renderSpinner();
    const spinnerEl = screen.getByRole('status');

    expect(spinnerEl).toBeDefined();
    expect(spinnerEl).toMatchSnapshot();
  });

  it('returns correct default props', () => {
    renderSpinner();
    const spinnerEl = screen.getByRole('status');

    expect(spinnerEl.textContent).toEqual('Loading');
  });

  it('returns default class names', () => {
    renderSpinner();
    const spinnerEl = screen.getByRole('status');

    expect(spinnerEl.classList).toContain('ds-c-spinner');
    expect(spinnerEl.classList).not.toContain('ds-c-spinner--inverse');
    expect(spinnerEl.classList).not.toContain('ds-c-spinner--filled');
  });

  it('adds additional class names', () => {
    renderSpinner({
      inversed: true,
      filled: true,
      size: 'small',
      className: 'test-class',
    });
    const spinnerEl = screen.getByRole('status');

    expect(spinnerEl.classList).toContain('ds-c-spinner--inverse');
    expect(spinnerEl.classList).toContain('ds-c-spinner--filled');
    expect(spinnerEl.classList).toContain('ds-c-spinner--small');
    expect(spinnerEl.classList).toContain('test-class');
  });

  it('does not add the wrong class name for size prop', () => {
    renderSpinner({ size: 'big' });
    const spinnerEl = screen.getByRole('status');

    expect(spinnerEl.classList).toContain('ds-c-spinner--big');
    expect(spinnerEl.classList).not.toContain('ds-c-spinner--small');
  });

  it('uses aria-valuetext if provided', () => {
    renderSpinner({ 'aria-valuetext': 'Fetching...' });
    const spinnerEl = screen.getByRole('status');

    expect(spinnerEl.textContent).toEqual('Fetching...');
  });

  it('uses provided role', () => {
    renderSpinner({ role: 'alert' });
    const spinnerEl = screen.getByRole('alert');

    expect(spinnerEl).toBeDefined();
  });
});
