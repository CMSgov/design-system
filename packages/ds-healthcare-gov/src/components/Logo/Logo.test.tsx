import Logo from './Logo';
import React from 'react';
import { render } from '@testing-library/react';

describe('Logo', function () {
  it('renders English logo', () => {
    const { container } = render(<Logo />);
    expect(container).toMatchSnapshot();
  });

  it('renders Spanish logo', () => {
    const { container } = render(<Logo locale="es" />);
    expect(container).toMatchSnapshot();
  });
});
