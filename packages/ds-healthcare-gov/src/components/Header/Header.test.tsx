import Header from './Header';
import { setLanguage } from '@cmsgov/design-system';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function makeHeader(props = {}) {
  props = Object.assign(
    {
      t: (key: string) => key,
    },
    props
  );

  return render(<Header {...props} />);
}

describe('Header', function () {
  it('renders full/homepage header', () => {
    const { container } = makeHeader({});
    expect(container).toMatchSnapshot();
  });

  it('renders Direct Enrollment banner', () => {
    const { container } = makeHeader({
      deConsumer: true,
      deBrokerName: 'Foo',
    });
    expect(container).toMatchSnapshot();
  });

  it('renders logged-in header with firstName', () => {
    const { container } = makeHeader({ loggedIn: true, firstName: 'John' });
    expect(container).toMatchSnapshot();
  });

  it('renders logged-in header without firstName', () => {
    const { container } = makeHeader({ loggedIn: true });
    expect(container).toMatchSnapshot();
  });

  it('renders Spanish header', () => {
    setLanguage('es');
    const { container } = makeHeader();
    expect(container).toMatchSnapshot();
    setLanguage('en');
  });

  it('toggles openMenu state when handleMenuToggleClick is called', () => {
    makeHeader();
    const actionMenuOpen = screen.getByLabelText('Open menu');
    expect(actionMenuOpen).toBeInTheDocument();
    userEvent.click(actionMenuOpen);
    const actionMenuClose = screen.getByLabelText('Close menu');
    expect(actionMenuClose).toBeInTheDocument();
  });

  it('passes correct props to SkipNav', () => {
    makeHeader({
      skipNavHref: '',
      onSkipNavClick: () => jest.fn(),
    });
    const skipNav = screen.getByText('Skip to main content');
    expect(skipNav).toBeInTheDocument();
  });

  it('re-renders with updated links', () => {
    const { rerender } = render(<Header loggedIn={true} />);

    // You always get the logout link and locale link with any custom links unless you
    // explicitly disable them
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);

    const newProps = { links: [{ href: '/foo', label: 'Foo', ariaLabel: 'Bar in Foo' }] };
    rerender(<Header {...newProps} />);
    const newLinks = screen.getAllByRole('link');

    expect(newLinks.length).toBe(5);
  });

  it('should add spanish toggle if logged in', () => {
    makeHeader({ loggedIn: true, hideLanguageSwitch: false });

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);

    const languageSwitch = screen.getByText('Español');
    expect(languageSwitch).toBeInTheDocument();
  });

  it('should not add Spanish toggle when hideLanguageSwitch set', () => {
    makeHeader({ hideLanguageSwitch: true });

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);

    const languageSwitch = screen.queryByText('Español');
    expect(languageSwitch).not.toBeInTheDocument();
  });

  it('should not add Login Link when hideLoginLink set', () => {
    makeHeader({ hideLoginLink: true });

    const loginLink = screen.queryByText('Log in');
    expect(loginLink).not.toBeInTheDocument();
  });

  it('should not add Logout Link when hideLogoutLink set', () => {
    makeHeader({ loggedIn: true, hideLogoutLink: true, links: [] });

    const logoutLink = screen.queryByText('Log out');
    expect(logoutLink).not.toBeInTheDocument();
  });

  it('renders links with absolute URLs if provided a primaryDomain prop', () => {
    const { container } = makeHeader({ primaryDomain: 'https://www.healthcare.gov' });
    expect(container).toMatchSnapshot();
  });

  it('toggles open menu for fully controlled operation', () => {
    const onMenuToggle = jest.fn();
    makeHeader({
      isMenuOpen: false,
      onMenuToggle,
    });

    const menuButton = screen.getByRole('button', { name: 'Open menu' });
    const menu = screen.getByRole('list');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveClass('ds-u-display--none');

    userEvent.click(menuButton);
    expect(onMenuToggle).toHaveBeenCalled();
  });

  it('should render custom classes provided for Logo', () => {
    const customClass = 'custom-class-logo';
    const { baseElement } = makeHeader({
      logoClassName: customClass,
    });
    const logo = baseElement.querySelector('.hc-c-logo');
    expect(logo.className.includes(customClass)).toBe(true);
  });

  it('should render custom class and id provided for language switch link', () => {
    const customClass = 'custom-class-lang';
    makeHeader({
      languageLinkClassName: customClass,
    });

    const languageSwitch = screen.getAllByText('Español')[0];
    expect(languageSwitch).toBeInTheDocument();
    expect(languageSwitch.className.includes(customClass)).toBe(true);
  });

  it('should render custom class and id provided for login link', () => {
    const customClass = 'custom-class-login';
    makeHeader({ loginLinkClassName: customClass });

    const loginLink = screen.queryAllByText('Log in')[0];
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.className.includes(customClass)).toBe(true);
  });

  it('should render custom classes provided within links', () => {
    const customClass = 'custom-class-link';
    const { baseElement } = makeHeader({
      links: [
        {
          label: 'Custom Link',
          href: '/',
          className: customClass,
          ariaLabel: 'Custom Link',
        },
      ],
    });
    const actionMenuLink = baseElement.querySelector(`.hc-c-logged-out-links__link.${customClass}`);
    const menuLink = baseElement.querySelector(`.hc-c-menu__link.${customClass}`);

    expect(actionMenuLink).toBeTruthy();
    expect(menuLink).toBeTruthy();
  });
});
