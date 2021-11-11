import { mount, shallow } from 'enzyme';
import ActionMenu from './ActionMenu';
import React from 'react';

describe('ActionMenu', function () {
  const handleMenuToggleClick = jest.fn();

  beforeEach(() => {
    handleMenuToggleClick.mockReset();
  });

  describe('logged-in version', () => {
    function component(props = {}) {
      return (
        <ActionMenu
          loggedIn
          firstName="John"
          onMenuToggleClick={handleMenuToggleClick}
          links={[]}
          {...props}
        />
      );
    }
    it('renders logged-in version', () => {
      expect(mount(component())).toMatchSnapshot();
    });

    it('set aria-expanded to true', () => {
      expect(mount(component({ open: true }))).toMatchSnapshot();
    });

    it('calls onMenuToggleClick', () => {
      const wrapper = mount(component());
      const button = wrapper.find('Button');

      button.simulate('click');

      expect(handleMenuToggleClick.mock.calls.length).toBe(1);
    });
  });

  describe('logged-out version', () => {
    /* eslint-disable react/no-multi-comp */
    function component(props = {}) {
      return (
        <ActionMenu
          loggedIn={false}
          locale="en"
          onMenuToggleClick={handleMenuToggleClick}
          links={[
            {
              label: 'label',
              href: 'href',
            },
          ]}
          {...props}
        />
      );
    }
    /* eslint-enable */

    it('renders logged-out version', () => {
      expect(mount(component())).toMatchSnapshot();
    });
  });

  describe('analytics', () => {
    beforeEach(() => {
      window.utag = {
        link: jest.fn(),
      };
    });

    function getMenuButton(wrapper, loggedIn) {
      return wrapper
        .dive()
        .find(loggedIn ? 'LoggedInActionMenu' : 'LoggedOutActionMenu')
        .dive()
        .find('MenuButton')
        .dive()
        .find('Button');
    }

    it('sends analytics event when logged-out action menu link clicked', () => {
      const wrapper = shallow(
        <ActionMenu
          loggedIn={false}
          locale="en"
          onMenuToggleClick={handleMenuToggleClick}
          links={[
            {
              label: 'ZOMBO',
              href: 'https://www.zombo.com',
            },
          ]}
        />
      );
      wrapper.dive().find('LoggedOutActionMenu').dive().find('a').simulate('click');
      expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
    });

    it('sends analytics event when logged-out menu opened', () => {
      const wrapper = shallow(
        <ActionMenu
          loggedIn={false}
          locale="en"
          onMenuToggleClick={handleMenuToggleClick}
          links={[{ label: 'label', href: 'href' }]}
        />
      );
      getMenuButton(wrapper).simulate('click');
      expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });

    it('sends analytics event when logged-out menu closed', () => {
      const wrapper = shallow(
        <ActionMenu
          loggedIn={false}
          open
          locale="en"
          onMenuToggleClick={handleMenuToggleClick}
          links={[{ label: 'label', href: 'href' }]}
        />
      );
      getMenuButton(wrapper).simulate('click');
      expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });

    it('sends analytics event when logged-in menu opened', () => {
      const wrapper = shallow(
        <ActionMenu loggedIn locale="en" onMenuToggleClick={handleMenuToggleClick} links={[]} />
      );
      getMenuButton(wrapper, true).simulate('click');
      expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });

    it('sends analytics event when logged-in menu closed', () => {
      const wrapper = shallow(
        <ActionMenu
          loggedIn
          open
          locale="en"
          onMenuToggleClick={handleMenuToggleClick}
          links={[]}
        />
      );
      getMenuButton(wrapper, true).simulate('click');
      expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
      expect(handleMenuToggleClick).toHaveBeenCalled();
    });
  });
});
