import { render, cleanup } from '@testing-library/react';
import Card from './Card';

afterEach(cleanup);

it('renders without crashing', () => {
  const { container } = render(<Card />);
  expect(container).toBeInTheDocument();
});
