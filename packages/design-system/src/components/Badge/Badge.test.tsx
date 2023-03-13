import React from 'react';
import Badge from './Badge';
import { render, screen } from '@testing-library/react';

describe('Badge', () => {
  it('should render a default badge', () => {
    render(<Badge>Foo</Badge>);
    expect(screen.getByText('Foo')).toMatchSnapshot();
  });

  it('should render an info badge', () => {
    render(<Badge variation="info">Foo</Badge>);
    expect(screen.getByText('Foo')).toMatchSnapshot();
  });

  it('should render a success badge', () => {
    render(<Badge variation="success">Foo</Badge>);
    expect(screen.getByText('Foo')).toMatchSnapshot();
  });

  it('should render a warning badge', () => {
    render(<Badge variation="warn">Foo</Badge>);
    expect(screen.getByText('Foo')).toMatchSnapshot();
  });

  it('should render an alert badge', () => {
    render(<Badge variation="alert">Foo</Badge>);
    expect(screen.getByText('Foo')).toMatchSnapshot();
  });

  it('should render a big badge', () => {
    render(<Badge size="big">Foo</Badge>);
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('ds-c-badge--big');
  });

  it('should render custom classNames', () => {
    render(<Badge className="super-special-badge">Foo</Badge>);
    const badge = screen.getByText('Foo');
    expect(badge.className).toContain('super-special-badge');
  });
});
