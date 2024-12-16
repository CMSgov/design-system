import { render, screen } from '@testing-library/react';
import { config } from '../../config';
import userEvent from '@testing-library/user-event';
import './ds-autocomplete';

const defaultItems = JSON.stringify([{ id: 'kRf6c2fY', name: 'Cook County, IL' }]);
const updatedItems = JSON.stringify([{ id: 'Yf2c6fRk', name: 'Marion County, OR' }]);

type AutocompleteProps = JSX.IntrinsicElements['ds-autocomplete'];

function makeAutocomplete(customProps: AutocompleteProps = {}) {
  const props = {
    'aria-clear-label': 'Clear search to try again',
    'clear-input-text': 'Clear search',
    'clear-search-button': 'true',
    'loading-message': 'Loading...',
    'no-results-message': 'No results',
    label: 'autocomplete label',
    ...customProps,
  };

  return <ds-autocomplete {...props} />;
}

function renderAutocomplete(customProps: AutocompleteProps = { items: defaultItems }) {
  return render(makeAutocomplete(customProps));
}

function open() {
  const autocompleteField = screen.getByRole('combobox');
  userEvent.click(autocompleteField);
  userEvent.type(autocompleteField, 'c');
}

function expectMenuToBeOpen() {
  expect(screen.getByRole('listbox')).toBeInTheDocument();
}

function expectMenuToBeClosed() {
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
}

