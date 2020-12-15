jest.mock('lodash.uniqueid', () => (str) => `${str}snapshot`);
/* eslint-disable import/first */
import { mount, shallow } from 'enzyme';
import DateInput from './DateInput';
import React from 'react';

const defaultProps = {
  labelId: '1',
  dayName: 'day',
  dayLabel: 'Day',
  monthName: 'month',
  monthLabel: 'Month',
  yearName: 'Year',
  yearLabel: 'year',
};

function render(customProps = {}, deep = false) {
  const props = { ...defaultProps, ...customProps };
  const component = <DateInput {...props} />;

  return {
    props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('DateInput', () => {
  it('renders with all defaultProps', () => {
    expect(render().wrapper).toMatchSnapshot();
  });

  it('is inversed', () => {
    expect(render({ inversed: true }).wrapper).toMatchSnapshot();
  });

  it('has invalid month', () => {
    expect(render({ monthInvalid: true }).wrapper).toMatchSnapshot();
  });

  it('has invalid day', () => {
    expect(render({ dayInvalid: true }).wrapper).toMatchSnapshot();
  });

  it('has invalid year', () => {
    expect(render({ yearInvalid: true }).wrapper).toMatchSnapshot();
  });

  it('has custom yearMax and yearMin', () => {
    expect(render({ yearMax: 2000, yearMin: '1990' }).wrapper).toMatchSnapshot();
  });

  it('is disabled', () => {
    expect(render({ disabled: true }).wrapper).toMatchSnapshot();
  });

  it('returns reference to input fields', () => {
    const refs = {};
    const data = render(
      {
        dayDefaultValue: '1',
        dayFieldRef: (el) => {
          refs.day = el;
        },
        monthDefaultValue: '22',
        monthFieldRef: (el) => {
          refs.month = el;
        },
        yearDefaultValue: '3333',
        yearFieldRef: (el) => {
          refs.year = el;
        },
      },
      true
    );

    expect(refs.day.value).toBe(data.props.dayDefaultValue);
    expect(refs.month.value).toBe(data.props.monthDefaultValue);
    expect(refs.year.value).toBe(data.props.yearDefaultValue);
  });

  describe('event handlers', () => {
    const props = {
      onBlur: jest.fn(),
      onChange: jest.fn(),
      onComponentBlur: jest.fn(),
    };

    beforeEach(() => {
      props.onBlur.mockClear();
      props.onChange.mockClear();
      props.onComponentBlur.mockClear();
    });

    it('does not require event handler', () => {
      const data = render();

      data.wrapper.find('TextField').at(0).simulate('blur');
    });

    it('calls onBlur when month is blurred', () => {
      const data = render(props);
      data.wrapper.find('TextField').at(0).simulate('blur');

      expect(props.onBlur).toHaveBeenCalledTimes(1);
      expect(props.onChange).not.toHaveBeenCalled();
    });

    it('calls onChange when day is changed', () => {
      const data = render(props);
      data.wrapper.find('TextField').at(1).simulate('change');

      expect(props.onBlur).not.toHaveBeenCalled();
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('calls onComponentBlur when component loses focus', (done) => {
      const data = render(props);
      data.wrapper.find('TextField').at(2).simulate('blur');

      setTimeout(() => {
        expect(props.onComponentBlur).toHaveBeenCalledTimes(1);
        expect(props.onBlur).not.toHaveBeenCalled();
        expect(props.onChange).not.toHaveBeenCalled();
        done();
      }, 30);
    });

    it('does not call onComponentBlur when focus switches to other date component', (done) => {
      const data = render(props);
      data.wrapper.find('TextField').at(0).simulate('blur');

      setTimeout(() => {
        expect(props.onComponentBlur).not.toHaveBeenCalled();
        expect(props.onBlur).toHaveBeenCalledTimes(1);
        expect(props.onChange).not.toHaveBeenCalled();
        done();
      }, 30);
    });

    it('formats the date as a single string', () => {
      const data = render(
        {
          ...{
            dateFormatter: (values) => {
              return `${values.month} ${values.day} ${values.year}`;
            },
            monthValue: '1',
            dayValue: '22',
            yearValue: '3333',
          },
          ...props,
        },
        true
      );

      data.wrapper.find('input').at(1).simulate('change');
      data.wrapper.find('input').at(1).simulate('blur');

      expect(props.onBlur).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onBlur.mock.calls[0][1]).toBe('1 22 3333');
      expect(props.onChange.mock.calls[0][1]).toBe('1 22 3333');
    });
  });
});
