import HelpDrawerToggle from './HelpDrawerToggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  helpDrawerOpen: false,
  inline: false,
  showDrawer: jest.fn(),
};

function renderToggle(customProps?) {
  const props = { ...defaultProps, ...customProps };

  return render(<HelpDrawerToggle {...props}>content</HelpDrawerToggle>);
}

describe('HelpDrawerToggle', () => {
  beforeEach(() => {
    defaultProps.showDrawer.mockClear();
  });

  it('renders a button', () => {
    renderToggle();
    const el = screen.getByRole('button');
    expect(el).toMatchSnapshot();
  });

  it('calls showDrawer() on toggle click', () => {
    renderToggle();
    const el = screen.getByRole('button');
    userEvent.click(el);
    expect(defaultProps.showDrawer).toHaveBeenCalled();
  });

  it('applies display utility through inline props', () => {
    renderToggle({ inline: true });
    const el = screen.getByRole('button');
    expect(el.classList).toContain('ds-c-drawer__toggle--inline');
  });

  it('passes through extra props', () => {
    const label = 'test';
    renderToggle({ 'aria-label': label });
    const el = screen.getByRole('button');
    expect(el.getAttribute('aria-label')).toBe(label);
  });
});
