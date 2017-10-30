jest.mock('lodash.uniqueid', () => str => `${str}snapshot`);
/* eslint-disable import/first */
import DateField from './DateField';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('DateField', () => {
  it('renders with all defaultProps', () => {
    expect(renderer.create(<DateField />)).toMatchSnapshot();
  });

  it('has requirementLabel', () => {
    expect(
      renderer.create(<DateField requirementLabel="Optional" />)
    ).toMatchSnapshot();
  });

  it('has errorMessage', () => {
    expect(
      renderer.create(<DateField errorMessage="This is required." />)
    ).toMatchSnapshot();
  });

  it('is inversed', () => {
    expect(renderer.create(<DateField inversed />)).toMatchSnapshot();
  });

  it('has custom yearMax and yearMin', () => {
    expect(
      renderer.create(<DateField yearMax={2000} yearMin="1990" />)
    ).toMatchSnapshot();
  });

  describe('event handlers', () => {
    let wrapper;
    let props;

    beforeEach(() => {
      props = {
        onBlur: jest.fn(),
        onChange: jest.fn()
      };
      wrapper = shallow(<DateField {...props} />);
    });

    it('calls onBlur when month is blurred', () => {
      wrapper
        .find('TextField')
        .at(0)
        .simulate('blur');

      expect(props.onBlur.mock.calls.length).toBe(1);
      expect(props.onChange.mock.calls.length).toBe(0);
    });

    it('calls onBlur when day is changed', () => {
      wrapper
        .find('TextField')
        .at(1)
        .simulate('change');

      expect(props.onBlur.mock.calls.length).toBe(0);
      expect(props.onChange.mock.calls.length).toBe(1);
    });
  });
});
