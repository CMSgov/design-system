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
  it('should render a default inline-error', () => {
    const { asFragment } = renderInlineError();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    renderInlineError({ inversed: true });
    const inlineError = screen.getByText('Foo');
    expect(inlineError.className).toContain('ds-c-inline-error--inverse');
  });

  it('should apply custom classes', () => {
    renderInlineError({ 'class-name': 'bar' });
    const inlineError = screen.getByText('Foo');
    expect(inlineError.className).toContain('bar');
  });
});
