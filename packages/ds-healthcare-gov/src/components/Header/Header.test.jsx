import Header from './Header';
import React from 'react';
import { SkipNav } from '@cmsgov/design-system';
import { shallow } from 'enzyme';

function render(props) {
  props = Object.assign(
    {
      t: (key) => key,
    },
    props
  );

  return shallow(<Header {...props} />);
}

describe('Header', function () {
  it('renders full/homepage header', () => {
    expect(render()).toMatchSnapshot();
  });

  it('renders Direct Enrollment banner', () => {
    expect(
      render({
        deConsumer: true,
        deBrokerName: 'Foo',
      })
    ).toMatchSnapshot();
  });

  it('renders logged-in header with firstName', () => {
    expect(render({ loggedIn: true, firstName: 'John' })).toMatchSnapshot();
  });

  it('renders logged-in header without firstName', () => {
    expect(render({ loggedIn: true })).toMatchSnapshot();
  });

  it('renders Spanish header', () => {
    expect(render({ initialLanguage: 'es' })).toMatchSnapshot();
  });

  it('toggles openMenu state when handleMenuToggleClick is called', () => {
    const wrapper = render();
    const actionMenuProps = () => wrapper.find('ActionMenu').props();
    expect(actionMenuProps().open).toBe(false);
    actionMenuProps().onMenuToggleClick();
    expect(actionMenuProps().open).toBe(true);
  });

  it('passes correct props to SkipNav', () => {
    const props = {
      skipNavHref: 'javascript:void(0)',
      onSkipNavClick: () => {},
    };
    const wrapper = render(props);
    const skipNav = wrapper.find(SkipNav);
    expect(skipNav.length).toEqual(1);
    expect(skipNav.props()).toMatchObject({
      href: props.skipNavHref,
      onClick: props.onSkipNavClick,
    });
  });

  it('re-renders with updated links', () => {
    const props = { loggedIn: true };
    const wrapper = render(props);

    let menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(4);

    wrapper.setProps({ links: [{ href: '/foo', label: 'Foo' }] });
    menu = wrapper.find('Menu');

    // You always get the logout link and locale link with any custom links unless you
    // explicitly disable them
    expect(menu.prop('links').length).toBe(3);
  });

  it('should add spanish toggle if logged in', () => {
    const props = { loggedIn: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(4);

    expect(menu.prop('links')[2].label).toContain('Español');
  });

  it('should not add Spanish toggle when hideLanguageSwitch set', () => {
    const props = { hideLanguageSwitch: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(1);

    expect(menu.prop('links')[0].label).not.toContain('Español');
  });

  it('should not add Login Link when hideLoginLink set', () => {
    const props = { hideLoginLink: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(1);

    expect(menu.prop('links')[0].label).not.toContain('Log in');
  });

  it('should not add Logout Link when hideLogoutLink set', () => {
    const props = { loggedIn: true, hideLogoutLink: true, links: [] };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(1);

    expect(menu.prop('links')[0].label).not.toContain('Log out');
  });

  it('should have "logout" as last item when logged in', () => {
    const props = { loggedIn: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    const menuLinks = menu.dive().find('MenuLinks');
    const lastLink = menuLinks.dive().find('a').last();

    expect(lastLink).toBeDefined();
    expect(lastLink.text()).toContain('Log out');
  });

  it('renders links with absolute URLs if provided a primaryDomain prop', () => {
    expect(render({ primaryDomain: 'https://www.healthcare.gov' })).toMatchSnapshot();
  });

  it('toggles open menu for fully controlled operation', () => {
    const onMenuToggle = jest.fn();
    const wrapper = render({
      isMenuOpen: false,
      onMenuToggle,
    });
    const actionMenuProps = () => wrapper.find('ActionMenu').props();
    expect(actionMenuProps().open).toBe(false);
    actionMenuProps().onMenuToggleClick();
    expect(onMenuToggle).toHaveBeenCalled();
  });
});
