import MonthPicker from './MonthPicker.jsx';
import React from 'react';
import { shallow } from 'enzyme';

const defaultProps = {
  name: 'months',
  selectAllText: 'Select all',
  clearAllText: 'Clear all'
};

function renderMonthPicker(props) {
  props = Object.assign({}, defaultProps, props);
  const wrapper = shallow(<MonthPicker {...props} />);
  return { props, wrapper };
}

describe('MonthPicker', () => {
  it('renders select-all and clear-all buttons', () => {
    const { wrapper } = renderMonthPicker();
    const buttons = wrapper.find('Button');
    expect(buttons.at(0).props().children).toEqual('Select all');
    expect(buttons.at(1).props().children).toEqual('Clear all');
  });

  it('Select-all and clear-all buttons trigger onSelectAll and onClearAll', () => {
    const onSelectAll = jest.fn();
    const onClearAll = jest.fn();
    const { wrapper } = renderMonthPicker({
      onSelectAll,
      onClearAll
    });
    const buttons = wrapper.find('Button');
    buttons.at(0).simulate('click');
    buttons.at(1).simulate('click');
    expect(onSelectAll).toHaveBeenCalled();
    expect(onClearAll).toHaveBeenCalled();
  });

  it('inversed prop propagates to all children', () => {
    const { wrapper } = renderMonthPicker({ inversed: true });
    const buttons = wrapper.find('Button');
    const choices = wrapper.find('Choice');
    buttons.forEach(button => expect(button.props().inversed).toEqual(true));
    choices.forEach(choice => expect(choice.props().inversed).toEqual(true));
  });

  it('name prop propagates to all children', () => {
    const { wrapper } = renderMonthPicker({ name: 'months' });
    const choices = wrapper.find('Choice');
    choices.forEach(choice => expect(choice.props().name).toEqual('months'));
  });

  it('generates month names with based on locale', () => {
    const shortMonthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const longMonthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    function verifyMonthNames(
      { wrapper },
      short = shortMonthNames,
      long = longMonthNames
    ) {
      wrapper.find('Choice').forEach((choice, i) => {
        expect(choice.props().children).toEqual(short[i]);
        expect(choice.props()['aria-label']).toEqual(long[i]);
      });
    }

    verifyMonthNames(renderMonthPicker()); // Test default locale
    verifyMonthNames(renderMonthPicker({ locale: 'en-US' }));
    verifyMonthNames(
      renderMonthPicker({ locale: 'es-US' }),
      [
        'ene.',
        'feb.',
        'mar.',
        'abr.',
        'may.',
        'jun.',
        'jul.',
        'ago.',
        'sep.',
        'oct.',
        'nov.',
        'dic.'
      ],
      [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
      ]
    );
  });

  it('choice values correspond to month numbers', () => {
    const { wrapper } = renderMonthPicker();
    wrapper.find('Choice').forEach((choice, i) => {
      expect(choice.props().value).toEqual(i);
    });
  });

  it('checking/unchecking checkboxes calls onChange', () => {
    const onChange = jest.fn();
    const { wrapper } = renderMonthPicker({ onChange });
    wrapper
      .find('Choice')
      .first()
      .simulate('change', { target: { value: 0 } });

    expect(onChange.mock.calls.length).toBe(1);
  });

  it('disables month choices according to `disabledMonths` prop', () => {
    const disabledMonths = [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    const { wrapper } = renderMonthPicker({ disabledMonths });
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.disabled).toBe(false);
    expect(choices.get(1).props.disabled).toBe(false);
    expect(choices.get(4).props.disabled).toBe(true);
    expect(choices.get(8).props.disabled).toBe(true);
    expect(choices.get(11).props.disabled).toBe(false);
  });

  it('checks month choices according to `selectedMonths` prop', () => {
    const selectedMonths = [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    const { wrapper } = renderMonthPicker({ selectedMonths });
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.checked).toBe(false);
    expect(choices.get(1).props.checked).toBe(false);
    expect(choices.get(4).props.checked).toBe(true);
    expect(choices.get(8).props.checked).toBe(true);
    expect(choices.get(11).props.checked).toBe(false);
  });

  it('checks month choices according to `defaultSelectedMonths` prop and maitains state', () => {
    const defaultSelectedMonths = [
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false
    ];
    const { wrapper } = renderMonthPicker({ defaultSelectedMonths });
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.checked).toBe(false);
    expect(choices.get(1).props.checked).toBe(false);
    expect(choices.get(4).props.checked).toBe(true);
    expect(choices.get(8).props.checked).toBe(true);
    expect(choices.get(11).props.checked).toBe(false);

    wrapper
      .find('Choice')
      .first()
      .simulate('change', { target: { value: 0 } });

    wrapper.update();
    expect(wrapper.find('Choice').get(0).props.checked).toBe(true);
  });
});
