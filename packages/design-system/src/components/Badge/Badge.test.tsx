import Badge from './Badge';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  children: 'Foo',
};
function renderBadge(props = {}) {
  return render(<Badge {...defaultProps} {...props} />);
}

describe('Badge', () => {
  it('should render a default badge', () => {
    renderBadge();
    const badge = screen.getByText('Foo');
    expect(badge).toMatchSnapshot();
  });

  it('applies variation classes', () => {
    renderBadge({ variation: 'success' });
    const badge = screen.getByText('Foo');
    expect(badge.classList).toContain('ds-c-badge--success');
  });

  it('should render a big badge', () => {
    renderBadge({ size: 'big' });
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('ds-c-badge--big');
  });

  it('should render custom classNames', () => {
    renderBadge({ className: 'bar' });
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('bar');
  });

  it('should override the screen reader text when the screenReaderText prop is passed in', () => {
    renderBadge({ variation: 'success', screenReaderText: 'barbaz' });
    const srText = screen.getByText('barbaz', { exact: false });
    expect(srText).toBeInTheDocument();
  });

  it('should not override the screen reader text when the prop is just a space', () => {
    renderBadge({ variation: 'success', screenReaderText: ' ' });
    // Note 'Success' is the value provided by the variation, not the screen reader text
    const srText = screen.getByText('Success', { exact: false });
    expect(srText).toBeInTheDocument();
  });
});
