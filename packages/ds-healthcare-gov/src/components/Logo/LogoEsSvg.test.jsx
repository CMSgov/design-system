import React from 'react';
import LogoEsSvg from './LogoEsSvg';
import { render } from '@testing-library/react';

describe('LogoEsSvg', function () {
  it('renders Spanish SVG logo', () => {
    const { container } = render(<LogoEsSvg />);
    expect(container).toMatchSnapshot();
  });
  it('updates the titleId when changed', () => {
    const { container } = render(<LogoEsSvg titleId="foo" />);
    expect(container.querySelector('title').id).toBe('foo');
  });
});
