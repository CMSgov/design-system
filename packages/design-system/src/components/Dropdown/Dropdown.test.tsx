import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';
import { createRef, useEffect, useRef } from 'react';

interface Option {
  label: string;
  value: string;
}

type Options = Array<Option>;

const defaultProps = {
  name: 'dropdown',
  label: 'Select an option',
  id: 'static-id',
  onBlur: jest.fn(),
  onChange: jest.fn((e) => {
    e.stopPropagation();
  }),
};

const dropdownOptions = [
  { label: '- Select an option -', value: '' },
  { label: 'Confederated Tribes and Bands of the Yakama Nation', value: '1' },
  { label: 'Confederated Tribes of the Chehalis Reservation', value: '2' },
  { label: 'Confederated Tribes of the Colville Reservation', value: '3' },
  { label: 'Cowlitz Indian Tribe', value: '4' },
  {
    label: 'Hoh Indian Tribe (formerly the Hoh Indian Tribe of the Hoh Indian Reservation)',
    value: '5',
  },
  {
    label:
      'Nisqually Indian Tribe (formerly the Nisqually Indian Tribe of the Nisqually Reservation)',
    value: '6',
  },
  { label: 'Lummi Tribe of the Lummi Reservation', value: '7' },
];

export function generateOptions(
  optionsToMake: number | Options
): { value: string; label: string }[] {
  let options = [];
  if (typeof optionsToMake === 'number') {
    for (let i = 1; i <= optionsToMake; i++) {
      options.push({
        value: String(i),
        label: String(i),
      });
    }
  } else {
    options = [...optionsToMake];
  }

  return options;
}

function makeDropdown(customProps = {}, options: number | Options = 1) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} options={generateOptions(options)} />;

  return render(component);
}

function getButton() {
  return screen.getByRole('button', { name: RegExp(defaultProps.label) });
}

function expectDropdownToBeOpen() {
  expect(screen.getByRole('listbox')).toBeInTheDocument();
}

