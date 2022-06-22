import DrawerToggle, { DrawerToggleProps } from './DrawerToggle';
import React from 'react';
// import { shallow } from 'enzyme';
import { render, fireEvent, screen } from '@testing-library/react';

const defaultProps = {
  children: <p>content</p>,
  drawerOpen: false,
  inline: false,
  showDrawer: jest.fn(),
};

function renderDrawerToggle(props: Partial<DrawerToggleProps> = {}) {
  return render(
    <DrawerToggle {...defaultProps} {...props}>
      <p>content</p>
    </DrawerToggle>
  );
}
describe('DrawerToggle', () => {
  beforeEach(() => {
    defaultProps.showDrawer.mockClear();
  });

  it('renders a button', () => {
    const { asFragment } = renderDrawerToggle();
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls showDrawer() on toggle click', () => {
    renderDrawerToggle();
    fireEvent.click(screen.getByRole('button'));
    expect(defaultProps.showDrawer).toHaveBeenCalled();
  });

  it('applies inline display style via inline prop', () => {
    renderDrawerToggle({ inline: true });
    const toggle = screen.getByRole('button');
    expect(toggle.classList.contains('ds-c-drawer__toggle--inline')).toBe(true);
  });

  it('applies custom class via className prop', () => {
    const className = 'test-class';
    renderDrawerToggle({ className });
    const toggle = screen.getByRole('button');
    expect(toggle.classList).toContain(className);
  });

  it('passes through extra props', () => {
    const ariaLabel = 'test';
    renderDrawerToggle({ 'aria-label': ariaLabel });
    const toggle = screen.getByRole('button');
    expect(toggle.getAttribute('aria-label')).toBe(ariaLabel);
  });

  it('focuses button when drawer goes from open to closed', () => {
    const { rerender } = renderDrawerToggle({ drawerOpen: true });
    rerender(
      <DrawerToggle {...defaultProps} drawerOpen={false}>
        <p>content</p>
      </DrawerToggle>
    );
    const toggle = screen.getByRole('button');
    expect(toggle).toEqual(document.activeElement);
  });

  it('does not focus button when drawer in initialized to close', () => {
    renderDrawerToggle({ drawerOpen: false });
    const toggle = screen.getByRole('button');
    expect(toggle).not.toEqual(document.activeElement);
  });
});
