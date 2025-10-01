import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UtagContainer } from '../analytics';
import { config } from '../config';
import ThirdPartyExternalLink from './ThirdPartyExternalLink';

const defaultProps = {
  children: 'External site link',
  href: 'foo',
  origin: 'bar',
};

function renderThirdPartyExternalLink(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return {
    user: userEvent.setup(),
    ...render(<ThirdPartyExternalLink {...props} />),
  };
}

function getLink() {
  return screen.getByRole('link');
}

describe('ThirdPartyExternalLink', () => {
  it('renders external link', () => {
    renderThirdPartyExternalLink();
    expect(getLink()).toMatchSnapshot();
  });

  it('renders external link with custom class', () => {
    renderThirdPartyExternalLink({ className: 'custom-class' });
    expect(getLink().classList).toContain('custom-class');
  });

  it('renders external link with custom text', () => {
    renderThirdPartyExternalLink({ children: 'Custom text' });
    expect(getLink().textContent).toContain('Custom text');
  });

  describe('ThirdPartyExternalLink dialog', () => {
    it('renders external link dialog', async () => {
      const { user } = renderThirdPartyExternalLink();

      await act(async () => {
        await user.click(getLink());
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toMatchSnapshot();
    });

    it('renders custom URL in Learn More link', async () => {
      const { user } = renderThirdPartyExternalLink({ learnMoreUrl: 'https://www.google.com/' });

      await user.click(getLink());

      const learnMoreLink = screen.getByText('Learn more about links to third-party sites');
      expect(learnMoreLink.getAttribute('href')).toBe('https://www.google.com/');
    });

    describe('when no learnMoreUrl is defined', () => {
      it('does not render the Learn More link', async () => {
        const { user } = renderThirdPartyExternalLink();

        await user.click(getLink());

        const learnMoreLink = screen.queryByText('Learn more about links to third-party sites');
        expect(learnMoreLink).toBeNull();
      });
    });

    it('renders confirmation link with custom href', async () => {
      const { user } = renderThirdPartyExternalLink({ href: 'https://www.google.com/' });

      await user.click(getLink());

      const confirmButton = screen.getByText('Continue');
      expect(confirmButton.getAttribute('href')).toBe('https://www.google.com/');
    });

    it('closes on cancel', async () => {
      const { user } = renderThirdPartyExternalLink();

      await act(async () => {
        await user.click(getLink());
      });

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      await act(async () => {
        await user.click(screen.getByText('Cancel'));
      });
      expect(screen.queryByRole('dialog')).toBe(null);
    });

    it('renders custom origin text in heading and body', async () => {
      const { user } = renderThirdPartyExternalLink({ origin: 'Custom origin' });

      await act(async () => {
        await user.click(getLink());
      });

      const dialog = screen.getByRole('dialog');
      const dialogHeading = screen.getByRole('heading');

      expect(dialog.textContent).toContain('Custom origin');
      expect(dialogHeading.textContent).toContain('Custom origin');
    });
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;

    beforeEach(() => {
      config({ thirdPartyExternalLinkSendsAnalytics: true });
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      config({ thirdPartyExternalLinkSendsAnalytics: false });
      jest.resetAllMocks();
    });

    it('sends analytics event when continue button is clicked', async () => {
      const { user } = renderThirdPartyExternalLink();

      await user.click(getLink());
      await user.click(screen.getByText('Continue'));

      expect(tealiumMock).toHaveBeenCalled();
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
    });

    it('setting analytics to true overrides flag value', async () => {
      config({ thirdPartyExternalLinkSendsAnalytics: false });

      const { user } = renderThirdPartyExternalLink({ analytics: true });

      await user.click(getLink());
      await user.click(screen.getByText('Continue'));

      expect(tealiumMock).toHaveBeenCalled();
    });

    it('setting analytics to false overrides flag value', async () => {
      const { user } = renderThirdPartyExternalLink({ analytics: false });

      await user.click(getLink());
      await user.click(screen.getByText('Continue'));

      expect(tealiumMock).not.toHaveBeenCalled();
    });

    it('overrides analytics event tracking on open', async () => {
      const { user } = renderThirdPartyExternalLink({ analyticsLabelOverride: 'other text' });

      await user.click(getLink());
      await user.click(screen.getByText('Continue'));

      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
    });
  });
});
