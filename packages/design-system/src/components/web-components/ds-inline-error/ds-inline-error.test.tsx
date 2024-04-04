import { render, screen } from '@testing-library/react';
import './ds-inline-error';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-inline-error': any;
    }
  }
}
/* eslint-enable */

function renderInlineError(props = {}) {
  return render(<ds-inline-error {...props}>Foo</ds-inline-error>);
}

describe('InlineError', () => {
  it('should render a default badge', () => {
    const { asFragment } = renderInlineError();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render a big badge', () => {
    renderInlineError({ inversed: true });
    const inlineError = screen.getByText('Foo');
    expect(inlineError.className).toContain('ds-c-inline-error--inverse');
  });

  it('should render custom classNames', () => {
    renderInlineError({ 'class-name': 'bar' });
    const inlineError = screen.getByText('Foo');
    expect(inlineError.className).toContain('bar');
  });
});
