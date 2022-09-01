import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VerticalNav, { VerticalNavProps } from './VerticalNav';

function renderVerticalNav(customProps = {}) {
  const props: VerticalNavProps = {
    ...{
      items: [{ label: 'Foo' }, { label: 'Bar' }],
    },
    ...customProps,
  };
  return render(<VerticalNav {...props} />);
}

describe('VerticalNav', () => {
  it('renders list', () => {
    renderVerticalNav();
    const listEl = screen.getByRole('list');

    expect(listEl).toBeDefined();
    expect(listEl.classList).toContain('ds-c-vertical-nav');
    expect(listEl.classList).not.toContain('ds-c-vertical-nav__subnav');
    expect(listEl.classList).not.toContain('ds-c-vertical-nav--collapsed');

    const listItemEls = screen.getAllByRole('listitem');

    expect(listItemEls.length).toBe(2);
  });

  it('adds additional class names', () => {
    renderVerticalNav({ className: 'foo' });
    const listEl = screen.getByRole('list');

    expect(listEl.classList).toContain('ds-c-vertical-nav');
    expect(listEl.classList).toContain('foo');
  });

  describe('aria-label', () => {
    it('has aria-label attribute if passed prop', () => {
      renderVerticalNav({ ariaNavLabel: 'side menu' });
      const navEl = screen.getByLabelText('side menu');

      expect(navEl.getAttribute('aria-label')).toEqual('side menu');
    });

    it('does not have aria-label by default', () => {
      const { container } = renderVerticalNav();
      // not sure how else to query the nav container
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      const navEl = container.querySelector('nav');

      expect(navEl.getAttribute('arial-label')).toBeFalsy();
    });
  });

  it('has an id attribute', () => {
    renderVerticalNav({ id: 'foo' });
    const listEl = screen.getByRole('list');

    expect(listEl.id).toBe('foo');
  });

  it('is a subnav list', () => {
    renderVerticalNav({ nested: true });
    const listEl = screen.getByRole('list');

    expect(listEl.classList).not.toContain('ds-c-vertical-nav');
    expect(listEl.classList).toContain('ds-c-vertical-nav__subnav');
  });

  it('is collapsed', () => {
    renderVerticalNav({ collapsed: true });
    const listEl = screen.getByRole('list');

    expect(listEl.classList).toContain('ds-c-vertical-nav--collapsed');
  });

  it('passes onLinkClick to items', () => {
    const mockOnLinkClick = jest.fn();
    renderVerticalNav({
      onLinkClick: mockOnLinkClick,
    });

    const navItemEl = screen.getByText('Foo');

    userEvent.click(navItemEl);

    expect(mockOnLinkClick).toHaveBeenCalled();
  });

  it("gives precedence to item's onClick callback", () => {
    const mockOnLinkClick = jest.fn();
    const mockOnClick = jest.fn();
    renderVerticalNav({
      onLinkClick: mockOnLinkClick,
      items: [
        {
          label: 'Link 3',
          onClick: mockOnClick,
        },
      ],
    });

    const navItemEl = screen.getByText('Link 3');

    userEvent.click(navItemEl);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnLinkClick).not.toHaveBeenCalled();
  });

  it('sets selected prop on selected item and its parents', () => {
    const props = {
      selectedId: 'grandchild-1',
      items: [
        {
          label: 'Parent',
          id: 'parent',
          items: [
            {
              label: 'Child',
              id: 'child',
              items: [
                {
                  label: 'Grandchild 1',
                  id: 'grandchild-1',
                },
                {
                  label: 'Grandchild 2',
                  id: 'grandchild-2',
                },
              ],
            },
          ],
        },
        {
          label: 'Foo',
        },
      ],
    };
    render(<VerticalNav {...props} />);
    const parentEl = screen.getByText('Parent');
    const childEl = screen.getByText('Child');
    const grandchild1El = screen.getByText('Grandchild 1');
    const grandchild2El = screen.getByText('Grandchild 2');
    const fooEl = screen.getByText('Foo');

    // Parents and self are selected
    expect(parentEl.classList).toContain('ds-c-vertical-nav__label--current');
    expect(childEl.classList).toContain('ds-c-vertical-nav__label--current');
    expect(grandchild1El.classList).toContain('ds-c-vertical-nav__label--current');

    // Siblings or unrelated items aren't selected
    expect(grandchild2El.classList).not.toContain('ds-c-vertical-nav__label--current');
    expect(fooEl.classList).not.toContain('ds-c-vertical-nav__label--current');
  });
});
