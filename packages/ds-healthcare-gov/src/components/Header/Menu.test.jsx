import Menu from './Menu';
import React from 'react';
import { render } from '@testing-library/react';

describe('Menu', function () {
  const links = [
    { href: '#foo', label: 'Foo' },
    { href: '#bar', label: 'Bar' },
  ];

  it('has an id for ARIA attributes', () => {
    // Note: the ID attribute of this component is important and used as an
    // ARIA attribute in ActionMenu. Be mindful of this if you change it.
    const { container } = render(<Menu links={links} />);

    expect(container.firstChild.id).toBe('hc-c-menu');
  });

  it('renders MenuList', () => {
    const { container } = render(<Menu links={links} />);
    expect(container).toMatchSnapshot();
  });

  it('removes hidden state', () => {
    const { container } = render(<Menu open links={links} />);
    expect(container).toMatchSnapshot();
  });
});
