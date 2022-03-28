import ChoiceList, { ChoiceListType } from './ChoiceList';
import { render, fireEvent, waitFor } from '@testing-library/react';
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
function renderChoiceList(customProps = {}, choicesCount = 2) {
  const props = {
    ...{
      choices: generateChoices(choicesCount),
      label: 'Foo',
      name: 'spec-field',
      type: 'radio' as ChoiceListType,
    },
    ...customProps,
  };
  return render(<ChoiceList {...props} />);
}

describe('ChoiceList', () => {
  describe('Radio buttons and Checkboxes', () => {
    afterEach(() => {
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it('is a radio button group', () => {
      const { queryByLabelText, asFragment } = renderChoiceList();
      const choiceEl = queryByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.type).toBe('radio');
      expect(asFragment()).toMatchSnapshot();
    });

    it('is a checkbox group', () => {
      const { queryByLabelText } = renderChoiceList({ type: 'checkbox' });
      const choiceEl = queryByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.type).toBe('checkbox');
    });

    it('is a checkbox', () => {
      const { queryByLabelText } = renderChoiceList({
        choices: generateChoices(1),
        type: 'checkbox',
      });
      const choiceEl = queryByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.type).toBe('checkbox');
    });

    it('renders all choices', () => {
      const numChoices = 3;
      const { queryAllByRole } = renderChoiceList({}, numChoices);
      const choiceEls = queryAllByRole('radio');
      const choice = choiceEls[0] as HTMLInputElement;

      expect(choiceEls.length).toBe(numChoices);
      expect(choice.name).toBe('spec-field');
      expect(choice.value).toBe('1');
    });

    it('is enclosed by a fieldset', () => {
      const { queryByRole } = renderChoiceList();
      // a fieldset's default aria role is 'group' per MDN
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#technical_summary
      const fieldsetEl = queryByRole('group');

      expect(fieldsetEl).toBeDefined();
    });

    it('renders the label prop as a legend element', () => {
      const { queryByText } = renderChoiceList();
      const legendEl = queryByText('Foo');

      expect(legendEl.parentElement.tagName).toBe('LEGEND');
    });

    it('passes checked prop', () => {
      const choices = generateChoices(4);
      choices[0].checked = true;
      const { queryByLabelText } = renderChoiceList({ choices, onChange: jest.fn() });
      const choiceEl = queryByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.checked).toBe(true);
    });

    it('passes defaultChecked prop', () => {
      const choices = generateChoices(4);
      choices[0].defaultChecked = true;
      const { queryAllByRole } = renderChoiceList({ choices });
      const choiceEls = queryAllByRole('radio') as HTMLInputElement[];

      expect(choiceEls[0].checked).toBe(true);
      expect(choiceEls[1].checked).toBe(false);
      expect(choiceEls[2].checked).toBe(false);
      expect(choiceEls[3].checked).toBe(false);
    });

    it('passes disabled prop', () => {
      const choices = generateChoices(4);
      choices[0].disabled = true;
      const { queryByLabelText } = renderChoiceList({ choices });
      const choiceEl = queryByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.disabled).toBe(true);
    });

    it('disables all choices', () => {
      const { queryAllByRole } = renderChoiceList({ disabled: true });
      const choiceEls = queryAllByRole('radio') as HTMLInputElement[];

      expect(choiceEls[0].disabled).toBe(true);
      expect(choiceEls[1].disabled).toBe(true);
    });

    it('is inversed Choice', () => {
      const { queryByLabelText } = renderChoiceList({ inversed: true });
      const choiceEl = queryByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.classList).toContain('ds-c-choice--inverse');
    });

    it('calls onChange', async () => {
      const onChange = jest.fn();
      const { queryByLabelText } = renderChoiceList({ onChange });
      const choiceEl = queryByLabelText('Choice 1');
      fireEvent.click(choiceEl);
      await waitFor(() => expect(onChange).toHaveBeenCalled());
    });

    it('calls onBlur', () => {
      const onBlur = jest.fn();
      const { queryByLabelText } = renderChoiceList({ onBlur });
      const choiceEl = queryByLabelText('Choice 1');
      fireEvent.blur(choiceEl);

      expect(onBlur).toHaveBeenCalled();
    });

    it('calls onComponentBlur', () => {
      jest.useFakeTimers();
      const onBlur = jest.fn();
      const onComponentBlur = jest.fn();
      const { queryByLabelText } = renderChoiceList({ onBlur, onComponentBlur });
      const choiceEl = queryByLabelText('Choice 2');
      fireEvent.blur(choiceEl);
      jest.runAllTimers();

      expect(onBlur).toHaveBeenCalled();
      expect(onComponentBlur).toHaveBeenCalled();
    });

    it('doesnt call onComponentBlur', () => {
      jest.useFakeTimers();
      const onBlur = jest.fn();
      const onComponentBlur = jest.fn();
      const { queryAllByRole } = renderChoiceList({ onBlur, onComponentBlur });
      const choiceEls = queryAllByRole('radio');

      // had to do a blur event to trigger the 'handleBlur' function in ChoiceList
      fireEvent.blur(choiceEls[0]);
      // have to focus another choice element to ensure that the conditional in 'handleComponentBlur' function passes
      choiceEls[1].focus();
      jest.runAllTimers();

      expect(onBlur).toHaveBeenCalled();
      expect(onComponentBlur).not.toHaveBeenCalled();
    });

    it('passes through a ref', () => {
      const inputRefCallback = jest.fn();
      renderChoiceList({
        choices: [
          { label: 'Choice 1', value: '1', inputRef: inputRefCallback },
          { label: 'Choice 2', value: '2' },
        ],
      });
      expect(inputRefCallback).toHaveBeenCalled();
    });
  });
});
