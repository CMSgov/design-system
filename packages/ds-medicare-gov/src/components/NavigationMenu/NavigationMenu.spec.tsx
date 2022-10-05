import { render, cleanup } from '@testing-library/react';
import NavigationMenu from './NavigationMenu';

afterEach(cleanup);

it('renders without crashing', () => {
  const { container } = render(<NavigationMenu />);
  expect(container).toBeInTheDocument();
});
