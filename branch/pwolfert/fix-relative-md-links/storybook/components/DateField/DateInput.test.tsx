jest.mock('lodash/uniqueId', () => (str) => `${str}snapshot`);
import { mount, shallow } from 'enzyme';
import DateInput, { DateInputProps } from './DateInput';
import React from 'react';

const defaultProps: DateInputProps = {
  labelId: '1',
  dayName: 'day',
  dayLabel: 'Day',
  monthName: 'month',
  monthLabel: 'Month',
  yearName: 'Year',
  yearLabel: 'year',
};

function render(customProps: Partial<DateInputProps> = {}, deep = false) {
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

  it('is disabled', () => {
    expect(render({ disabled: true }).wrapper).toMatchSnapshot();
  });

  it('returns reference to input fields', () => {
    let dayRef;
    let monthRef;
    let yearRef;

    const data = render(
      {
        dayDefaultValue: '1',
        dayFieldRef: (el) => {
          dayRef = el;
        },
        monthDefaultValue: '22',
        monthFieldRef: (el) => {
          monthRef = el;
        },
        yearDefaultValue: '3333',
        yearFieldRef: (el) => {
          yearRef = el;
        },
      },
      true
    );

    expect(dayRef.value).toBe(data.props.dayDefaultValue);
    expect(monthRef.value).toBe(data.props.monthDefaultValue);
    expect(yearRef.value).toBe(data.props.yearDefaultValue);
  });

  describe('event handlers', () => {
    const props = {
      onBlur: jest.fn(),
      onChange: jest.fn(),
    };

    beforeEach(() => {
      props.onBlur.mockClear();
      props.onChange.mockClear();
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
      const onComponentBlur = jest.fn();
      const wrapper = shallow(<DateInput {...defaultProps} onComponentBlur={onComponentBlur} />);
      wrapper.find('TextField').last().simulate('blur');

      setTimeout(() => {
        expect(onComponentBlur).toHaveBeenCalledTimes(1);
        done();
      }, 20);
    });

    it('does not call onComponentBlur when focus switches to other date component', (done) => {
      const onComponentBlur = jest.fn();
      const wrapper = mount(<DateInput {...defaultProps} onComponentBlur={onComponentBlur} />);
      wrapper.find('TextField').first().simulate('blur');

      setTimeout(() => {
        expect(onComponentBlur).not.toHaveBeenCalled();
        done();
      }, 20);
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
