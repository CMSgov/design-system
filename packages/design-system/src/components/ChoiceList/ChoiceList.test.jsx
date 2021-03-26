import { mount, shallow } from 'enzyme';
import ChoiceList from './ChoiceList';
import React from 'react';

function generateChoices(length) {
  const choices = [];

  for (let i = 0; i < length; i++) {
    choices.push({
      label: `Choice ${i + 1}`,
      value: String(i + 1),
    });
  }

  return choices;
}

// Mounts the component by default because the choices are passed into FormControl as a function
function render(customProps = {}, choicesCount = 2, deep = true) {
  const props = {
    ...{
      choices: generateChoices(choicesCount),
      label: 'Foo',
      name: 'spec-field',
      type: 'radio',
    },
    ...customProps,
  };
  const component = <ChoiceList {...props} />;

  return {
    props,
    wrapper: deep ? mount(component) : shallow(component),
  };
}

describe('ChoiceList', () => {
  describe('Radio buttons and Checkboxes', () => {
    it('is a radio button group', () => {
      const { wrapper } = render({ type: 'radio' });

      expect(wrapper.find('Choice').first().prop('type')).toBe('radio');
      expect(wrapper).toMatchSnapshot();
    });

    it('is a checkbox group', () => {
      const { wrapper } = render({ type: 'checkbox' });

      expect(wrapper.find('Choice').first().prop('type')).toBe('checkbox');
    });

    it('is a checkbox', () => {
      const { wrapper } = render({ choices: generateChoices(1), type: 'checkbox' });

      expect(wrapper.find('Choice').first().prop('type')).toBe('checkbox');
    });

    it('renders all choices', () => {
      const { props, wrapper } = render();
      const choice = wrapper.find('Choice').first();

      expect(wrapper.find('Choice').length).toBe(props.choices.length);
      expect(choice.prop('name')).toBe(props.name);
      expect(choice.prop('value')).toBe(props.choices[0].value);
    });

    it('is enclosed by a fieldset', () => {
      const { wrapper } = render();
      const container = wrapper.find('FormControl');

      expect(container.prop('component')).toBe('fieldset');
    });

    it('renders the label prop as a legend element', () => {
      const { wrapper } = render();
      const container = wrapper.find('FormControl');

      expect(container.prop('labelComponent')).toBe('legend');
    });

    it('passes checked prop', () => {
      const choices = generateChoices(4);
      choices[0].checked = true;
      const { wrapper } = render({ choices, onChange: jest.fn() });

      expect(wrapper.find('Choice').first().prop('checked')).toBe(true);
    });

    it('passes defaultChecked prop', () => {
      const choices = generateChoices(4);
      choices[0].defaultChecked = true;
      const { wrapper } = render({ choices });

      expect(wrapper.find('Choice').first().prop('defaultChecked')).toBe(true);
    });

    it('passes disabled prop', () => {
      const choices = generateChoices(4);
      choices[0].disabled = true;
      const { wrapper } = render({ choices });

      expect(wrapper.find('Choice').first().prop('disabled')).toBe(true);
    });

    it('disables all choices', () => {
      const { wrapper } = render({ disabled: true });

      expect(wrapper.find('Choice').first().prop('disabled')).toBe(true);
      expect(wrapper.find('Choice').last().prop('disabled')).toBe(true);
    });

    it("doesn't pass an ID prop", () => {
      const { wrapper } = render();

      expect(wrapper.find('Choice').first().prop('id')).toBeUndefined();
    });

    it('is inversed Choice', () => {
      const { wrapper } = render({ inversed: true });

      expect(wrapper.find('Choice').first().prop('inversed')).toBe(true);
    });

    it('calls onChange', () => {
      const onChange = jest.fn();
      const { wrapper } = render({ onChange });
      wrapper.find('Choice').first().simulate('change');

      setTimeout(() => {
        expect(onChange).toHaveBeenCalled();
      }, 20);
    });

    it('calls onBlur', () => {
      const onBlur = jest.fn();
      const { wrapper } = render({ onBlur });
      wrapper.find('Choice').first().simulate('blur');

      setTimeout(() => {
        expect(onBlur).toHaveBeenCalled();
      }, 20);
    });

    it('calls onComponentBlur', () => {
      const onBlur = jest.fn();
      const onComponentBlur = jest.fn();
      const { wrapper } = render({ onBlur, onComponentBlur });
      wrapper.find('Choice').last().simulate('blur');

      setTimeout(() => {
        expect(onBlur).toHaveBeenCalled();
        expect(onComponentBlur).toHaveBeenCalled();
      }, 20);
    });

    it('doesnt call onComponentBlur', () => {
      const onBlur = jest.fn();
      const onComponentBlur = jest.fn();
      const { wrapper } = render({ onBlur, onComponentBlur });
      wrapper.find('Choice').first().simulate('blur');

      setTimeout(() => {
        expect(onBlur).toHaveBeenCalled();
        expect(onComponentBlur).not.toHaveBeenCalled();
      }, 20);
    });
  });
});
