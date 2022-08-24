import Page from './Page';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Page', () => {
  const onPageChange = jest.fn();

  it('should render interactive el if not current', () => {
    const { container } = render(
      <Page index={1} isActive={false} onPageChange={onPageChange} href="/#1" />
    );
    const buttonEl = screen.getByRole('link');
    expect(buttonEl).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render static el if current', () => {
    const { container } = render(
      <Page index={1} isActive onPageChange={onPageChange} href="/#1" />
    );
    expect(container).toMatchSnapshot();
  });
});
