import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VerticalNavItem, { VerticalNavItemProps } from './VerticalNavItem';

function renderVerticalNavItem(customProps = {}) {
  const props: VerticalNavItemProps = {
    label: 'Foo',
    ...customProps,
  };

  return render(<VerticalNavItem {...props} />);
}

describe('VerticalNavItem', () => {
  it('renders list item', () => {
    renderVerticalNavItem();
    const listItemEl = screen.getByRole('listitem');

    expect(listItemEl).toBeDefined();
    expect(listItemEl.nodeName).toBe('LI');
    expect(listItemEl.classList).toContain('ds-c-vertical-nav__item');
  });

  it('renders VerticalNavItemLabel', () => {
    renderVerticalNavItem();
    const labelEl = screen.getByText('Foo');

    expect(labelEl).toBeDefined();
    expect(labelEl).toMatchSnapshot();
  });

  it('has additional class names', () => {
    renderVerticalNavItem({ className: 'bar' });
    const navItemEl = screen.getByRole('listitem');

    expect(navItemEl.classList).toContain('ds-c-vertical-nav__item');
    expect(navItemEl.classList).toContain('bar');
  });

  it('calls onSubnavToggle', () => {
    const onSubnavToggleMock = jest.fn();
    renderVerticalNavItem({
      onSubnavToggle: onSubnavToggleMock,
      defaultCollapsed: true,
      items: [
        { label: 'Child 1' },
        { label: 'Child 2' },
        {
          label: 'Child 3 with items',
          items: [{ label: 'Grandchild' }],
        },
      ],
    });

    const labelEl = screen.getByText('Foo');

    userEvent.click(labelEl);

    expect(onSubnavToggleMock).toHaveBeenCalledTimes(1);
    expect(onSubnavToggleMock).toHaveBeenCalledWith(expect.any(String), true);
  });

  it('calls onSubnavToggle rather than onClick', () => {
    const onSubnavToggleMock = jest.fn();
    const onClickMock = jest.fn();
    renderVerticalNavItem({
      onSubnavToggle: onSubnavToggleMock,
      onClick: onClickMock,
      items: [
        { label: 'Child 1' },
        { label: 'Child 2' },
        {
          label: 'Child 3 with items',
          items: [{ label: 'Grandchild' }],
        },
      ],
    });

    const labelEl = screen.getByText('Foo');
    userEvent.click(labelEl);

    expect(onClickMock).not.toHaveBeenCalled();
    expect(onSubnavToggleMock).toHaveBeenCalled();
  });

  describe('without subnav', () => {
    it('is not selected', () => {
      renderVerticalNavItem();

      const labelEl = screen.getByText('Foo');

      expect(labelEl.classList).not.toContain('ds-c-vertical-nav__label--current');
    });

    it('is selected', () => {
      renderVerticalNavItem({ selected: true });

      const labelEl = screen.getByText('Foo');

      expect(labelEl.classList).toContain('ds-c-vertical-nav__label--current');
    });

    it('has no subnav', () => {
      const { asFragment } = renderVerticalNavItem();
      const labelEl = screen.getByText('Foo');

      expect(labelEl.nodeName).toBe('DIV');
      expect(asFragment()).toMatchSnapshot();
    });

    it('calls onClick', () => {
      const mockOnClick = jest.fn();
      renderVerticalNavItem({
        id: 'bar',
        onClick: mockOnClick,
        url: '/bar',
      });

      const labelEl = screen.getByText('Foo');
      userEvent.click(labelEl);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(expect.anything(), 'bar', '/bar');
    });
  });

  describe('with subnav', () => {
    let props;

    beforeEach(() => {
      props = {
        id: 'static-id',
        items: [
          { label: 'Child 1' },
          { label: 'Child 2' },
          {
            label: 'Child 3 with items',
            items: [{ label: 'Grandchild' }],
          },
        ],
      };
    });

    it('has subnav', () => {
      renderVerticalNavItem(props);

      const labelEl = screen.getByText('Foo');
      expect(labelEl.getAttribute('aria-controls')).toBe('static-id__subnav');

      const subNavEl = screen.getAllByRole('list')[0];
      expect(subNavEl.id).toEqual('static-id__subnav');
      expect(subNavEl.classList).toContain('ds-c-vertical-nav__subnav');
      expect(subNavEl.classList).not.toContain('ds-c-vertical-nav__collapsed');
    });

    it('is not selected', () => {
      renderVerticalNavItem(props);

      const labelEl = screen.getByText('Foo');
      expect(labelEl.getAttribute('aria-current')).toBe(null);
    });

    it('is selected', () => {
      props._selectedId = 'selected-child';
      props.items[0].id = 'selected-child';
      renderVerticalNavItem(props);

      const labelEl = screen.getByText('Foo');
      expect(labelEl.classList).toContain('ds-c-vertical-nav__label--current');
    });

    it('has collapsed subnav', () => {
      props.defaultCollapsed = true;
      renderVerticalNavItem(props);

      const subNavEl = screen.getAllByRole('list')[0];
      expect(subNavEl.classList).toContain('ds-c-vertical-nav--collapsed');
    });

    it('toggles collapsed state', () => {
      props.onClick = jest.fn();
      renderVerticalNavItem(props);

      const labelEl = screen.getByText('Foo');
      const subNavEl = screen.getAllByRole('list')[0];
      expect(subNavEl.classList).not.toContain('ds-c-vertical-nav--collapsed');

      userEvent.click(labelEl);

      expect(subNavEl.classList).toContain('ds-c-vertical-nav--collapsed');
    });

    it('does not add top-level link to top of subnav', () => {
      renderVerticalNavItem(props);
      const firstSubNavItemEl = screen.getByText('Child 1');

      expect(firstSubNavItemEl).toBeDefined();
    });

    it('adds top-level link to top of subnav', () => {
      // if a url is provided to an item that also has a subnav, another subnav item will be created at the top
      // this is because a subnav label is a button for expanding / collapsing the subnav, so the link must be accessed somehow
      props.url = '/bar';
      renderVerticalNavItem(props);

      const firstSubNavItem = screen.getByText('Foo', { selector: 'a' });

      expect(firstSubNavItem.getAttribute('href')).toBe('/bar');
    });
  });
});
