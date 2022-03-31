import React from 'react';
import UsaBanner from './UsaBanner';
import { fireEvent, render, screen } from '@testing-library/react';

function renderBanner(customProps = {}) {
  const props = Object.assign({}, customProps);
  return render(<UsaBanner {...props} />);
}

function filterOutElements(tagNames, container) {
  for (const tagName of tagNames) {
    const elements = container.querySelectorAll(tagName);
    for (const el of elements) {
      el.remove();
    }
  }
  return container;
}

describe('UsaBanner', function () {
  it('renders correctly', () => {
    const { container } = renderBanner();
    // Keep the snapshot small by removing the svg data
    expect(filterOutElements(['path', 'circle', 'g'], container)).toMatchSnapshot();
  });

  it('applies additional class names to expanded banner', () => {
    renderBanner();
    const openButton = screen.getByRole('button');
    fireEvent.click(openButton);
    const header = screen.getByLabelText('Official government website').querySelector('header');
    expect(header.className).toContain('ds-c-usa-banner__header--expanded');
  });

  it('adds className to root element', () => {
    renderBanner({ className: 'bar' });
    expect(screen.getByLabelText('Official government website').className).toContain('bar');
  });
});
