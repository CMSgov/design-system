import { render, cleanup } from '@testing-library/react';
import Navbar from './Navbar';

afterEach(cleanup);

it('renders without crashing', () => {
  const { container } = render(<Navbar />);
  expect(container).toBeInTheDocument();
});
