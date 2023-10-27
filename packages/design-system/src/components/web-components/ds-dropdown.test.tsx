import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import './ds-dropdown';

const defaultAttrs = {
  label: 'Dropdown label',
  options: JSON.stringify([
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ]),
};

function renderDropdown(attrs = {}) {
  return render(<ds-dropdown {...defaultAttrs} {...attrs} />);
}

describe('Button', () => {
  it('renders a dropdown', () => {
    const { asFragment } = renderDropdown();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled dropdown', () => {
    renderDropdown({ disabled: 'true' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('renders disabled', () => {
    renderDropdown({ disabled: 'true' });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('disabled');
  });

  it('does not render disabled when passed false', () => {
    renderDropdown({ disabled: 'false' });
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('disabled');
  });

  // it('applies additional classes', () => {
  //   renderDropdown({ 'class-name': 'foobar' });
  //   const button = screen.getByRole('button');
  //   expect(button.classList.contains('foobar')).toBe(true);
  // });

  // it('applies variation classes', () => {
  //   renderDropdown({ variation: 'solid' });
  //   const button = screen.getByRole('button');
  //   expect(button.classList.contains('ds-c-button--solid')).toBe(true);
  // });

  // it('applies size classes', () => {
  //   renderDropdown({ size: 'small' });
  //   const button = screen.getByRole('button');
  //   expect(button.classList.contains('ds-c-button--small')).toBe(true);
  // });

  // it('applies disabled, inverse, alternate, and variation classes together', () => {
  //   renderDropdown({
  //     href: '#!',
  //     disabled: true,
  //     'is-on-dark': true,
  //     'is-alternate': true,
  //     variation: 'ghost',
  //   });
  //   const link = screen.getByRole('link');
  //   expect(link.hasAttribute('href')).toBe(false);
  //   expect(link.classList.contains('ds-c-button--ghost')).toBe(true);
  //   expect(link.classList.contains('ds-c-button--on-dark')).toBe(true);
  //   expect(link.classList.contains('ds-c-button--alternate')).toBe(true);
  //   expect(link.classList.contains('ds-c-button')).toBe(true);
  // });

  // it('fires a custom click event on click', () => {
  //   renderDropdown();
  //   const buttonRoot = document.querySelector('ds-button');
  //   const buttonEl = screen.getByRole('button');
  //   const mockHandler = jest.fn();
  //   buttonRoot.addEventListener('ds-click', mockHandler);
  //   fireEvent.click(buttonEl);
  //   expect(mockHandler).toHaveBeenCalledTimes(1);
  //   buttonRoot.removeEventListener('ds-click', mockHandler);
  // });

  // it('fires a custom analytics event on click', () => {
  //   renderDropdown({ analytics: 'true' });
  //   const buttonRoot = document.querySelector('ds-button');
  //   const buttonEl = screen.getByRole('button');
  //   const mockHandler = jest.fn();
  //   buttonRoot.addEventListener('ds-analytics-event', mockHandler);
  //   fireEvent.click(buttonEl);
  //   expect(mockHandler).toHaveBeenCalledTimes(1);
  //   buttonRoot.removeEventListener('ds-analytics-event', mockHandler);
  // });
});
