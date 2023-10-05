import React from 'react';
import { render, screen } from '@testing-library/react';
import './ds-badge';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-badge': any;
    }
  }
}
/* eslint-enable */

function renderBadge(props = {}) {
  return render(<ds-badge {...props}>Foo</ds-badge>);
}

describe('Badge', () => {
  it('should render a default badge', () => {
    const { asFragment } = renderBadge();
    expect(asFragment()).toMatchSnapshot();
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
    renderBadge({ 'class-name': 'bar' });
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('bar');
  });
});
