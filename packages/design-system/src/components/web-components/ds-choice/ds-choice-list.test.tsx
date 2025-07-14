import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-choice-list';
import './ds-choice';

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
    choices: JSON.stringify(generateChoices(choicesCount)),
    id: 'static-id',
    label: 'Foo',
    hint: 'Psst! I know the answer',
    'error-message': 'Hey, you have to pick an answer',
    name: 'spec-field',
    type: 'radio',
    'ds-change': () => null,
    ...customProps,
  };
  return {
    user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
    ...render(<ds-choice-list {...props} />),
  };
}

describe('ChoiceList', () => {
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
      choices: JSON.stringify(generateChoices(1)),
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

  it('accepts HTML as children', () => {
    const { asFragment } = render(
      <ds-choice-list type="checkbox">
        <ds-choice label="Foo" value="foo"></ds-choice>
        <ds-choice label="Bar" value="bar"></ds-choice>
      </ds-choice-list>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('is enclosed by a fieldset', () => {
    renderChoiceList();
    const fieldsetEl = screen.getByRole('radiogroup');

    expect(fieldsetEl).toBeDefined();
  });

  it('generates ids when no id is provided', () => {
    const { container } = renderChoiceList({ id: undefined });
    expect(container.querySelector('legend').id).toMatch(/^choice-list--[\w:.-]+$/);

    const choices = screen.getAllByRole('radio');
    const choiceIdRegex = /choice--\d+/;
    expect(choices[0].id).toMatch(choiceIdRegex);
    expect(choices[1].id).toMatch(choiceIdRegex);
  });

  it('renders the label prop as a legend element', () => {
    renderChoiceList();
    const legendEl = screen.getByText('Foo');

    expect(legendEl.tagName).toBe('LEGEND');
  });

  it('passes checked prop', () => {
    const choices = generateChoices(4);
    choices[0].checked = true;
    renderChoiceList({ choices: JSON.stringify(choices), onChange: jest.fn() });
    const choiceEl = screen.getByLabelText('Choice 1') as HTMLInputElement;

    expect(choiceEl.checked).toBe(true);
  });

  it('passes defaultChecked prop', () => {
    const choices = generateChoices(4);
    choices[0].defaultChecked = true;
    renderChoiceList({ choices: JSON.stringify(choices) });
    const choiceEls = screen.getAllByRole('radio') as HTMLInputElement[];

    expect(choiceEls[0].checked).toBe(true);
    expect(choiceEls[1].checked).toBe(false);
    expect(choiceEls[2].checked).toBe(false);
    expect(choiceEls[3].checked).toBe(false);
  });

  it('passes disabled prop', () => {
    const choices = generateChoices(4);
    choices[0].disabled = true;
    renderChoiceList({ choices: JSON.stringify(choices) });
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
    jest.useFakeTimers();
    const { user } = renderChoiceList();
    const choiceListRoot = document.querySelector('ds-choice-list');
    const onChange = jest.fn();
    choiceListRoot.addEventListener('ds-change', onChange);

    const choiceEl = screen.getByLabelText('Choice 1');
    await user.click(choiceEl);
    jest.runAllTimers();

    await waitFor(() => expect(onChange).toHaveBeenCalled());
  });

  it('calls onBlur', async () => {
    jest.useFakeTimers();
    const { user } = renderChoiceList();
    const choiceListRoot = document.querySelector('ds-choice-list');
    const onBlur = jest.fn();
    choiceListRoot.addEventListener('ds-blur', onBlur);

    const choiceEl = screen.getByLabelText('Choice 1');

    choiceEl.focus();
    await user.tab();
    jest.runAllTimers();

    expect(onBlur).toHaveBeenCalled();
  });

  it('calls onComponentBlur', async () => {
    const { user } = renderChoiceList();
    const choiceListRoot = document.querySelector('ds-choice-list');

    jest.useFakeTimers();
    const onBlur = jest.fn();
    const onComponentBlur = jest.fn();

    choiceListRoot.addEventListener('ds-blur', onBlur);
    choiceListRoot.addEventListener('ds-component-blur', onComponentBlur);
    const choiceEl = screen.getByLabelText('Choice 2');

    choiceEl.focus();
    await user.tab();
    jest.runAllTimers();

    expect(onBlur).toHaveBeenCalled();
    expect(onComponentBlur).toHaveBeenCalled();
  });

  it("doesn't call onComponentBlur", async () => {
    const { user } = renderChoiceList({ type: 'checkbox' });
    const choiceListRoot = document.querySelector('ds-choice-list');

    jest.useFakeTimers();
    const onBlur = jest.fn();
    const onComponentBlur = jest.fn();

    choiceListRoot.addEventListener('ds-blur', onBlur);
    choiceListRoot.addEventListener('ds-component-blur', onComponentBlur);

    const choiceEls = screen.getAllByRole('checkbox');

    choiceEls[0].focus();
    await user.tab();
    jest.runAllTimers();

    expect(onBlur).toHaveBeenCalled();
    expect(onComponentBlur).not.toHaveBeenCalled();
  });
});
