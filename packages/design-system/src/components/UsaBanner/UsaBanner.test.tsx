import React from 'react';
import UsaBanner, { UsaBannerProps } from './UsaBanner';
import { fireEvent, render, screen } from '@testing-library/react';

import register from 'preact-custom-element';
register(UsaBanner, 'ds-usa-banner');
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-usa-banner': UsaBannerProps;
    }
  }
}

function renderBanner(customProps = {}) {
  const props = Object.assign({}, customProps);
  // return render(<UsaBanner {...props} />);
  return render(<ds-usa-banner {...props}></ds-usa-banner>);
}

describe('UsaBanner', function () {
  it('renders correctly', () => {
    renderBanner({ id: 'static-id' });
    const header = screen.getByRole('banner');
    expect(header).toMatchSnapshot();
  });

  it('applies additional class names to expanded banner', () => {
    renderBanner();
    const openButton = screen.getByRole('button');
    fireEvent.click(openButton);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('ds-c-usa-banner__header--expanded');
  });

  it('adds className to root element', () => {
    renderBanner({ 'class-name': 'bar' });
    expect(
      screen.getByLabelText('Official website of the United States government').className
    ).toContain('bar');
  });
});
