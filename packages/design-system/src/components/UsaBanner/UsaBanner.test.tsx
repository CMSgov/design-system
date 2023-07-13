import React from 'react';
import UsaBanner from './UsaBanner';
import { fireEvent, render, screen } from '@testing-library/react';

function renderBanner(customProps = {}) {
  const props = Object.assign({}, customProps);
  return render(<UsaBanner {...props} />);
}

describe('UsaBanner', function () {
  it('renders correctly', () => {
    renderBanner();
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
    renderBanner({ className: 'bar' });
    expect(
      screen.getByLabelText('Official website of the United States government').className
    ).toContain('bar');
  });
});
