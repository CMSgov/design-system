import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MedicareThirdPartyExternalLink from './MedicaregovThirdPartyExternalLink';

const defaultProps = {
  children: 'External site link',
  href: 'foo',
  origin: 'bar',
};

function renderThirdPartyExternalLink(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return {
    user: userEvent.setup(),
    ...render(<MedicareThirdPartyExternalLink {...props} />),
  };
}

function getLink() {
  return screen.getByRole('link');
}

describe('MedicaregovThirdPartyExternalLink', () => {
  it('renders external link', () => {
    renderThirdPartyExternalLink();
    expect(getLink()).toMatchSnapshot();
  });

  describe('MedicaregovThirdPartyExternalLink dialog', () => {
    it('renders external link dialog', async () => {
      const { user } = renderThirdPartyExternalLink();

      await act(async () => {
        await user.click(getLink());
      });

      const dialog = screen.getByRole('dialog');
      expect(dialog).toMatchSnapshot();
    });

    it('renders default URL in Learn More link', async () => {
      const { user } = renderThirdPartyExternalLink();

      await user.click(getLink());

      const learnMoreLink = screen.getByText('Learn more about links to third-party sites');
      expect(learnMoreLink.getAttribute('href')).toBe(
        'https://www.cms.gov/About-CMS/Agency-Information/Aboutwebsite/PolicyforLinkingtoOutsideWebsites'
      );
    });

    it('renders custom URL in Learn More link', async () => {
      const { user } = renderThirdPartyExternalLink({ learnMoreUrl: 'https://www.cms.gov/' });

      await user.click(getLink());

      const learnMoreLink = screen.getByText('Learn more about links to third-party sites');
      expect(learnMoreLink.getAttribute('href')).toBe('https://www.cms.gov/');
    });
  });
});
