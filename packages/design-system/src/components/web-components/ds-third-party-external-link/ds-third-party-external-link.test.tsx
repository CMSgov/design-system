import { act, screen, fireEvent } from '@testing-library/react';
import { testAnalytics } from '../__tests__/analytics';
import { config } from '../../config';
import { createTestRenderer } from '../__tests__/rendering';
import './ds-third-party-external-link';

const defaultAttrs = {
  href: 'foo',
  origin: 'bar',
  children: 'External site link',
};

function getLink() {
  return screen.getByRole('link');
}

const renderThirdPartyExternalLink = createTestRenderer(
  'ds-third-party-external-link',
  (attrs = {}) => <ds-third-party-external-link {...(attrs as any)}></ds-third-party-external-link>
);

describe('ThirdPartyExternalLink', () => {
  it('should render ThirdPartyExternalLink', () => {
    const { asFragment } = renderThirdPartyExternalLink();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders external link with custom class', () => {
    renderThirdPartyExternalLink({
      ...defaultAttrs,
      'class-name': 'custom-class',
    });
    expect(getLink().classList).toContain('custom-class');
  });

  it('renders external link with custom text', () => {
    renderThirdPartyExternalLink({ ...defaultAttrs, children: 'Custom text' });
    expect(getLink().textContent).toContain('Custom text');
  });

  describe('ThirdPartyExternalLink dialog', () => {
    it('renders external link dialog', async () => {
      const { user } = renderThirdPartyExternalLink({ ...defaultAttrs });

      await act(async () => {
        await user.click(getLink());
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toMatchSnapshot();
    });

    it('renders custom URL in Learn More link', async () => {
      const { user } = renderThirdPartyExternalLink({
        ...defaultAttrs,
        'learn-more-url': 'https://www.google.com/',
      });

      await user.click(getLink());

      const learnMoreLink = screen.getByText('Learn more about links to third-party sites');
      expect(learnMoreLink.getAttribute('href')).toBe('https://www.google.com/');
    });

    it('renders confirmation link with custom href', async () => {
      const { user } = renderThirdPartyExternalLink({
        ...defaultAttrs,
        href: 'https://www.google.com/',
      });

      await user.click(getLink());

      const confirmButton = screen.getByText('Continue');
      expect(confirmButton.getAttribute('href')).toBe('https://www.google.com/');
    });

    it('closes on cancel', async () => {
      const { user } = renderThirdPartyExternalLink({ ...defaultAttrs });

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
      const { user } = renderThirdPartyExternalLink({ ...defaultAttrs, origin: 'Custom origin' });

      await act(async () => {
        await user.click(getLink());
      });

      const dialog = screen.getByRole('dialog');
      const dialogHeading = screen.getByRole('heading');

      expect(dialog.textContent).toContain('Custom origin');
      expect(dialogHeading.textContent).toContain('Custom origin');
    });
  });

  describe('Analytics', () => {
    beforeEach(() => {
      config({ thirdPartyExternalLinkSendsAnalytics: true });
    });

    afterEach(() => {
      config({ thirdPartyExternalLinkSendsAnalytics: false });
    });

    testAnalytics(
      'sends thirdPartyExternalLink analytics event',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderThirdPartyExternalLink({
          ...defaultAttrs,
        });

        const anchor = screen.getByRole('link');
        fireEvent.click(anchor);

        const confirmButton = await screen.findByText('Continue');
        fireEvent.click(confirmButton);

        await waitForAnalytics();
        expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
        expect(tealiumMock).toHaveBeenCalledTimes(1);
      }
    );

    testAnalytics(
      'disables analytics event tracking',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderThirdPartyExternalLink({ ...defaultAttrs, analytics: 'false' });

        const anchor = screen.getByRole('link');
        fireEvent.click(anchor);

        const confirmButton = await screen.findByText('Continue');
        fireEvent.click(confirmButton);

        await waitForAnalytics();
        expect(tealiumMock).not.toHaveBeenCalled();
      }
    );

    testAnalytics(
      'setting analytics to true overrides flag value',
      async ({ tealiumMock, waitForAnalytics }) => {
        config({ thirdPartyExternalLinkSendsAnalytics: false });
        renderThirdPartyExternalLink({ ...defaultAttrs, analytics: 'true' });

        const anchor = screen.getByRole('link');
        fireEvent.click(anchor);

        const confirmButton = await screen.findByText('Continue');
        fireEvent.click(confirmButton);

        await waitForAnalytics();
        expect(tealiumMock).toHaveBeenCalled();
      }
    );

    testAnalytics(
      'overrides analytics event tracking on open',
      async ({ tealiumMock, waitForAnalytics }) => {
        renderThirdPartyExternalLink({ ...defaultAttrs, 'analytics-label-override': 'true' });

        const anchor = screen.getByRole('link');
        fireEvent.click(anchor);

        const confirmButton = await screen.findByText('Continue');
        fireEvent.click(confirmButton);

        await waitForAnalytics();
        expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      }
    );
  });
});