describe('Autocomplete', () => {
  it('renders correctly', () => {
    const { asFragment } = renderAutocomplete();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a closed Autocomplete component', () => {
    const { container } = renderAutocomplete({ items: defaultItems });

    const wrapperEl = container.querySelectorAll('.ds-c-autocomplete');
    expect(wrapperEl.length).toEqual(1);

    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-controls');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('type', 'text');

    const labelId = input.getAttribute('aria-labelledby');
    const label = container.querySelector(`#${labelId}`);
    expect(label).toBeInTheDocument();

    const menuEl = container.querySelector('.ds-c-autocomplete__menu-container');
    expect(menuEl).not.toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.classList).toContain('ds-c-autocomplete__clear-btn');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveAccessibleName('Clear search to try again');
  });

  it('renders items', () => {
    renderAutocomplete({ items: defaultItems });

    open();
    expectMenuToBeOpen();

    const items = screen.getByRole('option');
    expect(items).toBeInTheDocument();
    expect(items).toHaveTextContent('Cook County, IL');
  });

  // TODO: Fix how items with children are rendered
  // it('renders items with children property', () => {
  //   const items = [
  //     {
  //       id: '1',
  //       name: 'Carrots (1)',
  //       children: (
  //         <>
  //           Carrots <strong>(1)</strong>
  //         </>
  //       ),
  //     },
  //     {
  //       id: '2',
  //       name: 'Cookies (3)',
  //       children: (
  //         <>
  //           Cookies <strong>(3)</strong>
  //         </>
  //       ),
  //     },
  //     {
  //       id: '3',
  //       name: 'Crackers (2)',
  //       children: (
  //         <>
  //           Crackers <strong>(2)</strong>
  //         </>
  //       ),
  //     },
  //     {
  //       id: '4',
  //       name: 'Search all snacks',
  //       children: <a href="https://duckduckgo.com/?q=snacks">Search all snacks</a>,
  //     },
  //   ];

  //   renderAutocomplete({ items: JSON.stringify(items) });

  //   open();
  //   const ul = screen.getByRole('listbox');
  //   expect(ul).toMatchSnapshot();
  // });

  it('generates ids when no id is provided', () => {
    renderAutocomplete({ id: undefined, items: defaultItems });
    open();
    const idRegex = /autocomplete--\d+/;
    expect(screen.getByRole('listbox').id).toMatch(idRegex);
    expect(screen.getByRole('combobox').id).toMatch(idRegex);
  });

  it('renders item with custom className', () => {
    const items = [
      { id: '1a', name: 'Normal item' },
      { id: '5b', name: 'Special item', className: 'custom-class' },
    ];
    renderAutocomplete({ items: JSON.stringify(items) });

    open();
    expectMenuToBeOpen();

    const listItems = screen.queryAllByRole('option');
    expect(listItems[1]).toHaveClass('custom-class');
    expect(listItems).toMatchSnapshot();
  });

  it('renders Autocomplete component without items', () => {
    renderAutocomplete({ items: 'null' });
    open();
    expectMenuToBeClosed();
  });

  it('renders Autocomplete component no results', () => {
    renderAutocomplete({ items: JSON.stringify([]) });
    open();
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  it('shows the menu when open', () => {
    renderAutocomplete();
    open();
    expectMenuToBeOpen();
  });

  it('opens the menu when focusing on an input that has text in it', async () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox');

    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'no-results-found');

    expect(autocompleteField).toHaveValue('no-results-found');
    userEvent.tab();
    expect(autocompleteField).not.toHaveFocus();
    userEvent.tab({ shift: true });
    expect(autocompleteField).toHaveFocus();
    expectMenuToBeOpen();
  });

  it('opens the menu if typing resulted in results that were delayed by async data fetching', async () => {
    const { rerender } = renderAutocomplete({ items: undefined });
    const autocompleteField = screen.getByRole('combobox');
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    rerender(makeAutocomplete({ items: defaultItems }));
    expectMenuToBeOpen();
  });

  it('displays menu with default items and updates items after async data fetching', async () => {
    const { rerender } = renderAutocomplete({ items: defaultItems });
    const autocompleteField = screen.getByRole('combobox');
    userEvent.click(autocompleteField);
    expectMenuToBeOpen();
    userEvent.type(autocompleteField, 'mar');
    rerender(makeAutocomplete({ items: updatedItems }));
    expectMenuToBeOpen();
    const items = screen.getByRole('option');
    expect(items).toBeInTheDocument();
    expect(items).toHaveTextContent('Marion County, OR');
  });

  it('does not render a clear search button when clearSearchButton is set to false', () => {
    renderAutocomplete({ 'clear-search-button': 'false', items: defaultItems });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders custom class names', () => {
    const { container } = renderAutocomplete({
      'class-name': 'additional-class',
      items: defaultItems,
    });
    const child = container.querySelector('.ds-c-autocomplete');

    expect(child).toHaveClass('additional-class');
  });

  describe('default props', () => {
    it('defaults ariaClearLabel', () => {
      renderAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveAttribute('aria-label', 'Clear search to try again');
    });

    it('defaults clearInputText', () => {
      renderAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent('Clear search');
    });
  });

  it('should set the input value correctly when a listbox selection is clicked', () => {
    renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    userEvent.click(listboxItem);

    expect(autocompleteField.value).toBe('Cook County, IL');
    expect(mockHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          selectedItem: JSON.parse(defaultItems)[0],
        },
      })
    );
    expect(mockHandler).toHaveBeenCalledTimes(1);

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockHandler);
  });

  it('should set the input value to empty when "Clear search" is clicked', () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    userEvent.click(listboxItem);

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(autocompleteField.value).toBe('');
  });

  it('should call onChange with null item when "Clear search" is clicked', () => {
    renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockChangeHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockChangeHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    const listboxItem = screen.getByRole('option');
    userEvent.click(listboxItem);

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(autocompleteField.value).toBe('');
    expect(mockChangeHandler).toHaveBeenCalledTimes(2);
    // expect the last call to contain null
    expect(mockChangeHandler.mock.calls[1][0].detail).toEqual({
      selectedItem: null,
    });

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockChangeHandler);
  });

  it('should select list items by keyboard', () => {
    renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockChangeHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockChangeHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');
    userEvent.type(autocompleteField, '{arrowdown}');
    userEvent.type(autocompleteField, '{enter}');

    expect(autocompleteField.value).toBe('Cook County, IL');
    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler.mock.calls[0][0].detail).toEqual({
      selectedItem: JSON.parse(defaultItems)[0],
    });

    expectMenuToBeClosed();
    autocompleteRoot.removeEventListener('ds-change', mockChangeHandler);
  });

  it('should not call onChange when an item was not selected', () => {
    renderAutocomplete();

    const autocompleteRoot = document.querySelector('ds-autocomplete');
    const mockChangeHandler = jest.fn();
    autocompleteRoot.addEventListener('ds-change', mockChangeHandler);

    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');
    userEvent.type(autocompleteField, 'o');
    userEvent.type(autocompleteField, '{enter}');
    expect(mockChangeHandler).not.toHaveBeenCalled();

    autocompleteRoot.removeEventListener('ds-change', mockChangeHandler);
  });

  it('should clear the input value by keyboard', () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    autocompleteField.focus();
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');
    userEvent.type(autocompleteField, '{arrowdown}');
    userEvent.type(autocompleteField, '{enter}');

    expect(autocompleteField.value).toBe('Cook County, IL');

    userEvent.tab();

    const clearButton = screen.getByText('Clear search');
    userEvent.click(clearButton);

    expect(autocompleteField.value).toBe('');
  });

  it('closes the listbox when ESC is pressed', () => {
    renderAutocomplete();
    const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
    userEvent.click(autocompleteField);
    userEvent.type(autocompleteField, 'c');

    expectMenuToBeOpen();

    expect(autocompleteField.value).toEqual('c');

    userEvent.type(autocompleteField, '{esc}');

    expectMenuToBeClosed();
  });

  it('displays a custom error message', () => {
    renderAutocomplete({ 'error-message': 'Something went wrong' });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('displays an error message in the default position for Core', () => {
    const { asFragment } = renderAutocomplete({
      'error-message': 'Something went wrong',
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays an error message in the default location for Healthcare', () => {
    config({ errorPlacementDefault: 'bottom' });
    const { asFragment } = renderAutocomplete({
      'error-message': 'Something went wrong',
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('sets the display location of the error message', () => {
    const { asFragment } = renderAutocomplete({
      'error-placement': 'bottom',
      'error-message': 'Something went wrong',
    });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('can add a custom class name to the error message', () => {
    const { asFragment } = renderAutocomplete({
      'error-message-class-name': 'custom-class-name',
      'error-message': 'Something went wrong',
    });
    expect(asFragment()).toMatchSnapshot();
  });

  // it("calls child TextField's event handlers", () => {
  //   const props = {
  //     label: 'autocomplete',
  //     name: 'autocomplete_field',
  //     onFocus: jest.fn(),
  //     onChange: jest.fn(),
  //     onKeyDown: jest.fn(),
  //     // onTouchEnd : jest.fn(), Doesn't look like we can actually test onTouchEnd
  //     onBlur: jest.fn(),
  //   };
  //   renderAutocomplete({ children: <TextField {...props} /> });
  //   const field = screen.getByRole('combobox');
  //   userEvent.click(field);
  //   expect(props.onFocus).toHaveBeenCalledTimes(1);
  //   userEvent.type(field, 'c');
  //   expect(props.onKeyDown).toHaveBeenCalledTimes(1);
  //   expect(props.onChange).toHaveBeenCalledTimes(1);
  //   userEvent.tab();
  //   expect(props.onBlur).toHaveBeenCalledTimes(1);
  // });

  // it('allows arbitrary props to remain on the TextField', () => {
  //   const props = {
  //     label: 'autocomplete',
  //     name: 'autocomplete_field',
  //     placeholder: 'Hello world!',
  //     fieldClassName: 'a-custom-class',
  //   };
  //   renderAutocomplete({ children: <TextField {...props} /> });
  //   const field = screen.getByRole('combobox');
  //   expect(field).toHaveAttribute('placeholder', props.placeholder);
  //   expect(field).toHaveClass(props.fieldClassName);
  // });

  // it('inherits size prop from the TextField', () => {
  //   const { container } = renderAutocomplete({
  //     children: <TextField label="autocomplete" name="field" size="medium" />,
  //   });
  //   const field = screen.getByRole('combobox');
  //   expect(field).toHaveClass('ds-c-field--medium');
  //   open();
  //   const menuContainer = container.querySelector('.ds-c-autocomplete__menu-container');
  //   expect(menuContainer).toHaveClass('ds-c-field--medium');
  // });

  // it('can have a disabled TextField', () => {
  //   renderAutocomplete({
  //     children: <TextField label="autocomplete" name="field" disabled />,
  //   });
  //   const field = screen.getByRole('combobox');
  //   expect(field).toHaveAttribute('disabled');
  //   const clearButton = screen.getByText('Clear search');
  //   expect(clearButton).toHaveAttribute('disabled');
  // });
});
