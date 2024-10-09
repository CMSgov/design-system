import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-filter-chip';

const defaultAttrs = {
  label: 'Filter Chip!',
  'root-id': '12345',
  'class-name': 'ds-not-a-real-class',
};

describe('ds-filter-chip', () => {
  const renderFilterChip = (customProps = {}) => {
    return render(<ds-filter-chip {...defaultAttrs} {...customProps} />);
  };

  it('should include children as label', () => {
    renderFilterChip();
    const chipEl = screen.getByRole('button');
    expect(chipEl.querySelector('.ds-c-filter-chip__label').textContent).toEqual('Filter Chip!');
    expect(chipEl).toMatchSnapshot();
  });

  it('should use different aria label if provided', () => {
    renderFilterChip({ 'aria-clear-label': 'Clear' });
    const chipEl = screen.getByRole('button');
    expect(chipEl.querySelector('.ds-u-visibility--screen-reader').textContent).toEqual(
      'Clear Filter Chip! filter .'
    );
  });

  it('generates an id when an empty string is provided', () => {
    renderFilterChip({ 'root-id': '' });
    const idRegex = /filter-chip--\d+/;
    expect(screen.getByRole('button').id).toMatch(idRegex);
  });

  it('generates an id when undefined is provided', () => {
    renderFilterChip({ 'root-id': undefined });
    const idRegex = /filter-chip--\d+/;
    expect(screen.getByRole('button').id).toMatch(idRegex);
  });

  describe('onDelete', () => {
    it('should call onDelete function when clicked', () => {
      const onDelete = jest.fn();
      renderFilterChip();

      const chipEl = screen.getByRole('button');
      expect(chipEl).toBeDefined();
      chipEl.addEventListener('ds-delete', onDelete);

      userEvent.click(chipEl);
      expect(onDelete).toHaveBeenCalled();
    });

    it('should call onDelete when certain keyboard keys are pressed', () => {
      const onDelete = jest.fn();
      renderFilterChip();

      const chipEl = screen.getByRole('button');
      chipEl.addEventListener('ds-delete', onDelete);
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
      renderFilterChip();

      const chipEl = screen.getByRole('button');
      chipEl.addEventListener('ds-on-delete', onDelete);

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
    renderFilterChip({ 'use-alternate-icon': 'true' });
    const chipEl = screen.getByRole('button');
    const iconContainerEl = chipEl.querySelector('.ds-c-filter-chip__clear-icon-container');

    expect(iconContainerEl).toBeDefined();
    expect(iconContainerEl.classList).toContain('ds-c-filter-chip__clear-icon-alternate-container');
    expect(iconContainerEl).toMatchSnapshot();
  });
});
