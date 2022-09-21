import LogoEsSvg from './LogoEsSvg';
import React from 'react';
import { render } from '@testing-library/react';

describe('LogoEsSvg', function () {
  it('renders Spanish SVG logo', () => {
    const { container } = render(<LogoEsSvg />);
    expect(container).toMatchSnapshot();
  });
});
