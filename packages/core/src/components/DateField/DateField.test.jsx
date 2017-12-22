jest.mock('lodash.uniqueid', () => str => `${str}snapshot`);
/* eslint-disable import/first */
import { mount, shallow } from 'enzyme';
import DateField from './DateField';
import React from 'react';
import renderer from 'react-test-renderer';

describe('DateField', () => {
  it('renders with all defaultProps', () => {
    expect(renderer.create(<DateField />)).toMatchSnapshot();
  });

  it('has requirementLabel', () => {
    expect(
      renderer.create(<DateField requirementLabel="Optional." />)
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

  it('has invalid month', () => {
    expect(renderer.create(<DateField monthInvalid />)).toMatchSnapshot();
  });

  it('has invalid day', () => {
    expect(renderer.create(<DateField dayInvalid />)).toMatchSnapshot();
  });

  it('has invalid year', () => {
    expect(renderer.create(<DateField yearInvalid />)).toMatchSnapshot();
  });

  it('has custom yearMax and yearMin', () => {
    expect(
      renderer.create(<DateField yearMax={2000} yearMin="1990" />)
    ).toMatchSnapshot();
  });

  it('returns reference to input fields', () => {
    const refs = {};
    const props = {
      dayDefaultValue: '1',
      dayFieldRef: el => {
        refs.day = el;
      },
      monthDefaultValue: '22',
      monthFieldRef: el => {
        refs.month = el;
      },
      yearDefaultValue: '3333',
      yearFieldRef: el => {
        refs.year = el;
      }
    };
    mount(<DateField {...props} />);

    expect(refs.day.value).toBe(props.dayDefaultValue);
    expect(refs.month.value).toBe(props.monthDefaultValue);
    expect(refs.year.value).toBe(props.yearDefaultValue);
  });

  describe('event handlers', () => {
    let props;

    beforeEach(() => {
      props = {
        onBlur: jest.fn(),
        onChange: jest.fn()
      };
    });

    it('does not require event handler', () => {
      const wrapper = shallow(<DateField />);

      // This shouldn't result in an error
      wrapper
        .find('TextField')
        .at(0)
        .simulate('blur');
    });

    it('calls onBlur when month is blurred', () => {
      const wrapper = shallow(<DateField {...props} />);

      wrapper
        .find('TextField')
        .at(0)
        .simulate('blur');

      expect(props.onBlur.mock.calls.length).toBe(1);
      expect(props.onChange.mock.calls.length).toBe(0);
    });

    it('calls onChange when day is changed', () => {
      const wrapper = shallow(<DateField {...props} />);

      wrapper
        .find('TextField')
        .at(1)
        .simulate('change');

      expect(props.onBlur.mock.calls.length).toBe(0);
      expect(props.onChange.mock.calls.length).toBe(1);
      // No date formatter
      expect(props.onChange.mock.calls[0][1]).toBeUndefined();
    });

    it('calls onComponentBlur when component loses focus', done => {
      const onComponentBlur = jest.fn();
      const dateFormatter = jest.fn();
      const wrapper = mount(
        <DateField
          onComponentBlur={onComponentBlur}
          dateFormatter={dateFormatter}
        />
      );

      const yearField = wrapper.find('.ds-c-field--year');
      yearField.simulate('blur');

      setTimeout(() => {
        expect(onComponentBlur).toHaveBeenCalled();
        expect(dateFormatter).toHaveBeenCalled();
        done();
      }, 30);
    });

    it('does not call onComponentBlur when focus switches to other date component', done => {
      const onComponentBlur = jest.fn();
      const dateFormatter = jest.fn();
      let yearField;
      const wrapper = mount(
        <DateField
          onComponentBlur={onComponentBlur}
          dateFormatter={dateFormatter}
          yearFieldRef={ref => {
            yearField = ref;
          }}
        />
      );

      const monthField = wrapper.find('.ds-c-field--month');
      monthField.simulate('blur');
      yearField.focus();

      setTimeout(() => {
        expect(onComponentBlur).not.toHaveBeenCalled();
        expect(dateFormatter).not.toHaveBeenCalled();
        done();
      }, 30);
    });

    it('formats the date as a single string', () => {
      props = Object.assign(
        {
          dateFormatter: values => {
            return `${values.month} ${values.day} ${values.year}`;
          },
          monthValue: '1',
          dayValue: '22',
          yearValue: '3333'
        },
        props
      );

      const wrapper = mount(<DateField {...props} />);

      wrapper
        .find('input')
        .at(1)
        .simulate('change');

      wrapper
        .find('input')
        .at(1)
        .simulate('blur');

      expect(props.onBlur.mock.calls.length).toBe(1);
      expect(props.onChange.mock.calls.length).toBe(1);
      expect(props.onBlur.mock.calls[0][1]).toBe('1 22 3333');
      expect(props.onChange.mock.calls[0][1]).toBe('1 22 3333');
    });
  });
});
