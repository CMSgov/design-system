import React from 'react';
import LogoEnSvg from './LogoEnSvg';
import { render } from '@testing-library/react';

describe('LogoEnSvg', function () {
  it('renders English SVG logo', () => {
    const { container } = render(<LogoEnSvg />);
    expect(container).toMatchSnapshot();
  });
  it('updates the titleId when changed', () => {
    const { container } = render(<LogoEnSvg titleId="foo" />);
    expect(container.querySelector('title').id).toBe('foo');
  });
});
