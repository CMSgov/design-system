import React from 'react';
import { render, screen } from '@testing-library/react';
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
    const { asFragment } = renderBanner({ 'root-id': 'static-id' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('generates ids when no id is provided', () => {
    const { container } = renderBanner();
    const idRegex = /usa-banner--\d+/;
    const button = screen.getByRole('button');
    const panelId = button.getAttribute('aria-controls');
    const panel = container.querySelector(`#${panelId}`);
    expect(panel).toBeInTheDocument();
    expect(panel.id).toMatch(idRegex);
  });
});
