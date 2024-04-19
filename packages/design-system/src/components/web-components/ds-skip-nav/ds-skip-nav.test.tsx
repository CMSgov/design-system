import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-skip-nav';

describe('SkipNav', function () {
  it('uses children as link text content', () => {
    render(<ds-skip-nav href="#main">Foo</ds-skip-nav>);
    const el = screen.getByRole('link');
    expect(el.textContent).toBe('Foo');
  });

  it('has href', () => {
    render(<ds-skip-nav href="#main" />);
    const el = screen.getByRole('link');
    expect(el.getAttribute('href')).toBe('#main');
  });

  it.skip('has default text content', () => {
    render(<ds-skip-nav href="#main" />);
    const el = screen.getByRole('link');
    expect(el.textContent).toBe('Skip to main content');
  });

  it('calls onClick when clicked', () => {
    const click = jest.fn();
    const href = '!#';
    render(<ds-skip-nav href={href} onClick={click} />);

    const el = screen.getByRole('link');
    userEvent.click(el);

    expect(click).toHaveBeenCalled();
  });
});
