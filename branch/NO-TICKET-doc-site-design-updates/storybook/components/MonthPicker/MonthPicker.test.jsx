import { mount, shallow } from 'enzyme';
import MonthPicker from './MonthPicker';
import React from 'react';
import renderer from 'react-test-renderer';

const defaultProps = {
  name: 'months',
  label: 'Months',
  selectAllText: 'Select all',
  clearAllText: 'Clear all',
};

// Mounts the component by default because the choices are passed into FormControl as a function
function render(customProps = {}, deep = true) {
  const props = { ...defaultProps, ...customProps };
  const component = <MonthPicker {...props} />;
  return {
    props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('MonthPicker', () => {
  it('renders a snapshot', () => {
    const tree = renderer.create(<MonthPicker {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Select-all and clear-all buttons have default text', () => {
    const { wrapper } = render();
    const buttons = wrapper.find('Button');
    expect(buttons.at(0).prop('children')).toEqual('Select all');
    expect(buttons.at(1).prop('children')).toEqual('Clear all');
  });

  it('Select-all and clear-all buttons trigger onSelectAll and onClearAll', () => {
    const onSelectAll = jest.fn();
    const onClearAll = jest.fn();
    const { wrapper } = render({ onSelectAll, onClearAll });

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
    const { wrapper } = render({ inversed: true });
    const buttons = wrapper.find('Button');
    const choices = wrapper.find('Choice');
    buttons.forEach((button) => expect(button.props().onDark).toEqual(true));
    choices.forEach((choice) => expect(choice.props().inversed).toEqual(true));
  });

  it('buttonVariation prop applied to buttons', () => {
    const { wrapper } = render({ buttonVariation: 'solid' });
    const buttons = wrapper.find('Button');
    buttons.forEach((button) => expect(button.props().variation).toEqual('solid'));
  });

  it('name prop propagates to all children', () => {
    const { wrapper } = render({ name: 'months' });
    const choices = wrapper.find('Choice');
    choices.forEach((choice) => expect(choice.props().name).toEqual('months'));
  });

  it('generates month names with based on locale', () => {
    const shortMonthNames = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sept',
      'oct',
      'nov',
      'dic',
    ];
    const longMonthNames = [
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
      'diciembre',
    ];

    const { wrapper } = render({ locale: 'es' });
    wrapper.find('Choice').forEach((choice, i) => {
      expect(choice.props().label).toEqual(shortMonthNames[i]);
      expect(choice.props()['aria-label']).toEqual(longMonthNames[i]);
    });
  });

  it('choice values correspond to month numbers', () => {
    const { wrapper } = render();
    wrapper.find('Choice').forEach((choice, i) => {
      expect(choice.props().value).toEqual(i + 1);
    });
  });

  it('checking/unchecking checkboxes calls onChange and maintains state', () => {
    const onChange = jest.fn();
    const { wrapper } = render({ onChange });
    const choice = wrapper.find('Choice').first();
    choice.simulate('change', { target: { value: 1 } });
    wrapper.update();

    setTimeout(() => {
      expect(onChange).toHaveBeenCalled();
      expect(choice.prop('checked')).toBe(true);
    }, 20);
  });

  it('disables month choices according to `disabledMonths` prop', () => {
    const disabledMonths = [5, 9];
    const { wrapper } = render({ disabledMonths });
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
    const { wrapper } = render({ selectedMonths });
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.checked).toBe(false);
    expect(choices.get(1).props.checked).toBe(false);
    expect(choices.get(4).props.checked).toBe(true);
    expect(choices.get(8).props.checked).toBe(true);
    expect(choices.get(11).props.checked).toBe(false);
  });

  it('checks month choices according to `defaultSelectedMonths` prop', () => {
    const defaultSelectedMonths = [5, 9];
    const { wrapper } = render({ defaultSelectedMonths });
    const choices = wrapper.find('Choice');
    expect(choices.get(0).props.checked).toBe(false);
    expect(choices.get(1).props.checked).toBe(false);
    expect(choices.get(4).props.checked).toBe(true);
    expect(choices.get(8).props.checked).toBe(true);
    expect(choices.get(11).props.checked).toBe(false);
  });
});
