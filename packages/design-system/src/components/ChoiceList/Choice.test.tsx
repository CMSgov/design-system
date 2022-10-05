import Choice, { ChoiceProps, ChoiceType } from './Choice';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps = {
  name: 'foo',
  value: 'boo',
  type: 'checkbox' as ChoiceType,
  label: 'George Washington',
};

function renderChoice(customProps = {}) {
  const props: ChoiceProps = { ...defaultProps, ...customProps };
  return render(<Choice {...props} />);
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
    renderChoice({ defaultChecked: true });
    const el = screen.getByRole('checkbox');
    expect(el).toBeChecked();
  });

  it('is required', () => {
    renderChoice({ required: true });
    const input = screen.queryByLabelText('George Washington');
    expect(input).toBeRequired();
  });

  it('has a hint and requirementLabel', () => {
    const { asFragment } = renderChoice({
      hint: 'Hello world',
      requirementLabel: 'Optional',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('accepts a node as innerHTML', () => {
    const { asFragment } = renderChoice({
      label: (
        <p>
          <strong>Hello</strong> World
        </p>
      ),
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies custom class to input', () => {
    renderChoice({ inputClassName: 'foo' });
    const input = screen.getByLabelText('George Washington');
    expect(input).toHaveClass('foo');
  });

  it('applies custom class to label', () => {
    const { container } = renderChoice({ labelClassName: 'bar' });
    const label = container.querySelector('label');
    expect(label).toHaveClass('bar');
  });

  it('applies errorMessage to label', () => {
    const errorMessage = "Hey! You can't do that!";
    const { asFragment } = renderChoice({ errorMessage });
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
    renderChoice({ id: 'custom_id' });
    const el = screen.getByRole('checkbox');
    expect(el.id).toBe('custom_id');
  });

  it('generates a unique id', () => {
    const props = {
      name: 'presidents',
      label: defaultProps.label,
      type: defaultProps.type,
    };
    const { container } = render(
      <div>
        <Choice value="a" {...props} />
        <Choice value="b" {...props} />
      </div>
    );

    const idRegex = new RegExp(`checkbox_${props.name}_[0-9]+`);
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

  describe('event handlers and emitters', () => {
    let props;

    beforeEach(() => {
      props = {
        onBlur: jest.fn(),
        onChange: jest.fn(),
      };
    });

    it('calls the onChange handler', () => {
      renderChoice(props);
      const el = screen.getByRole('checkbox');
      userEvent.click(el);

      expect(props.onBlur).toHaveBeenCalledTimes(0);
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('calls the onBlur handler', () => {
      renderChoice(props);
      const el = screen.getByLabelText('George Washington');
      el.focus();
      userEvent.tab();

      expect(props.onBlur).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('nested content', () => {
    const props = {
      checkedChildren: (
        <strong data-testid="checked" className="checked-child">
          I am checked
        </strong>
      ),
      uncheckedChildren: (
        <strong data-testid="unchecked" className="unchecked-child">
          I am unchecked
        </strong>
      ),
      name: 'foo',
      value: 'bar',
    };

    it('renders `uncheckedChildren` when not checked', () => {
      const { asFragment } = renderChoice(props);
      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByTestId('unchecked').textContent).toBe('I am unchecked');
      expect(screen.queryByTestId('checked')).toBeNull();
    });

    it('renders `checkedChildren` when checked', () => {
      const { asFragment } = renderChoice(props);
      const el = screen.getByRole('checkbox');
      userEvent.click(el);
      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByTestId('checked').textContent).toBe('I am checked');
      expect(screen.queryByTestId('unchecked')).toBeNull();
    });
  });
});
