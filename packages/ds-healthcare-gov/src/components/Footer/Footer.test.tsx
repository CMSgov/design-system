import Footer from './Footer';
import { fireEvent, render } from '@testing-library/react';
import { config } from '../config';
import { UtagContainer } from '@cmsgov/design-system';

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

  describe('analytics', () => {
    const mock = jest.fn();

    beforeAll(() => {
      (window as any as UtagContainer).utag = { link: mock };
    });

    afterEach(() => {
      mock.mockReset();
    });

    it('all links send analytics when analytics are enabled', () => {
      config({ footerSendsAnalytics: true });
      const { container } = render(<Footer />);
      container.querySelectorAll('a').forEach((link) => {
        if (link.closest('dialog')) {
          // Ignore the links that are in the privacy modal
          return;
        }
        fireEvent.click(link);
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock.mock.lastCall).toMatchSnapshot();
        mock.mockReset();
      });
    });

    it('links do not send analytics when analytics are disabled', () => {
      config({ footerSendsAnalytics: false });
      const { container } = render(<Footer />);
      container.querySelectorAll('a').forEach((link) => {
        if (link.closest('dialog')) {
          // Ignore the links that are in the privacy modal
          return;
        }
        fireEvent.click(link);
        expect(mock).not.toHaveBeenCalled();
      });
    });
  });
});
