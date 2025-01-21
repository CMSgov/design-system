import './ds-inline-error';
import { createTestRenderer } from '../__tests__/rendering';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-inline-error': any;
    }
  }
}
/* eslint-enable */

const view = createTestRenderer('ds-inline-error', (attrs = {}) => (
  <ds-inline-error {...attrs}>Foo</ds-inline-error>
));

describe('InlineError', () => {
  it('should render a default inline-error', () => {
    const { shadowRoot } = view();
    expect(shadowRoot.firstChild).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    const { shadowRoot } = view({ inversed: true });
    const inlineError = shadowRoot.firstChild as HTMLElement;
    expect(inlineError.className).toContain('ds-c-inline-error--inverse');
  });

  it('should apply custom classes', () => {
    const { shadowRoot } = view({ 'class-name': 'bar' });
    const inlineError = shadowRoot.firstChild as HTMLElement;
    expect(inlineError.className).toContain('bar');
  });
});
