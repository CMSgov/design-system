import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-choice';

const defaultAttrs = {
  name: 'foo',
  value: 'boo',
  type: 'checkbox',
  label: 'George Washington',
  id: 'static-id',
};

function renderChoice(customAttrs = {}) {
  return render(<ds-choice {...defaultAttrs} {...customAttrs} />);
}

describe('Choice', () => {
  it('is a radio', () => {
    const { asFragment } = renderChoice({ type: 'radio' });
    expect(asFragment()).toMatchSnapshot();

    const radioEl = screen.getByRole('radio');
    expect(radioEl).toHaveAttribute('type', 'radio');
  });

  it('is a checkbox', () => {
    const { asFragment } = renderChoice();
    expect(asFragment()).toMatchSnapshot();

    const checkboxEl = screen.getByRole('checkbox');
    expect(checkboxEl).toHaveAttribute('type', 'checkbox');
  });

  it('is not checked', () => {
    renderChoice();
    const el = screen.getByRole('checkbox');
    expect(el).not.toBeChecked();
  });

  it('is checked', () => {
    renderChoice();
    const el = screen.getByRole('checkbox');
    userEvent.click(el);
    expect(el).toBeChecked();
  });

  it('is checked (with prop)', () => {
    renderChoice({ checked: true });
    const el = screen.getByRole('checkbox');
    expect(el).toBeChecked();
  });

  it('is defaultChecked', () => {
    renderChoice({ 'default-checked': true });
    const el = screen.getByRole('checkbox');
    expect(el).toBeChecked();
  });

  it.skip('is required', () => {
    renderChoice({ required: true });
    const input = screen.queryByLabelText('George Washington');
    expect(input).toBeRequired();
  });

  it('has a hint and requirementLabel', () => {
    const { asFragment } = renderChoice({
      hint: 'Hello world',
      'requirement-label': 'Optional',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies custom class to input', () => {
    renderChoice({ 'input-class-name': 'foo' });
    const input = screen.getByLabelText('George Washington');
    expect(input).toHaveClass('foo');
  });

  it('applies custom class to label', () => {
    const { container } = renderChoice({ 'label-class-name': 'bar' });
    const label = container.querySelector('label');
    expect(label).toHaveClass('bar');
  });

  it('applies errorMessage to label', () => {
    const errorMessage = "Hey! You can't do that!";
    const { asFragment } = renderChoice({ 'error-message': errorMessage });
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies inverse className to input', () => {
    renderChoice({ inversed: true });
    const input = screen.getByRole('checkbox');
    expect(input).toHaveClass('ds-c-choice--inverse');
  });

  it('applies small className to input', () => {
    renderChoice({ size: 'small' });
    const input = screen.getByRole('checkbox');
    expect(input).toHaveClass('ds-c-choice--small');
  });

  it('applies additional classNames to root element', () => {
    const { container } = renderChoice({ className: 'foo' });
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('foo');
  });

  it('accepts a string value in the input', () => {
    renderChoice({ value: 'bar' });
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('value', 'bar');
  });

  it('accepts a number value in the input', () => {
    renderChoice({ value: 100 });
    const input = screen.getByRole('checkbox');
    expect(input).toHaveAttribute('value', '100');
  });

  it('accepts a custom id', () => {
    renderChoice({ 'root-id': 'custom_id' });
    const el = screen.getByRole('checkbox');
    expect(el.id).toBe('custom_id');
  });

  it('generates a unique id', () => {
    const props = {
      name: 'presidents',
      label: defaultAttrs.label,
      type: defaultAttrs.type,
    };
    const { container } = render(
      <div>
        <ds-choice value="a" {...props} />
        <ds-choice value="b" {...props} />
      </div>
    );

    const idRegex = /choice--\d+/;
    const labels = container.querySelectorAll('label');
    const labelA = labels[0];
    const labelB = labels[1];
    const inputA = screen.getByDisplayValue('a');
    const inputB = screen.getByDisplayValue('b');

    // IDs should be unique!
    expect(inputA.id).not.toBe(inputB.id);

    // First Choice
    expect(inputA.id).toMatch(idRegex);
    expect(labelA.getAttribute('for')).toBe(inputA.id);

    // Second choice
    expect(inputB.id).toMatch(idRegex);
    expect(labelB.getAttribute('for')).toBe(inputB.id);
  });

  it('fires a custom ds-change event', () => {
    renderChoice();

    const choiceRoot = document.querySelector('ds-choice');
    const mockHandler = jest.fn();
    choiceRoot.addEventListener('ds-change', mockHandler);

    const input = screen.getByRole('checkbox');
    userEvent.click(input);

    expect(mockHandler).toHaveBeenCalledTimes(1);
    choiceRoot.removeEventListener('ds-change', mockHandler);
  });

  it('fires a custom ds-blur event', async () => {
    renderChoice();

    const choiceRoot = document.querySelector('ds-choice');
    const onBlur = jest.fn();
    const onChange = jest.fn();
    choiceRoot.addEventListener('ds-blur', onBlur);
    choiceRoot.addEventListener('ds-change', onChange);

    userEvent.tab();
    userEvent.tab();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await act(async () => {
      await sleep(40);
    });

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    choiceRoot.removeEventListener('ds-blur', onBlur);
    choiceRoot.removeEventListener('ds-change', onChange);
  });

  describe('nested content', () => {
    it('renders checked and unchecked children appropriately', () => {
      const { asFragment } = render(
        <ds-choice {...defaultAttrs}>
          <div slot="checked-children">
            <strong data-testid="checked" className="checked-child">
              I am checked
            </strong>
          </div>
          <div slot="unchecked-children">
            <strong data-testid="unchecked" className="unchecked-child">
              I am unchecked
            </strong>
          </div>
        </ds-choice>
      );
      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByTestId('unchecked').textContent).toBe('I am unchecked');
      expect(screen.queryByTestId('checked')).toBeNull();

      // Then check it and see if it re-rendered
      const input = screen.getByRole('checkbox');
      userEvent.click(input);

      expect(screen.getByTestId('checked').textContent).toBe('I am checked');
      expect(screen.queryByTestId('unchecked')).toBeNull();
    });

    it('applies correct aria attributes when checkedChildren is set', () => {
      const { container } = render(
        <ds-choice {...defaultAttrs}>
          <div slot="checked-children">
            <strong data-testid="checked" className="checked-child">
              I am checked
            </strong>
          </div>
          <div slot="unchecked-children">
            <strong data-testid="unchecked" className="unchecked-child">
              I am unchecked
            </strong>
          </div>
        </ds-choice>
      );
      const root = container.firstChild.firstChild;
      expect(root).toHaveAttribute('aria-live', 'polite');
      expect(root).toHaveAttribute('aria-relevant', 'additions text');
      expect(root).toHaveAttribute('aria-atomic', 'false');
    });

    it.skip('allows for modification of aria attributes', () => {
      const { container } = render(
        <ds-choice {...defaultAttrs} aria-live="off" aria-relevant="text" aria-atomic="true">
          <div slot="checked-children">
            <strong data-testid="checked" className="checked-child">
              I am checked
            </strong>
          </div>
          <div slot="unchecked-children">
            <strong data-testid="unchecked" className="unchecked-child">
              I am unchecked
            </strong>
          </div>
        </ds-choice>
      );
      const root = container.firstChild.firstChild;
      expect(root).toHaveAttribute('aria-live', 'off');
      expect(root).toHaveAttribute('aria-relevant', 'text');
      expect(root).toHaveAttribute('aria-atomic', 'true');
    });
  });
});
