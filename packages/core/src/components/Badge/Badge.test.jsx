import Badge from './Badge';
import React from 'react';
import { shallow } from 'enzyme';

describe('Badge', () => {
  it('should include children as label', () => {
    expect(shallow(<Badge>Foo</Badge>).text()).toEqual('Foo');
  });
});
