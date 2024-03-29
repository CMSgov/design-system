import Footer from './Footer';
import { render } from '@testing-library/react';

describe('Footer', function () {
  it('renders basic footer', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('renders basic footer with props', () => {
    const { container } = render(
      <Footer className="ds-t-test-class" primaryDomain="https://www.healthcare.gov" />
    );
    expect(container).toMatchSnapshot();
  });
});
