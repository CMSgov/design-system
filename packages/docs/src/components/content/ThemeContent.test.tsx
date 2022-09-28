import React from 'react';
import ThemeContent, { ThemeContentProps } from './ThemeContent';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  children: <button>Hey!</button>,
};

function renderContent(props: Omit<ThemeContentProps, keyof typeof defaultProps>) {
  return render(<ThemeContent {...defaultProps} {...props} />);
}

function hasChildren() {
  return !!screen.queryByRole('button');
}

describe('ThemeContent', function () {
  it('renders children when theme in onlyThemes list', () => {
    renderContent({
      theme: 'core',
      onlyThemes: ['core', 'healthcare'],
    });
    expect(hasChildren()).toEqual(true);
  });

  it('does not render children when theme not in onlyThemes list', () => {
    renderContent({
      theme: 'medicare',
      onlyThemes: ['core', 'healthcare'],
    });
    expect(hasChildren()).toEqual(false);
  });

  it('renders children when theme not in neverThemes list', () => {
    renderContent({
      theme: 'core',
      neverThemes: ['healthcare', 'medicare'],
    });
    expect(hasChildren()).toEqual(true);
  });

  it('does not render children when theme in neverThemes list', () => {
    renderContent({
      theme: 'medicare',
      neverThemes: ['core', 'medicare'],
    });
    expect(hasChildren()).toEqual(false);
  });
});
