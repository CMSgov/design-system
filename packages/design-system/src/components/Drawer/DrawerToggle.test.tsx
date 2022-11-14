import DrawerToggle, { DrawerToggleProps } from './DrawerToggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  children: 'content',
  drawerOpen: false,
  inline: false,
  showDrawer: jest.fn(),
};

function renderDrawerToggle(props: Partial<DrawerToggleProps> = {}) {
  return render(
    <DrawerToggle {...defaultProps} {...props}>
      content
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
    userEvent.click(screen.getByRole('button'));
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
        content
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
