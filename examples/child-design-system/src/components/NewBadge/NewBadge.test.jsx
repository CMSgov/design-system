import Badge from './NewBadge';
import React from 'react';
import { shallow } from 'enzyme';

describe('NewBadge', () => {
  it('should include NewBadge children', () => {
    expect(shallow(<Badge>Foo</Badge>).text()).toEqual('NEW BADGE');
  });
});
