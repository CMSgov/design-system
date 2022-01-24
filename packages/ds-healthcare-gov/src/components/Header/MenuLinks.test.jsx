import MenuLinks from './MenuLinks';
import React from 'react';
import { shallow } from 'enzyme';

describe('MenuLinks', function () {
  it('renders list of links', () => {
    expect(
      shallow(
        <MenuLinks
          links={[
            { href: '#foo', label: 'Foo' },
            { href: '#bar', label: 'Bar' },
            { href: '#baz', label: 'Baz', onClick: () => {} },
          ]}
        />
      )
    ).toMatchSnapshot();
  });

  describe('analytics', () => {
    beforeEach(() => {
      window.utag = {
        link: jest.fn(),
      };
    });

    it('sends analytics event when menu link clicked', () => {
      const wrapper = shallow(
        <MenuLinks links={[{ href: 'https://www.zombo.com', label: 'ZOMBO' }]} />
      );
      wrapper.find('a').simulate('click');
      expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
    });
  });
});
