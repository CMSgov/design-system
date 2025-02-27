import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useEffect, useRef } from 'react';
import Dropdown from './Dropdown';

const defaultProps = {
  name: 'dropdown',
  label: 'Select an option',
  id: 'static-id',
  onBlur: jest.fn(),
  onChange: jest.fn((e) => {
    e.stopPropagation();
  }),
};

export function generateOptions(count: number): { value: string; label: string }[] {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push({
      value: String(i),
      label: String(i),
    });
  }

  return options;
}

function makeDropdown(customProps = {}, optionsCount = 1) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} options={generateOptions(optionsCount)} />;

  return {
    user: userEvent.setup({ delay: 50, advanceTimers: jest.advanceTimersByTime }),
    ...render(component),
  };
}

function getButton() {
  return screen.getByRole('button', { name: RegExp(defaultProps.label) });
}

describe('Dropdown', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('dropdown matches snapshot', () => {
    const { container } = makeDropdown(
      {
        value: '2',
      },
      4
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies additional classes to root element', () => {
    const { container } = makeDropdown({ className: 'bar' });
    expect(container.firstChild).toHaveClass('bar');
    // Make sure we're not replacing the other class names
    expect(container.firstChild).toHaveClass('ds-c-dropdown');
  });

  it('applies additional classes to button element', () => {
    makeDropdown({ fieldClassName: 'foo' });

    const button = getButton();
    expect(button).toHaveClass('foo');
    // Make sure we're not replacing the other class names
    expect(button).toHaveClass('ds-c-field');
  });

  it('adds size classes to the appropriate elements', async () => {
    jest.useFakeTimers();
    const { user } = makeDropdown({ size: 'small' });
    const button = getButton();
    await user.click(button);
    const listContainer = screen.getByRole('listbox').parentElement;
    expect(button).toHaveClass('ds-c-field--small');
    expect(listContainer).toHaveClass('ds-c-field--small');
  });

  it('adds inverse class to button', () => {
    makeDropdown({ inversed: true });
    const button = getButton();
    expect(button).toHaveClass('ds-c-field--inverse');
  });

  it('shows error message', () => {
    const errorId = 'my-error';
    const { container } = makeDropdown({
      errorMessage: 'Error',
      errorPlacement: 'top',
      errorId,
    });

    const button = getButton();
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', errorId);
    expect(button).toHaveClass('ds-c-field--error');

    const error = container.querySelector(`#${errorId}`);
    expect(error).toMatchSnapshot();
  });

  it('supports bottom placed error', () => {
    const errorId = 'my-error';
    const { container } = makeDropdown({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId,
    });

    const button = getButton();
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', errorId);
    expect(button).toHaveClass('ds-c-field--error');

    const dropdown = container.querySelector('.ds-c-dropdown');
    const error = container.querySelector(`#${errorId}`);
    expect(dropdown.lastChild).toEqual(error);
  });

  it('is disabled', () => {
    makeDropdown({ disabled: true });
    const button = getButton();
    expect(button).toHaveAttribute('disabled');
  });

  it('calls the onChange handler', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const { user } = makeDropdown({ value: '1', onChange, onBlur }, 5);
    const button = getButton();

    await user.click(button);
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    jest.runAllTimers();

    expect(onBlur).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  it('calls the onBlur handler', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: 25, advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();
    const onBlur = jest.fn();
    render(
      <>
        <Dropdown
          {...defaultProps}
          {...{ defaultValue: '1', onChange, onBlur }}
          options={generateOptions(10)}
        />
        <button>Another button to tab to</button>
      </>
    );
    const button = getButton();
    await user.click(button);
    await user.tab();

    jest.runAllTimers();

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('pressing Escape closes the menu without making a selection', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const { user } = makeDropdown({ value: '1', onChange }, 5);
    const button = getButton();
    await user.click(button);
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Escape}');
    const list = screen.queryByRole('listbox');
    expect(list).toBeFalsy();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('pressing Tab selects the focused item and blurs away', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ delay: 25, advanceTimers: jest.advanceTimersByTime });
    const onChange = jest.fn();
    const onBlur = jest.fn();
    render(
      <>
        <Dropdown
          {...defaultProps}
          {...{ defaultValue: '1', onChange, onBlur }}
          options={generateOptions(10)}
        />
        <button>Another button to tab to</button>
      </>
    );
    const button = getButton();
    await user.click(button);
    await user.keyboard('{ArrowDown}');
    await user.tab();

    jest.runAllTimers();

    const list = screen.queryByRole('listbox');
    expect(list).toBeFalsy();
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].currentTarget.value).toEqual('2');
    expect(onChange.mock.calls[0][0].currentTarget.name).toEqual('dropdown');
    expect(onBlur).toHaveBeenCalled();
  });

  it('automatically focuses on the selected option when opening', async () => {
    jest.useFakeTimers();
    const { user } = makeDropdown({ defaultValue: '3' }, 10);
    const button = getButton();
    await act(async () => {
      await user.click(button);
    });
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveFocus();
  });

  it('focuses automatically with autoFocus prop', () => {
    makeDropdown({ defaultValue: '1', autoFocus: true }, 10);
    const button = getButton();
    expect(button).toHaveFocus();
  });

  it('forwards an object inputRef', () => {
    const inputRef = createRef<HTMLButtonElement>();
    makeDropdown({ inputRef });
    expect(inputRef.current).toBeInTheDocument();
    expect(inputRef.current.tagName).toEqual('BUTTON');
  });

  it('forwards a mutable object inputRef', () => {
    const MyComponent = () => {
      const inputRef = useRef<HTMLButtonElement>();
      useEffect(() => {
        expect(inputRef.current).toBeInTheDocument();
        expect(inputRef.current.tagName).toEqual('BUTTON');
      }, []);
      return <Dropdown inputRef={inputRef} {...defaultProps} options={generateOptions(2)} />;
    };

    render(<MyComponent />);
  });

  it('forwards a function inputRef', () => {
    const inputRef = jest.fn();
    makeDropdown({ inputRef });
    expect(inputRef).toHaveBeenCalled();
    expect(inputRef.mock.lastCall[0].tagName).toEqual('BUTTON');
  });

  it('accepts optgroup children', async () => {
    const user = userEvent.setup({ delay: 25 });
    render(
      <Dropdown {...defaultProps}>
        <optgroup label="Group A">
          <option value="a-1">Option A-1</option>
          <option value="a-2">Option A-2</option>
          <option value="a-3">Option A-3</option>
        </optgroup>
        <optgroup label="Group B">
          <option value="b-1">Option B-1</option>
          <option value="b-2">Option B-2</option>
          <option value="b-3">Option B-3</option>
        </optgroup>
      </Dropdown>
    );
    await act(async () => {
      await user.click(getButton());
    });
    expect(screen.getAllByRole('option').length).toEqual(6);
    const list = screen.getByRole('listbox');
    expect(list).toMatchSnapshot();
  });

  it('accepts DropdownOptGroup objects in options prop', async () => {
    const user = userEvent.setup({ delay: 25 });
    const options = [
      {
        label: 'Group A',
        options: [
          { value: 'a-1', label: 'Option A-1' },
          { value: 'a-2', label: 'Option A-2' },
          { value: 'a-3', label: 'Option A-3' },
        ],
      },
      {
        label: 'Group B',
        options: [
          { value: 'b-1', label: 'Option B-1' },
          { value: 'b-2', label: 'Option B-2' },
          { value: 'b-3', label: 'Option B-3' },
        ],
      },
    ];
    render(<Dropdown {...defaultProps} options={options} />);
    await user.click(getButton());
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(2); // Groups
    const items = screen.getAllByRole('option');
    expect(items.length).toEqual(6);
  });

  it('accepts option children', async () => {
    const user = userEvent.setup({ delay: 25 });
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    await user.click(getButton());
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(3);
  });

  it('passes arbitrary attributes to rendered options', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2" data-hello-world="hi">
          Option 2
        </option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    await user.click(getButton());
    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('data-hello-world', 'hi');
  });

  it('passes arbitrary attributes to rendered optgroups', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <optgroup label="Group B" id="group-label-id" data-extra-attribute="something">
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </optgroup>
      </Dropdown>
    );
    await user.click(getButton());
    const groupLabel = container.querySelector('#group-label-id');
    expect(groupLabel).toHaveAttribute('data-extra-attribute', 'something');
  });

  it('passes through a ref', () => {
    const inputRefCallback = jest.fn();
    render(
      <Dropdown {...defaultProps} inputRef={inputRefCallback}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    expect(inputRefCallback).toHaveBeenCalled();
  });

  it('can be a controlled component', async () => {
    const user = userEvent.setup({ delay: 25 });
    const onChange = jest.fn();
    const options = generateOptions(3);
    const baseProps = { ...defaultProps, onChange, options };
    const { rerender } = render(<Dropdown {...baseProps} value="2" />);
    const button = getButton();
    expect(button.textContent).toEqual(options[1].label);

    // Clicking an item should call `onChange` but should do nothing else
    // because this is a controlled component
    await user.click(button);
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalled();
    expect(button.textContent).toEqual(options[1].label);

    // But then if we re-render with a different option selected, it should update
    rerender(<Dropdown {...baseProps} value="3" />);
    expect(button.textContent).toEqual(options[2].label);
  });
});
