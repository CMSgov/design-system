import React from 'react';
import {shallow} from 'enzyme';

import Badge from './Badge';

describe('Badge', () => {
  it('should include children as label', () => {
    expect(
      shallow(<Badge>Foo</Badge>).text()
    ).toEqual('Foo');
  });
});
