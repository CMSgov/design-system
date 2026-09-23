import { setLanguage, UtagContainer } from '@cmsgov/design-system';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

function makeHeader(props = {}) {
  props = Object.assign(
    {
      t: (key: string) => key,
    },
    props
  );

  return {
    user: userEvent.setup(),
    ...render(<Header {...props} />),
  };
}

function getMenuToggle() {
  return screen.getByRole('button', { name: /^(Open|Close) menu$/ });
}

function getMenu() {
  return document.querySelector('#hc-c-menu');
}

function expectMenuToBeOpen() {
  expect(getMenuToggle()).toHaveAttribute('aria-expanded', 'true');
  expect(getMenu()).not.toHaveAttribute('hidden');
}

function expectMenuToBeClosed() {
  expect(getMenuToggle()).toHaveAttribute('aria-expanded', 'false');
  expect(getMenu()).toHaveAttribute('hidden');
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

  describe('menu', () => {
    it('changes the toggle label when clicked', async () => {
      const { user } = makeHeader();
      expect(getMenuToggle()).toHaveAccessibleName('Open menu');
      await user.click(getMenuToggle());
      expect(getMenuToggle()).toHaveAccessibleName('Close menu');
    });

    it('opens and closes with Enter and Space on the toggle', async () => {
      const { user } = makeHeader({ loggedIn: true });

      getMenuToggle().focus();
      await user.keyboard('{Enter}');
      expectMenuToBeOpen();
      await user.keyboard('{Enter}');
      expectMenuToBeClosed();
      await user.keyboard('[Space]');
      expectMenuToBeOpen();
      await user.keyboard('[Space]');
      expectMenuToBeClosed();
    });

    it('asks a controlled menu to toggle when the toggle is clicked', async () => {
      const onMenuToggle = jest.fn();
      const { user } = makeHeader({
        isMenuOpen: false,
        onMenuToggle,
      });

      expectMenuToBeClosed();

      await user.click(getMenuToggle());
      expect(onMenuToggle).toHaveBeenCalled();
    });

    describe('Escape key', () => {
      it('closes the menu and returns focus to the toggle', async () => {
        const { user } = makeHeader({ loggedIn: true });

        await user.click(getMenuToggle());
        const tealiumMock = jest.fn();
        (window as any as UtagContainer).utag = { link: tealiumMock };
        getMenu().querySelector('a').focus();
        await user.keyboard('{Escape}');

        expectMenuToBeClosed();
        expect(getMenuToggle()).toHaveFocus();
        expect(tealiumMock).not.toHaveBeenCalled();
      });

      it('leaves a closed menu closed', async () => {
        const { user } = makeHeader({ loggedIn: true });

        getMenuToggle().focus();
        await user.keyboard('{Escape}');

        expectMenuToBeClosed();
      });

      it('asks an open controlled menu to close', async () => {
        const onMenuToggle = jest.fn();
        const { user } = makeHeader({ loggedIn: true, isMenuOpen: true, onMenuToggle });

        getMenu().querySelector('a').focus();
        await user.keyboard('{Escape}');

        expect(onMenuToggle).toHaveBeenCalledTimes(1);
        expect(getMenuToggle()).toHaveFocus();
      });

      it('does not toggle a closed controlled menu', async () => {
        const onMenuToggle = jest.fn();
        const { user } = makeHeader({ loggedIn: true, isMenuOpen: false, onMenuToggle });

        getMenuToggle().focus();
        await user.keyboard('{Escape}');

        expect(onMenuToggle).not.toHaveBeenCalled();
      });
    });
  });
});
