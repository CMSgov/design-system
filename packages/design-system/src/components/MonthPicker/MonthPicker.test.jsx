import MonthPicker from './MonthPicker.jsx';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const defaultProps = {
  name: 'months',
  selectAllText: 'Select all',
  clearAllText: 'Clear all',
  label: 'Select months'
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

  it('selectAllText and clearAllText defaults work', () => {
    const wrapper = shallow(<MonthPicker name="months" label="Months" />);
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

    // Changing to let to allow multiple find references
    let buttons = wrapper.find('Button');
    expect(buttons.at(0).props()['aria-pressed']).toBe(false);
    expect(buttons.at(1).props()['aria-pressed']).toBe(true);

    // Click Select All button
    buttons.at(0).simulate('click');
    expect(onSelectAll).toHaveBeenCalled();

    // Create point of reference to Select All
    buttons = wrapper.find('Button');
    expect(buttons.at(0).props()['aria-pressed']).toBe(true);
    expect(buttons.at(1).props()['aria-pressed']).toBe(false);

    // Click Clear All button
    buttons.at(1).simulate('click');
    expect(onClearAll).toHaveBeenCalled();

    // Create new point of reference to Clear All
    buttons = wrapper.find('Button');
    expect(buttons.at(0).props()['aria-pressed']).toBe(false);
    expect(buttons.at(1).props()['aria-pressed']).toBe(true);
  });

  it('inversed prop propagates to all children', () => {
    const { wrapper } = renderMonthPicker({ inversed: true });
    const buttons = wrapper.find('Button');
    const choices = wrapper.find('Choice');
    buttons.forEach(button => expect(button.props().inversed).toEqual(true));
    choices.forEach(choice => expect(choice.props().inversed).toEqual(true));
  });

  it('buttonVariation prop applied to buttons', () => {
    const { wrapper } = renderMonthPicker({ buttonVariation: 'primary' });
    const buttons = wrapper.find('Button');
    buttons.forEach(button => expect(button.props().variation).toEqual('primary'));
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

    const { wrapper } = renderMonthPicker({ locale: 'en' });
    wrapper.find('Choice').forEach((choice, i) => {
      expect(choice.props().children).toEqual(shortMonthNames[i]);
      expect(choice.props()['aria-label']).toEqual(longMonthNames[i]);
    });
  });

  it('choice values correspond to month numbers', () => {
    const { wrapper } = renderMonthPicker();
    wrapper.find('Choice').forEach((choice, i) => {
      expect(choice.props().value).toEqual(i + 1);
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
    const disabledMonths = [5, 9];
    const { wrapper } = renderMonthPicker({ disabledMonths });
    let buttons = wrapper.find('Button');
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.disabled).toBe(false);
    expect(choices.get(1).props.disabled).toBe(false);
    expect(choices.get(4).props.disabled).toBe(true);
    expect(choices.get(8).props.disabled).toBe(true);
    expect(choices.get(11).props.disabled).toBe(false);

    // Check buttons' default aria-pressed
    expect(buttons.at(0).props()['aria-pressed']).toBe(false);
    expect(buttons.at(1).props()['aria-pressed']).toBe(true);

    // Create point of reference to Select All
    buttons.at(0).simulate('click');
    buttons = wrapper.find('Button');
    expect(buttons.at(0).props()['aria-pressed']).toBe(true);
    expect(buttons.at(1).props()['aria-pressed']).toBe(false);

    // Create point of reference to Clear All
    buttons.at(1).simulate('click');
    buttons = wrapper.find('Button');
    expect(buttons.at(0).props()['aria-pressed']).toBe(false);
    expect(buttons.at(1).props()['aria-pressed']).toBe(true);
  });

  it('checks month choices according to `selectedMonths` prop', () => {
    const selectedMonths = [5, 9];
    const { wrapper } = renderMonthPicker({ selectedMonths });
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.checked).toBe(false);
    expect(choices.get(1).props.checked).toBe(false);
    expect(choices.get(4).props.checked).toBe(true);
    expect(choices.get(8).props.checked).toBe(true);
    expect(choices.get(11).props.checked).toBe(false);
  });

  it('checks month choices according to `defaultSelectedMonths` prop and maitains state', () => {
    const defaultSelectedMonths = [5, 9];
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
      .simulate('change', { target: { value: 1 } });

    wrapper.update();
    expect(wrapper.find('Choice').get(0).props.checked).toBe(true);
  });

  it('renders a snapshot', () => {
    const tree = renderer.create(<MonthPicker name="months" label="Months" locale="en" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
