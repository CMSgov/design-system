import FilterChip from './FilterChip';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FilterChip', () => {
  const renderFilterChip = (customProps = {}) => {
    const defaultProps = {
      label: 'Foo',
      onDelete: jest.fn(),
    };
    const props = { ...defaultProps, ...customProps };
    return render(<FilterChip {...props} />);
  };

  it('should include children as label', () => {
    renderFilterChip();
    const chipEl = screen.getByRole('button');
    expect(chipEl.textContent).toEqual('Foo. Remove Foo filter .');

    expect(chipEl.innerHTML).toMatchSnapshot();
  });

  it('should use different aria label if provided', () => {
    renderFilterChip({ ariaClearLabel: 'Clear' });
    const chipEl = screen.getByRole('button');
    expect(chipEl.textContent).toEqual('Foo. Clear Foo filter .');
  });

  describe('onDelete', () => {
    it('should call onDelete function when clicked', () => {
      const onDelete = jest.fn();
      renderFilterChip({ onDelete: onDelete });

      const chipEl = screen.getByRole('button');
      expect(chipEl).toBeDefined();

      userEvent.click(chipEl);
      expect(onDelete).toHaveBeenCalled();
    });

    it('should call onDelete when certain keyboard keys are pressed', () => {
      const onDelete = jest.fn();
      renderFilterChip({ onDelete: onDelete });

      const chipEl = screen.getByRole('button');
      chipEl.focus();

      userEvent.keyboard('{Enter}');
      expect(onDelete).toHaveBeenCalledTimes(1);
      userEvent.keyboard('{Space}');
      expect(onDelete).toHaveBeenCalledTimes(2);
      userEvent.keyboard('{Backspace}');
      expect(onDelete).toHaveBeenCalledTimes(3);
      userEvent.keyboard('{Delete}');
      expect(onDelete).toHaveBeenCalledTimes(4);
    });

    it('should not call onDelete when most keyboard keys are pressed', () => {
      const onDelete = jest.fn();
      renderFilterChip({ onDelete: onDelete });

      const chipEl = screen.getByRole('button');
      chipEl.focus();
      userEvent.keyboard('{Tab}');
      expect(onDelete).not.toHaveBeenCalled();
      userEvent.keyboard('a');
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  it('should set big CSS class', () => {
    renderFilterChip({ size: 'big' });
    const chipEl = screen.getByRole('button');
    expect(chipEl.classList).toContain('ds-c-filter-chip__button--big');
  });

  it('should use alternate icon', () => {
    renderFilterChip({ useAlternateIcon: true });
    const chipEl = screen.getByRole('button');
    const iconContainerEl = chipEl.querySelector('.ds-c-filter-chip__clear-icon-container');

    expect(iconContainerEl).toBeDefined();
    expect(iconContainerEl.classList).toContain('ds-c-filter-chip__clear-icon-alternate-container');
    expect(iconContainerEl.innerHTML).toMatchSnapshot();
  });
});
