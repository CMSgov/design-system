import SkipNav from './SkipNav';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SkipNav', function () {
  it('uses children as link text content', () => {
    render(<SkipNav href="#main">Foo</SkipNav>);
    const el = screen.getByRole('link');
    expect(el.textContent).toBe('Foo');
  });

  it('has href', () => {
    render(<SkipNav href="#main" />);
    const el = screen.getByRole('link');
    expect(el.getAttribute('href')).toBe('#main');
  });

  it('has default text content', () => {
    render(<SkipNav href="#main" />);
    const el = screen.getByRole('link');
    expect(el.textContent).toBe('Skip to main content');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const click = jest.fn();
    const href = '!#';
    render(<SkipNav href={href} onClick={click} />);

    const el = screen.getByRole('link');
    await user.click(el);

    expect(click).toHaveBeenCalled();
  });
});
