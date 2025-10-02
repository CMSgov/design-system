import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useEffect, useRef } from 'react';
import Choice, { ChoiceProps, ChoiceType } from './Choice';

const defaultProps = {
  name: 'foo',
  value: 'boo',
  type: 'checkbox' as ChoiceType,
  label: 'George Washington',
  id: 'static-id',
};

function renderChoice(customProps = {}) {
  const props: ChoiceProps = { ...defaultProps, ...customProps };
  return {
    user: userEvent.setup(),
    ...render(<Choice {...props} />),
  };
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

  it('is checked', async () => {
    const { user } = renderChoice();
    const el = screen.getByRole('checkbox');
    await user.click(el);
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

  it('forwards an object inputRef', () => {
    const inputRef = createRef<HTMLInputElement>();
    renderChoice({ inputRef });
    expect(inputRef.current).toBeInTheDocument();
    expect(inputRef.current.tagName).toEqual('INPUT');
  });

  it('forwards a mutable object inputRef', () => {
    const MyComponent = () => {
      const inputRef = useRef<HTMLInputElement>(null);
      useEffect(() => {
        expect(inputRef.current).toBeInTheDocument();
        expect(inputRef.current.tagName).toEqual('INPUT');
      }, []);
      return <Choice inputRef={inputRef} {...defaultProps} />;
    };

    render(<MyComponent />);
  });

  it('forwards a function inputRef', () => {
    const inputRef = jest.fn();
    renderChoice({ inputRef });
    expect(inputRef).toHaveBeenCalled();
    expect(inputRef.mock.lastCall[0].tagName).toEqual('INPUT');
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

  describe('event handlers and emitters', () => {
    let props;

    beforeEach(() => {
      props = {
        onBlur: jest.fn(),
        onChange: jest.fn(),
      };
    });

    it('calls the onChange handler', async () => {
      const { user } = renderChoice(props);
      const el = screen.getByRole('checkbox');
      await user.click(el);

      expect(props.onBlur).toHaveBeenCalledTimes(0);
      expect(props.onChange).toHaveBeenCalledTimes(1);
    });

    it('calls the onBlur handler', async () => {
      const { user } = renderChoice(props);
      const el = screen.getByLabelText('George Washington');
      el.focus();
      await user.tab();

      expect(props.onBlur).toHaveBeenCalledTimes(1);
      expect(props.onChange).toHaveBeenCalledTimes(0);
    });
  });

  describe('radio groups', () => {
    it('uncontrolled radios uncheck when sibling checked', async () => {
      const user = userEvent.setup();

      const commonProps = {
        name: 'foo',
        type: 'radio' as const,
      };

      render(
        <>
          <Choice {...commonProps} label="A" value="a" id="a" defaultChecked />
          <Choice {...commonProps} label="B" value="b" id="b" />
          <Choice {...commonProps} label="C" value="c" id="c" />
        </>
      );

      const getRadio = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

      expect(getRadio('A').checked).toBe(true);
      expect(getRadio('B').checked).toBe(false);
      expect(getRadio('C').checked).toBe(false);

      await user.click(getRadio('B'));

      expect(getRadio('A').checked).toBe(false);
      expect(getRadio('B').checked).toBe(true);
      expect(getRadio('C').checked).toBe(false);
    });

    it('controlled radios do not uncheck when sibling checked', async () => {
      const user = userEvent.setup();

      const commonProps = {
        name: 'foo',
        type: 'radio' as const,
      };

      render(
        <>
          <Choice {...commonProps} label="A" value="a" id="a" checked />
          <Choice {...commonProps} label="B" value="b" id="b" checked={false} />
          <Choice {...commonProps} label="C" value="c" id="c" checked={false} />
        </>
      );

      const getRadio = (label: string) => screen.getByLabelText(label) as HTMLInputElement;

      expect(getRadio('A').checked).toBe(true);
      expect(getRadio('B').checked).toBe(false);
      expect(getRadio('C').checked).toBe(false);

      await act(async () => {
        await user.click(getRadio('B'));
      });

      expect(getRadio('A').checked).toBe(true);
      expect(getRadio('B').checked).toBe(false);
      expect(getRadio('C').checked).toBe(false);
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

    it('renders `checkedChildren` when checked', async () => {
      const { asFragment, user } = renderChoice(props);
      const el = screen.getByRole('checkbox');
      await user.click(el);
      expect(asFragment()).toMatchSnapshot();
      expect(screen.getByTestId('checked').textContent).toBe('I am checked');
      expect(screen.queryByTestId('unchecked')).toBeNull();
    });

    it('applies correct aria attributes when checkedChildren is set', () => {
      const { container } = renderChoice(props);
      const root = container.firstChild;
      expect(root).toHaveAttribute('aria-live', 'polite');
      expect(root).toHaveAttribute('aria-relevant', 'additions text');
      expect(root).toHaveAttribute('aria-atomic', 'false');
    });

    it('allows for modification of aria attributes', () => {
      const { container } = renderChoice({
        ...props,
        'aria-live': 'off',
        'aria-relevant': 'text',
        'aria-atomic': 'true',
      });
      const root = container.firstChild;
      expect(root).toHaveAttribute('aria-live', 'off');
      expect(root).toHaveAttribute('aria-relevant', 'text');
      expect(root).toHaveAttribute('aria-atomic', 'true');
    });
  });
});
