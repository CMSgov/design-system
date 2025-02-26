import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-filter-chip';

const defaultAttrs = {
  label: 'Filter Chip!',
  'root-id': '12345',
  'class-name': 'ds-not-a-real-class',
};

describe('ds-filter-chip', () => {
  const renderFilterChip = (customProps = {}) => {
    return {
      user: userEvent.setup(),
      ...render(<ds-filter-chip {...defaultAttrs} {...customProps} />),
    };
  };

  it('should include children as label', () => {
    renderFilterChip();
    const chipEl = screen.getByRole('button');
    expect(chipEl.querySelector('.ds-c-filter-chip__label').textContent).toEqual('Filter Chip!');
    expect(chipEl).toMatchSnapshot();
  });

  it('should use different aria label if provided', () => {
    renderFilterChip({ 'clear-label': 'Clear' });
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
    it('should call onDelete function when clicked', async () => {
      const onDelete = jest.fn();
      const { user } = renderFilterChip();

      const chipEl = document.querySelector('ds-filter-chip');
      expect(chipEl).toBeDefined();
      chipEl.addEventListener('ds-delete', onDelete);

      await user.click(screen.getByRole('button'));
      expect(onDelete).toHaveBeenCalled();
      chipEl.removeEventListener('ds-delete', onDelete);
    });

    it('should call onDelete when certain keyboard keys are pressed', async () => {
      const onDelete = jest.fn();
      const { user } = renderFilterChip();

      const chipEl = document.querySelector('ds-filter-chip');
      chipEl.addEventListener('ds-delete', onDelete);
      screen.getByRole('button').focus();

      await user.keyboard('{Enter}');
      expect(onDelete).toHaveBeenCalledTimes(1);
      await user.keyboard('{Space}');
      expect(onDelete).toHaveBeenCalledTimes(2);
      await user.keyboard('{Backspace}');
      expect(onDelete).toHaveBeenCalledTimes(3);
      await user.keyboard('{Delete}');
      expect(onDelete).toHaveBeenCalledTimes(4);

      chipEl.removeEventListener('ds-delete', onDelete);
    });

    it('should not call onDelete when most keyboard keys are pressed', async () => {
      const onDelete = jest.fn();
      const { user } = renderFilterChip();

      const chipEl = screen.getByRole('button');
      chipEl.addEventListener('ds-on-delete', onDelete);

      screen.getByRole('button').focus();
      await user.keyboard('{Tab}');
      expect(onDelete).not.toHaveBeenCalled();
      await user.keyboard('a');
      expect(onDelete).not.toHaveBeenCalled();

      chipEl.removeEventListener('ds-delete', onDelete);
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
