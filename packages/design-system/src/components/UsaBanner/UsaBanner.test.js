import React from 'react';
import UsaBanner from './UsaBanner';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<UsaBanner />).toJSON();
  expect(tree).toMatchSnapshot();
});
