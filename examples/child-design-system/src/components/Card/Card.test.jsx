import Card from './Card';
import React from 'react';
import { shallow } from 'enzyme';

describe('Card', () => {
  it('Card should include children', () => {
    expect(shallow(<Card>Foo</Card>).text()).toEqual('Foo');
  });
});
