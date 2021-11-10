import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Stars from './Stars';

afterEach(cleanup);

it('renders without crashing', () => {
  const { container } = render(<Stars number={3} />);
  expect(container).toBeInTheDocument();
});
