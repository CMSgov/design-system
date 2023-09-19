import React from 'react';
import Badge, { BadgeProps } from '../Badge/Badge';
import { render, screen } from '@testing-library/react';

import register from 'preact-custom-element';
register(Badge, 'ds-badge');
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-badge': BadgeProps;
    }
  }
}

function renderBadge(props = {}) {
  return render(<ds-badge {...props}>Foo</ds-badge>);
}

// Skipping entire test suite because Badge isn't working as a WC as expected
describe.skip('Badge', () => {
  // inserting multiples of Foo
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

  // adding class-name multiple times?
  it('should render custom classNames', () => {
    renderBadge({ 'class-name': 'bar' });
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('bar');
  });
});
