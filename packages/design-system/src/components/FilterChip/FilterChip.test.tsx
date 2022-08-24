import FilterChip from './FilterChip';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FilterChip', () => {
  const renderFilterChip = (customProps = {}) => {
    const defaultProps = {
      label: 'Foo',
      onDelete: () => {},
    };
    const props = { ...defaultProps, ...customProps };
    return render(<FilterChip {...props} />);
  };

  it('should include children as label', () => {
    renderFilterChip();
    const chipEl = screen.getByRole('button');
    expect(chipEl.textContent).toEqual('Foo. Remove Foo filter .');

    expect(chipEl.innerHTML).toMatchInlineSnapshot(
      `"<span class=\\"ds-c-filter-chip__label\\" aria-describedby=\\"filter_1-instructions\\">Foo</span><span id=\\"filter_1-instructions\\" class=\\"ds-u-visibility--screen-reader\\">. Remove Foo filter .</span><span class=\\"ds-c-filter-chip__clear-icon-container\\"><svg aria-hidden=\\"true\\" class=\\"ds-c-icon ds-c-icon--close \\" focusable=\\"false\\" id=\\"icon-2\\" viewBox=\\"0 0 16 16\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path d=\\"M14.647 11.213c.235.235.353.521.353.858 0 .337-.118.624-.353.859l-1.717 1.717a1.17 1.17 0 01-.86.354c-.336 0-.622-.118-.857-.354l-3.714-3.712-3.712 3.712A1.166 1.166 0 012.93 15c-.337 0-.622-.118-.859-.354L.353 12.93A1.165 1.165 0 010 12.07c0-.337.117-.623.353-.858L4.065 7.5.353 3.789A1.168 1.168 0 010 2.929c0-.336.117-.622.353-.857L2.07.353C2.307.118 2.592 0 2.93 0c.337 0 .623.118.858.353L7.5 4.065 11.213.353c.235-.235.521-.353.857-.353.337 0 .623.118.86.353l1.717 1.719c.235.235.353.521.353.857 0 .338-.118.623-.353.86L10.935 7.5l3.712 3.712z\\" fill-rule=\\"evenodd\\"></path></svg></span>"`
    );
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
    expect(iconContainerEl.innerHTML).toMatchInlineSnapshot(
      `"<svg aria-hidden=\\"true\\" class=\\"ds-c-icon ds-c-icon--close ds-c-icon--close-thin \\" focusable=\\"false\\" id=\\"icon-14\\" viewBox=\\"-2 -2 18 18\\" xmlns=\\"http://www.w3.org/2000/svg\\"><path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-width=\\"2\\" d=\\"M0 13.0332964L13.0332964 0M13.0332964 13.0332964L0 0\\"></path></svg>"`
    );
  });
});
