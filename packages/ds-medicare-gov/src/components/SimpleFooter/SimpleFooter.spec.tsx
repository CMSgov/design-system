import { render, screen, cleanup } from '@testing-library/react';
import SimpleFooter from './SimpleFooter';

afterEach(cleanup);

it('renders without crashing', () => {
  render(<SimpleFooter aboutMedicareLabel="About SimpleFooter" />);

  expect(screen.getByText(/about SimpleFooter/i)).toBeInTheDocument();
});
