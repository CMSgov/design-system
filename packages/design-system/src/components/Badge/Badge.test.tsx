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
    renderBadge({ variation: 'success', screenReaderText: 'barbaz', hideScreenReaderText: false });
    const srText = screen.getByText('barbaz', { exact: false });
    expect(srText).toBeInTheDocument();
  });

  it('should not hide the screen reader text when hideScreenReaderText is false', () => {
    renderBadge({ variation: 'success', hideScreenReaderText: false });
    const srText = screen.getByText('Success', { exact: false });
    expect(srText).toBeInTheDocument();
  });

  it('should hide screen reader text and screen reader override text when told to do so', async () => {
    renderBadge({ variation: 'success', screenReaderText: 'barbaz', hideScreenReaderText: true });
    const srText = screen.queryByText('Success', { exact: false });
    const srTextOverride = screen.queryByText('barbaz', { exact: false });
    expect(srText).not.toBeInTheDocument();
    expect(srTextOverride).not.toBeInTheDocument();
  });
});