function expectDropdownToBeClosed() {
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('Dropdown', () => {
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
    const { container } = makeDropdown({ className: 'bar' }, 1);
    expect(container.firstChild).toHaveClass('bar');
    // Make sure we're not replacing the other class names
    expect(container.firstChild).toHaveClass('ds-c-dropdown');
  });

  it('applies additional classes to button element', () => {
    makeDropdown({ fieldClassName: 'foo' }, 1);

    const button = getButton();
    expect(button).toHaveClass('foo');
    // Make sure we're not replacing the other class names
    expect(button).toHaveClass('ds-c-field');
  });

  it('adds size classes to the appropriate elements', () => {
    makeDropdown({ size: 'small' }, 1);
    const button = getButton();
    userEvent.click(button);
    const listContainer = screen.getByRole('listbox').parentElement;
    expect(button).toHaveClass('ds-c-field--small');
    expect(listContainer).toHaveClass('ds-c-field--small');
  });

  it('adds inverse class to button', () => {
    makeDropdown({ inversed: true }, 1);
    const button = getButton();
    expect(button).toHaveClass('ds-c-field--inverse');
  });

  it('shows error message', () => {
    const errorId = 'my-error';
    const { container } = makeDropdown(
      {
        errorMessage: 'Error',
        errorPlacement: 'top',
        errorId,
      },
      1
    );

    const button = getButton();
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', errorId);
    expect(button).toHaveClass('ds-c-field--error');

    const error = container.querySelector(`#${errorId}`);
    expect(error).toMatchSnapshot();
  });

  it('supports bottom placed error', () => {
    const errorId = 'my-error';
    const { container } = makeDropdown(
      {
        errorMessage: 'Error',
        errorPlacement: 'bottom',
        errorId,
      },
      1
    );

    const button = getButton();
    expect(button).toHaveAttribute('aria-invalid', 'true');
    expect(button).toHaveAttribute('aria-describedby', errorId);
    expect(button).toHaveClass('ds-c-field--error');

    const dropdown = container.querySelector('.ds-c-dropdown');
    const error = container.querySelector(`#${errorId}`);
    expect(dropdown.lastChild).toEqual(error);
  });

  it('is disabled', () => {
    makeDropdown({ disabled: true }, 1);
    const button = getButton();
    expect(button).toHaveAttribute('disabled');
  });

  it('calls the onChange handler', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    makeDropdown({ value: '1', onChange, onBlur }, 5);
    const button = getButton();
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');
    expect(onBlur).not.toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  it('calls the onBlur handler', async () => {
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
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.tab();

    await act(async () => {
      await sleep(40);
    });

    expect(onBlur).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expectDropdownToBeClosed();
  });

  it('pressing Escape closes the menu without making a selection', () => {
    const onChange = jest.fn();
    makeDropdown({ value: '1', onChange }, 5);
    const button = getButton();
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{escape}');
    const list = screen.queryByRole('listbox');
    expect(list).toBeFalsy();
    expect(onChange).not.toHaveBeenCalled();
    expectDropdownToBeClosed();
  });

  it('pressing Tab selects the focused item and blurs away', async () => {
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
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    expectDropdownToBeOpen();
    userEvent.tab();

    await act(async () => {
      await sleep(40);
    });

    const list = screen.queryByRole('listbox');
    expect(list).toBeFalsy();
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].currentTarget.value).toEqual('2');
    expect(onChange.mock.calls[0][0].currentTarget.name).toEqual('dropdown');
    expect(onBlur).toHaveBeenCalled();
    expectDropdownToBeClosed();
  });

  it('supports single-character type ahead', async () => {
    makeDropdown({}, dropdownOptions);
    const button = getButton();
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{l}');
    let options = screen.getAllByRole('option');
    // Lummi tribe option should have focus and is 7th element in array
    expect(options[7]).toHaveFocus();
    // There is a 1 second delay on the type ahead functionality
    await sleep(1000);
    userEvent.keyboard('{n}');
    options = screen.getAllByRole('option');
    // Nisqually Indian Tribe option should have focus and is 6th element in array
    expect(options[6]).toHaveFocus();
  });

  it('can focus across multiple uses of type ahead', async () => {
    makeDropdown({}, dropdownOptions);
    let button = getButton();
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{c}');
    let options = screen.getAllByRole('option');
    // First option starts with c, so it should be in focus
    expect(options[1]).toHaveFocus();
    userEvent.keyboard('{escape}');
    expectDropdownToBeClosed();
    button = getButton();
    await sleep(10);
    userEvent.click(button);
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{l}');
    options = screen.getAllByRole('option');
    // Lummi tribe option should have focus and is 7th element in array
    expect(options[7]).toHaveFocus();
  });

  it('does not move to the next item starting with the same letter', async () => {
    makeDropdown({}, dropdownOptions);
    const button = getButton();
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{c}');
    let options = screen.getAllByRole('option');
    // Confederated Tribes and Bands of the Yakama Nation is the first element in the options list
    expect(options[1]).toHaveFocus();
    // There is a 1 second delay on the type ahead functionality
    await sleep(1000);
    userEvent.keyboard('{c}');
    options = screen.getAllByRole('option');
    // We do not support moving to the next item starting with the same letter, so expect focus to remain the same
    expect(options[1]).toHaveFocus();
  });

  it('supports multi-character type ahead', async () => {
    makeDropdown({}, dropdownOptions);
    const button = getButton();
    userEvent.click(button);
    const list = screen.getByRole('listbox');
    userEvent.keyboard('{arrowdown}');
    userEvent.type(list, 'c');
    let options = screen.getAllByRole('option');
    // Since we have only typed 'c' at this point we expect focus to be on the first element since it starts with 'c'
    expect(options[1]).toHaveFocus();
    await sleep(40);
    // We are still within the 1 second type ahead window, so the search string will now be updated to 'cow'
    userEvent.type(list, 'ow');
    options = screen.getAllByRole('option');
    // Focus should update to the fourth item, the Cowlitz tribe
    expect(options[4]).toHaveFocus();
  });

  it('automatically focuses on the selected option when opening', () => {
    makeDropdown({ defaultValue: '3' }, 10);
    const button = getButton();
    userEvent.click(button);
    expectDropdownToBeOpen();
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
    makeDropdown({ inputRef }, 1);
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
    makeDropdown({ inputRef }, 1);
    expect(inputRef).toHaveBeenCalled();
    expect(inputRef.mock.lastCall[0].tagName).toEqual('BUTTON');
  });

  it('accepts optgroup children', () => {
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
    userEvent.click(getButton());
    expect(screen.getAllByRole('option').length).toEqual(6);
    const list = screen.getByRole('listbox');
    expect(list).toMatchSnapshot();
  });

  it('accepts DropdownOptGroup objects in options prop', () => {
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
    userEvent.click(getButton());
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(2); // Groups
    const items = screen.getAllByRole('option');
    expect(items.length).toEqual(6);
  });

  it('accepts option children', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    userEvent.click(getButton());
    const list = screen.getByRole('listbox');
    expect(list.children.length).toEqual(3);
  });

  it('passes arbitrary attributes to rendered options', () => {
    render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <option value="2" data-hello-world="hi">
          Option 2
        </option>
        <option value="3">Option 3</option>
      </Dropdown>
    );
    userEvent.click(getButton());
    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('data-hello-world', 'hi');
  });

  it('passes arbitrary attributes to rendered optgroups', () => {
    const { container } = render(
      <Dropdown {...defaultProps}>
        <option value="1">Option 1</option>
        <optgroup label="Group B" id="group-label-id" data-extra-attribute="something">
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </optgroup>
      </Dropdown>
    );
    userEvent.click(getButton());
    expectDropdownToBeOpen();
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

  it('can be a controlled component', () => {
    const onChange = jest.fn();
    const options = generateOptions(3);
    const baseProps = { ...defaultProps, onChange, options };
    const { rerender } = render(<Dropdown {...baseProps} value="2" />);
    const button = getButton();
    expect(button.textContent).toEqual(options[1].label);

    // Clicking an item should call `onChange` but should do nothing else
    // because this is a controlled component
    userEvent.click(button);
    expectDropdownToBeOpen();
    userEvent.keyboard('{arrowdown}');
    userEvent.keyboard('{enter}');
    expect(onChange).toHaveBeenCalled();
    expect(button.textContent).toEqual(options[1].label);

    // But then if we re-render with a different option selected, it should update
    rerender(<Dropdown {...baseProps} value="3" />);
    expect(button.textContent).toEqual(options[2].label);
  });
});
