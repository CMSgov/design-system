import React from 'react';
import Logo from './Logo';
import { render } from '@testing-library/react';
import { setLanguage } from '@cmsgov/design-system';

describe('Logo', function () {
  it('renders English logo', () => {
    setLanguage('en');
    const { container } = render(<Logo />);
    expect(container).toMatchSnapshot();
  });

  it('renders Spanish logo', () => {
    setLanguage('es');
    const { container } = render(<Logo />);
    expect(container).toMatchSnapshot();
  });
});
