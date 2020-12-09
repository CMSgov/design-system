jest.mock('lodash.uniqueid', () => (str) => `${str}snapshot`);
/* eslint-disable import/first */
import DateField from './DateField';
import React from 'react';
import renderer from 'react-test-renderer';

describe('DateField', () => {
  it('renders with all defaultProps', () => {
    expect(renderer.create(<DateField />)).toMatchSnapshot();
  });

  it('has requirementLabel', () => {
    expect(renderer.create(<DateField requirementLabel="Optional." />)).toMatchSnapshot();
  });

  it('has errorMessage', () => {
    expect(renderer.create(<DateField errorMessage="This is required." />)).toMatchSnapshot();
  });
});
