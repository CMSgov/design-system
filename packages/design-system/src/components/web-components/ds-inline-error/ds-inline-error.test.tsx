import './ds-inline-error';
import { createTestRenderer } from '../__tests__/rendering';

const view = createTestRenderer('ds-inline-error', (attrs = {}) => (
  <ds-inline-error {...attrs}>Foo</ds-inline-error>
));

describe('InlineError', () => {
  it('should render a default inline-error', () => {
    const { shadowRoot } = view();
    expect(shadowRoot.firstChild).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    const { shadowRoot } = view({ inversed: 'true' });
    // Since we wrap the inline error text in an aria live region (a Div) we have to query the first child of that node
    const inlineError = shadowRoot.firstChild.firstChild as HTMLElement;
    expect(inlineError.className).toContain('ds-c-inline-error--inverse');
  });

  it('should apply custom classes', () => {
    const { shadowRoot } = view({ 'class-name': 'bar' });
    // Since we wrap the inline error text in an aria live region (a Div) we have to query the first child of that node
    const inlineError = shadowRoot.firstChild.firstChild as HTMLElement;
    expect(inlineError.className).toContain('bar');
  });
});
