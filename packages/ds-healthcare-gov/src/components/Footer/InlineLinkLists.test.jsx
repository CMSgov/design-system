import InlineLinkLists from './InlineLinkLists';
import React from 'react';
import { shallow } from 'enzyme';

const t = (key) => key;

describe('InlineLinkLists', function () {
  it('renders lists of links', () => {
    expect(shallow(<InlineLinkLists t={t} />)).toMatchSnapshot();
  });

  it('includes a lang attribute on language links', () => {
    const wrapper = shallow(<InlineLinkLists t={t} />);
    const link = wrapper
      .find('.ds-c-list')
      .at(2) // Languages list is the 3rd list
      .find('a')
      .first();
    expect(link.prop('lang')).toMatch(/[a-z][a-z]/);
  });

  it('renders lists of links with absolute URLs', () => {
    expect(
      shallow(
        <InlineLinkLists t={t} primaryDomain="https://www.healthcare.gov" />
      )
    ).toMatchSnapshot();
  });
});
