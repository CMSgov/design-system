import { render, screen } from '@testing-library/react';
import './ds-hint';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-hint': any;
    }
  }
}
/* eslint-enable */

function renderHint(props = {}) {
  return render(<ds-hint {...props}>Foo</ds-hint>);
}

describe('Hint', () => {
  it('should render a default hint', () => {
    const { asFragment } = renderHint();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    renderHint({ inversed: true });
    const hint = screen.getByText('Foo');
    expect(hint.className).toContain('ds-c-hint--inverse');
  });

  it('should apply custom classes', () => {
    renderHint({ 'class-name': 'bar' });
    const hint = screen.getByText('Foo');
    expect(hint.className).toContain('bar');
  });

  it('should render a requirement label', () => {
    renderHint({ 'requirement-label': 'Optional' });
    const hint = screen.getByText(/Optional.*/);
    expect(hint).toContainHTML('Foo');
  });
});
