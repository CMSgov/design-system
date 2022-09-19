import LogoEnSvg from './LogoEnSvg';
import React from 'react';
import { render } from '@testing-library/react';

describe('LogoEnSvg', function () {
  it('renders English SVG logo', () => {
    const { container } = render(<LogoEnSvg />);
    expect(container).toMatchSnapshot();
  });
});
