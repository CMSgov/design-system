import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterChip from './FilterChip';

describe('FilterChip', () => {
  const renderFilterChip = (customProps = {}) => {
    const defaultProps = {
      label: 'Foo',
      onDelete: jest.fn(),
      id: 'static-id',
    };
    const props = { ...defaultProps, ...customProps };
    return {
      user: userEvent.setup(),
      ...render(<FilterChip {...props} />),
    };
  };

  it('should include children as label', () => {
    renderFilterChip();
    const chipEl = screen.getByRole('button');
    expect(chipEl.querySelector('.ds-c-filter-chip__label').textContent).toEqual('Foo');
    expect(chipEl).toMatchSnapshot();
  });

  it('should use different aria label if provided', () => {
    renderFilterChip({ ariaClearLabel: 'Clear' });
    const chipEl = screen.getByRole('button');
    expect(chipEl.querySelector('.ds-u-visibility--screen-reader').textContent).toEqual(
      'Clear Foo filter .'
    );
  });

  it('generates an id when no id is provided', () => {
    renderFilterChip({ id: undefined });
    const idRegex = /filter-chip--\d+/;
    expect(screen.getByRole('button').id).toMatch(idRegex);
  });

  describe('onDelete', () => {
    it('should call onDelete function when clicked', async () => {
      const onDelete = jest.fn();
      const { user } = renderFilterChip({ onDelete: onDelete });

      const chipEl = screen.getByRole('button');
      expect(chipEl).toBeDefined();

      await user.click(chipEl);
      expect(onDelete).toHaveBeenCalled();
    });

    it('should call onDelete when certain keyboard keys are pressed', async () => {
      const onDelete = jest.fn();
      const { user } = renderFilterChip({ onDelete: onDelete });

      const chipEl = screen.getByRole('button');
      chipEl.focus();

      await user.keyboard('{Enter}');
      expect(onDelete).toHaveBeenCalledTimes(1);
      await user.keyboard('{Space}');
      expect(onDelete).toHaveBeenCalledTimes(2);
      await user.keyboard('{Backspace}');
      expect(onDelete).toHaveBeenCalledTimes(3);
      await user.keyboard('{Delete}');
      expect(onDelete).toHaveBeenCalledTimes(4);
    });

    it('should not call onDelete when most keyboard keys are pressed', async () => {
      const onDelete = jest.fn();
      const { user } = renderFilterChip({ onDelete: onDelete });

      const chipEl = screen.getByRole('button');
      chipEl.focus();
      await user.keyboard('{Tab}');
      expect(onDelete).not.toHaveBeenCalled();
      await user.keyboard('a');
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
    expect(iconContainerEl).toMatchSnapshot();
  });
});
