import React from 'react';
import Badge, { BadgeProps } from './Badge';
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

const defaultProps = {
  children: 'Foo',
};
function renderBadge(props = {}) {
  // return render(<Badge {...defaultProps} {...props} />);
  return render(<ds-badge {...defaultProps} {...props}></ds-badge>);
}

describe('Badge', () => {
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
  it.skip('should render custom classNames', () => {
    // renderBadge({ className: 'bar' });
    render(<ds-badge class-name="bar">Foo</ds-badge>);
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('bar');
  });
});
