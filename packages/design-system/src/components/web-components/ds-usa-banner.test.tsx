import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import './ds-usa-banner';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-usa-banner': any;
    }
  }
}
/* eslint-enable */

function renderBanner(customProps = {}) {
  const props = Object.assign({}, customProps);
  return render(<ds-usa-banner {...props} />);
}

describe('UsaBanner', function () {
  it('renders correctly', () => {
    const { asFragment } = renderBanner({ id: 'static-id' });
    expect(asFragment()).toMatchSnapshot();
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
