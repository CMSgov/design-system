import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('does not render disabled when passed false', () => {
    renderDropdown({ disabled: 'false' });
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('disabled');
  });

  it('applies additional classes to the wrapper', () => {
    const { container } = renderDropdown({ 'class-name': 'foobar' });
    const wrapper = container.querySelector('.ds-c-dropdown');
    expect(wrapper).toHaveClass('foobar');
  });

  it('applies additional classes to the dropdown button', () => {
    renderDropdown({ 'field-class-name': 'foobar' });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('foobar');
  });

  it('applies size classes', () => {
    renderDropdown({ size: 'small' });
    const button = screen.getByRole('button');
    expect(button.classList.contains('ds-c-field--small')).toBe(true);
  });

  it('fires a custom ds-change event', () => {
    renderDropdown();

    const dropdownRoot = document.querySelector('ds-dropdown');
    const mockHandler = jest.fn();
    dropdownRoot.addEventListener('ds-change', mockHandler);

    const button = screen.getByRole('button');
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');

    expect(mockHandler).toHaveBeenCalledTimes(1);
    dropdownRoot.removeEventListener('ds-change', mockHandler);
  });

  it('fires a custom ds-blur event', async () => {
    renderDropdown();

    const dropdownRoot = document.querySelector('ds-dropdown');
    const onBlur = jest.fn();
    const onChange = jest.fn();
    dropdownRoot.addEventListener('ds-blur', onBlur);
    dropdownRoot.addEventListener('ds-change', onChange);

    const button = screen.getByRole('button');
    userEvent.click(button);
    userEvent.tab();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await act(async () => {
      await sleep(40);
    });

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    dropdownRoot.removeEventListener('ds-blur', onBlur);
    dropdownRoot.removeEventListener('ds-change', onChange);
  });
});
