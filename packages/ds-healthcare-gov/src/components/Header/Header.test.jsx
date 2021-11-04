import { _Header as Header } from './Header';
import React from 'react';
import { SkipNav } from '@cmsgov/design-system';
import { shallow } from 'enzyme';

jest.mock('../i18n', () => ({
  translate: (text) => text,
}));

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

    expect(wrapper.state().openMenu).toBe(false);

    wrapper.instance().handleMenuToggleClick();

    expect(wrapper.state().openMenu).toBe(true);
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

    expect(menu.prop('links')[2].label).toEqual('header.español');
  });

  it('should not add Spanish toggle when hideLanguageSwitch set', () => {
    const props = { hideLanguageSwitch: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(1);

    expect(menu.prop('links')[0].label).not.toEqual('header.español');
  });

  it('should not add Login Link when hideLoginLink set', () => {
    const props = { hideLoginLink: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(1);

    expect(menu.prop('links')[0].label).not.toEqual('header.login');
  });

  it('should not add Logout Link when hideLogoutLink set', () => {
    const props = { loggedIn: true, hideLogoutLink: true, links: [] };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    expect(menu.prop('links').length).toBe(1);

    expect(menu.prop('links')[0].label).not.toEqual('header.logout');
  });

  it('should have "logout" as last item when logged in', () => {
    const props = { loggedIn: true };
    const wrapper = render(props);

    const menu = wrapper.find('Menu');
    const menuLinks = menu.dive().find('MenuLinks');
    const lastLink = menuLinks.dive().find('a').last();

    expect(lastLink).toBeDefined();
    expect(lastLink.text()).toEqual('header.logout');
  });

  it('renders links with absolute URLs if provided a primaryDomain prop', () => {
    expect(render({ primaryDomain: 'https://www.healthcare.gov' })).toMatchSnapshot();
  });
});
