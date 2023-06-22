import React from 'react';
import ThirdPartyExternalLink from './ThirdPartyExternalLink';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  children: 'External site link',
  href: 'foo',
  origin: 'bar',
};

function renderThirdPartyExternalLink(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return render(<ThirdPartyExternalLink {...props} />);
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
    it('renders external link dialog', () => {
      renderThirdPartyExternalLink();

      userEvent.click(getLink());

      const dialog = screen.getByRole('dialog');
      expect(dialog).toMatchSnapshot();
    });

    it('renders custom URL in Learn More link', () => {
      renderThirdPartyExternalLink({ learnMoreUrl: 'https://www.google.com/' });

      userEvent.click(getLink());

      const learnMoreLink = screen.getByText('Learn more about links to third-party sites');
      expect(learnMoreLink.getAttribute('href')).toBe('https://www.google.com/');
    });

    it('renders confirmation link with custom href', () => {
      renderThirdPartyExternalLink({ href: 'https://www.google.com/' });

      userEvent.click(getLink());

      const confirmButton = screen.getByText('Continue');
      expect(confirmButton.getAttribute('href')).toBe('https://www.google.com/');
    });

    it('closes on cancel', () => {
      renderThirdPartyExternalLink();

      userEvent.click(getLink());

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      userEvent.click(screen.getByText('Cancel'));
      expect(dialog).not.toBeInTheDocument();
    });

    it('renders custom origin text in heading and body', () => {
      renderThirdPartyExternalLink({ origin: 'Custom origin' });

      userEvent.click(getLink());

      const dialog = screen.getByRole('dialog');
      const dialogHeading = screen.getByRole('heading');

      expect(dialog.textContent).toContain('Custom origin');
      expect(dialogHeading.textContent).toContain('Custom origin');
    });
  });
});
