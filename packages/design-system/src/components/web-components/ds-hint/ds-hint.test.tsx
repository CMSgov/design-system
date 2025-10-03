import { createTestRenderer } from '../__tests__/rendering';
import './ds-hint';

// Renaming the renderButton function to view to match TestingLibrary's naming conventions
const view = createTestRenderer('ds-hint', (attrs = {}) => <ds-hint {...attrs}>Foo</ds-hint>);

describe('Hint', () => {
  it('should render a default hint', () => {
    const { shadowRoot } = view();
    expect(shadowRoot.firstChild).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    const { shadowRoot } = view({ inversed: 'true' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint.className).toContain('ds-c-hint--inverse');
  });

  it('should apply custom classes', () => {
    const { shadowRoot } = view({ 'class-name': 'bar' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint.className).toContain('bar');
  });

  it('should render a requirement label', () => {
    const { shadowRoot } = view({ 'requirement-label': 'Optional' });
    const hint = shadowRoot.firstChild as HTMLElement;
    expect(hint).toContainHTML('Optional. <slot />');
  });
});
