<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
=======
import { createTestRenderer } from '../__tests__/rendering';
>>>>>>> 107c1cedb (Remove unused dep)
import './ds-label';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-label': any;
    }
  }
}
/* eslint-enable */

const defaultProps = {
  for: 'field-123',
};

function renderLabel(props: any = defaultProps) {
  return render(<ds-label {...props}>Foo</ds-label>);
}

describe('Label', () => {
  it('should render a basic label', () => {
    const { asFragment } = renderLabel();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should apply an inverse class', () => {
    renderLabel({ inversed: true });
    const label = screen.getByText('Foo');
    expect(label.className).toContain('ds-c-label--inverse');
  });

  it('should apply custom classes', () => {
    renderLabel({ 'class-name': 'bar' });
    const label = screen.getByText('Foo');
    expect(label.className).toContain('bar');
  });
});
