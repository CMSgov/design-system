import ChoiceList from './ChoiceList';
import React from 'react';
import { shallow } from 'enzyme';

function generateChoices(length) {
  const choices = [];

  for (let i = 0; i < length; i++) {
    choices.push({
      label: `Choice ${i + 1}`,
      value: String(i + 1)
    });
  }

  return choices;
}

/**
 * Helper method for shallow rendering the <ChoiceList> component. The only props
 * initially defined are the required props.
 * @param {object} customProps - Additional props
 * @param {number} choicesCount - Total number of choices
 * @return {object}
 */
function shallowRender(customProps = {}, choicesCount = 2) {
  const props = Object.assign(
    {
      choices: generateChoices(choicesCount),
      label: 'Foo',
      name: 'spec-field'
    },
    customProps
  );

  return {
    props: props,
    wrapper: shallow(<ChoiceList {...props} />)
  };
}

describe('ChoiceList', () => {
  describe('Radio buttons and Checkboxes', () => {
    it('is a radio button group', () => {
      const data = shallowRender();

      expect(
        data.wrapper
          .find('Choice')
          .first()
          .prop('type')
      ).toBe('radio');
    });

    it('is a checkbox group', () => {
      const data = shallowRender({ multiple: true });

      expect(
        data.wrapper
          .find('Choice')
          .first()
          .prop('type')
      ).toBe('checkbox');
    });

    it('is a checkbox', () => {
      const data = shallowRender({ choices: generateChoices(1) });

      expect(
        data.wrapper
          .find('Choice')
          .first()
          .prop('type')
      ).toBe('checkbox');
    });

    it('renders all choices', () => {
      const data = shallowRender();
      const choice = data.wrapper.find('Choice').first();

      expect(data.wrapper.find('Choice').length).toBe(
        data.props.choices.length
      );
      expect(choice.prop('name')).toBe(data.props.name);
      expect(choice.prop('value')).toBe(data.props.choices[0].value);
    });

    it('is enclosed by a fieldset', () => {
      const data = shallowRender();

      expect(data.wrapper.is('fieldset')).toBe(true);
      expect(data.wrapper.hasClass('ds-c-fieldset')).toBe(true);
    });

    it('renders the label prop as a legend element', () => {
      const data = shallowRender();

      expect(
        data.wrapper
          .render()
          .find('legend')
          .first()
          .text()
      ).toBe(data.props.label);
    });

    it('passes checked prop', () => {
      const choices = generateChoices(4);
      choices[1].checked = true;
      const data = shallowRender({ choices });

      expect(data.wrapper.find('Choice').get(1).props.checked).toBe(true);
    });

    it('passes defaultChecked prop', () => {
      const choices = generateChoices(4);
      choices[1].defaultChecked = true;
      const data = shallowRender({ choices });

      expect(data.wrapper.find('Choice').get(1).props.defaultChecked).toBe(
        true
      );
    });

    it('passes disabled prop', () => {
      const choices = generateChoices(4);
      choices[1].disabled = true;
      const data = shallowRender({ choices });

      expect(data.wrapper.find('Choice').get(1).props.disabled).toBe(true);
    });

    it('disables all choices', () => {
      const data = shallowRender({ disabled: true });

      expect(data.wrapper.find('Choice').get(0).props.disabled).toBe(true);
      expect(data.wrapper.find('Choice').get(1).props.disabled).toBe(true);
    });

    it("doesn't pass an ID prop", () => {
      const data = shallowRender();

      expect(
        data.wrapper
          .find('Choice')
          .first()
          .prop('id')
      ).toBeUndefined();
    });

    it('is inversed Choice', () => {
      const data = shallowRender({ inversed: true });

      expect(
        data.wrapper
          .find('Choice')
          .first()
          .prop('inversed')
      ).toBe(true);
    });

    it('calls onChange', () => {
      const onChange = jest.fn();
      const data = shallowRender({ onChange });
      data.wrapper
        .find('Choice')
        .first()
        .simulate('change');

      expect(onChange.mock.calls.length).toBe(1);
    });

    it('calls onBlur', () => {
      const onBlur = jest.fn();
      const data = shallowRender({ onBlur });
      data.wrapper
        .find('Choice')
        .first()
        .simulate('blur');

      expect(onBlur.mock.calls.length).toBe(1);
    });
  });

  describe('Select menu', () => {
    let props;

    beforeEach(() => {
      props = { choices: generateChoices(11) };
    });

    it('is enclosed by a div', () => {
      const data = shallowRender(props);

      expect(data.wrapper.is('div')).toBe(true);
      expect(data.wrapper.hasClass('ds-c-fieldset')).toBe(false);
    });

    it('renders select menu', () => {
      const data = shallowRender(props);
      const $wrapper = data.wrapper.render();
      const $options = $wrapper.find('option');

      expect(
        data.wrapper
          .find('Select')
          .first()
          .prop('name')
      ).toBe(data.props.name);
      expect($options.length).toBe(11);
      expect($options.first().attr('value')).toBe(props.choices[0].value);
    });

    it('converts checked prop to value prop', () => {
      props.choices[0].checked = true;
      const data = shallowRender(props);

      expect(data.wrapper.find('Select').prop('value')).toBe(
        props.choices[0].value
      );
    });

    it('converts defaultChecked prop to defaultValue', () => {
      props.choices[0].defaultChecked = true;
      const data = shallowRender(props);

      expect(data.wrapper.find('Select').prop('defaultValue')).toBe(
        props.choices[0].value
      );
    });

    it('generates a unique ID', () => {
      const data = shallowRender(props);
      const idRegex = new RegExp(`select_${data.props.name}_[0-9]+`);
      const selectId = data.wrapper
        .find('Select')
        .first()
        .prop('id');
      const labelId = data.wrapper
        .find('FormLabel')
        .first()
        .prop('fieldId');

      expect(selectId).toMatch(idRegex);
      expect(selectId).toBe(labelId);
    });

    it('is disabled', () => {
      props.disabled = true;
      const data = shallowRender(props);

      expect(
        data.wrapper
          .find('Select')
          .first()
          .prop('disabled')
      ).toBe(true);
    });

    it('is inversed Select', () => {
      props.inversed = true;
      const data = shallowRender(props);

      expect(
        data.wrapper
          .find('Select')
          .first()
          .prop('inversed')
      ).toBe(true);
    });

    it('calls onChange', () => {
      const onChange = jest.fn();
      props.onChange = onChange;
      const data = shallowRender(props);
      data.wrapper
        .find('Select')
        .first()
        .simulate('change');

      expect(onChange.mock.calls.length).toBe(1);
    });

    it('calls onBlur', () => {
      const onBlur = jest.fn();
      props.onBlur = onBlur;
      const data = shallowRender(props);
      data.wrapper
        .find('Select')
        .first()
        .simulate('blur');

      expect(onBlur.mock.calls.length).toBe(1);
    });
  });

  it('applies additional classNames to FormLabel', () => {
    const data = shallowRender({ labelClassName: 'ds-u-foo' });

    expect(data.wrapper.find('FormLabel').prop('className')).toBe(
      data.props.labelClassName
    );
  });

  it('passes errorMessage to FormLabel', () => {
    const data = shallowRender({ errorMessage: 'Nah son' });

    expect(data.wrapper.find('FormLabel').prop('errorMessage')).toBe(
      data.props.errorMessage
    );
  });

  it('passes inversed prop to FormLabel', () => {
    const data = shallowRender({ inversed: true });

    expect(data.wrapper.find('FormLabel').prop('inversed')).toBe(true);
  });
});
