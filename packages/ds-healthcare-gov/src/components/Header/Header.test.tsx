import Header from './Header';
import React from 'react';
import { setLanguage } from '@cmsgov/design-system';
import { SkipNav } from '@cmsgov/design-system';
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

    const newProps = { links: [{ href: '/foo', label: 'Foo' }] };
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
});
