import React from 'react';
import ChoiceList, { ChoiceListType } from './ChoiceList';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function generateChoices(length: number, customProps = {}) {
  const choices = [];

  for (let i = 0; i < length; i++) {
    choices.push({
      label: `Choice ${i + 1}`,
      value: String(i + 1),
      ...customProps,
    });
  }

  return choices;
}

function renderChoiceList(customProps = {}, choicesCount = 2) {
  const props = {
    choices: generateChoices(choicesCount),
    label: 'Foo',
    name: 'spec-field',
    type: 'radio' as ChoiceListType,
    onChange: () => {},
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
      const { asFragment } = renderChoiceList();
      const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.type).toBe('radio');
      expect(asFragment()).toMatchSnapshot();
    });

    it('is a checkbox group', () => {
      renderChoiceList({ type: 'checkbox' });
      const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.type).toBe('checkbox');
    });

    it('is a checkbox', () => {
      renderChoiceList({
        choices: generateChoices(1),
        type: 'checkbox',
      });
      const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.type).toBe('checkbox');
    });

    it('renders all choices', () => {
      const numChoices = 3;
      renderChoiceList({}, numChoices);
      const choiceEls = screen.getAllByRole('radio');
      const choice = choiceEls[0] as HTMLInputElement;

      expect(choiceEls.length).toBe(numChoices);
      expect(choice.name).toBe('spec-field');
      expect(choice.value).toBe('1');
    });

    it('is enclosed by a fieldset', () => {
      renderChoiceList();
      // a fieldset's default aria role is 'group' per MDN
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset#technical_summary
      const fieldsetEl = screen.getByRole('group');

      expect(fieldsetEl).toBeDefined();
    });

    it('renders the label prop as a legend element', () => {
      renderChoiceList();
      const legendEl = screen.getByText('Foo');

      expect(legendEl.tagName).toBe('LEGEND');
    });

    it('passes checked prop', () => {
      const choices = generateChoices(4);
      choices[0].checked = true;
      renderChoiceList({ choices, onChange: jest.fn() });
      const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.checked).toBe(true);
    });

    it('passes defaultChecked prop', () => {
      const choices = generateChoices(4);
      choices[0].defaultChecked = true;
      renderChoiceList({ choices });
      const choiceEls = screen.getAllByRole('radio') as HTMLInputElement[];

      expect(choiceEls[0].checked).toBe(true);
      expect(choiceEls[1].checked).toBe(false);
      expect(choiceEls[2].checked).toBe(false);
      expect(choiceEls[3].checked).toBe(false);
    });

    it('passes disabled prop', () => {
      const choices = generateChoices(4);
      choices[0].disabled = true;
      renderChoiceList({ choices });
      const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.disabled).toBe(true);
    });

    it('disables all choices', () => {
      renderChoiceList({ disabled: true });
      const choiceEls = screen.getAllByRole('radio') as HTMLInputElement[];

      expect(choiceEls[0].disabled).toBe(true);
      expect(choiceEls[1].disabled).toBe(true);
    });

    it('is inversed Choice', () => {
      renderChoiceList({ inversed: true });
      const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

      expect(choiceEl.classList).toContain('ds-c-choice--inverse');
    });

    it('calls onChange', async () => {
      const onChange = jest.fn();
      renderChoiceList({ onChange });
      const choiceEl = screen.getByLabelText('Choice 1');
      userEvent.click(choiceEl);
      await waitFor(() => expect(onChange).toHaveBeenCalled());
    });

    it('calls onBlur', () => {
      const onBlur = jest.fn();
      renderChoiceList({ onBlur });
      const choiceEl = screen.getByLabelText('Choice 1');

      choiceEl.focus();
      userEvent.tab();

      expect(onBlur).toHaveBeenCalled();
    });

    it('calls onComponentBlur', () => {
      jest.useFakeTimers();
      const onBlur = jest.fn();
      const onComponentBlur = jest.fn();
      renderChoiceList({ onBlur, onComponentBlur });
      const choiceEl = screen.getByLabelText('Choice 2');

      choiceEl.focus();
      userEvent.tab();
      jest.runAllTimers();

      expect(onBlur).toHaveBeenCalled();
      expect(onComponentBlur).toHaveBeenCalled();
    });

    it('doesnt call onComponentBlur', () => {
      jest.useFakeTimers();
      const onBlur = jest.fn();
      const onComponentBlur = jest.fn();
      renderChoiceList({ onBlur, onComponentBlur, type: 'checkbox' });
      const choiceEls = screen.getAllByRole('checkbox');

      choiceEls[0].focus();
      userEvent.tab();
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
