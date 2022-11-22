import React from 'react';
import { render, cleanup } from '@testing-library/react';
import MedicaregovLogo from './MedicaregovLogo';

afterEach(cleanup);

it('renders without crashing', () => {
  const { container } = render(<MedicaregovLogo />);
  expect(container).toBeInTheDocument();
});
