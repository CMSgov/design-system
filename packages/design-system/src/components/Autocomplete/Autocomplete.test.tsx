import Autocomplete from './Autocomplete';
import React from 'react';
import TextField from '../TextField/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function makeAutocomplete(customProps = {}) {
  const props = {
    ...{
      items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }],
      children: <TextField label="autocomplete" name="autocomplete_field" />,
    },
    ...customProps,
  };
  const component = <Autocomplete {...props} />;

  return render(component);
}

describe('Autocomplete', () => {
  it('renders Autocomplete component', () => {
    const { container } = makeAutocomplete();
    const page = container.firstChild;
    expect(page).toMatchSnapshot();
  });

  it('renders items', () => {
    makeAutocomplete({ isOpen: true });

    const list = screen.getByRole('listbox');
    expect(list).toBeInTheDocument();

    const items = screen.getByRole('option');
    expect(items).toBeInTheDocument();
    expect(items).toHaveTextContent('Cook County, IL');
  });

  it('renders items with children property', () => {
    const items = [
      {
        id: '1',
        name: 'Carrots (1)',
        children: (
          <>
            Carrots <strong>(1)</strong>
          </>
        ),
      },
      {
        id: '2',
        name: 'Cookies (3)',
        children: (
          <>
            Cookies <strong>(3)</strong>
          </>
        ),
      },
      {
        id: '3',
        name: 'Crackers (2)',
        children: (
          <>
            Crackers <strong>(2)</strong>
          </>
        ),
      },
      {
        id: '4',
        children: <a href="https://duckduckgo.com/?q=snacks">Search all snacks</a>,
      },
    ];

    makeAutocomplete({ items, isOpen: true });
    const ul = screen.getByRole('listbox');
    expect(ul).toMatchSnapshot();
  });

  it('renders item with custom className', () => {
    const items = [
      { id: '1a', name: 'Normal item' },
      { id: '5b', name: 'Special item', className: 'custom-class' },
    ];
    makeAutocomplete({ isOpen: true, items });

    const list = screen.queryByRole('listbox');
    expect(list).toBeInTheDocument();

    const listItems = screen.queryAllByRole('option');
    expect(listItems[1]).toHaveClass('custom-class');
    expect(listItems).toMatchSnapshot();
  });

  it('renders Autocomplete component without items', () => {
    makeAutocomplete({ items: undefined, isOpen: true });
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('only renders expected elements', () => {
    makeAutocomplete();

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render a clear search button when clearSearchButton is set to false', () => {
    makeAutocomplete({ clearSearchButton: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders default class names', () => {
    const { container } = makeAutocomplete();
    const child = container.querySelectorAll('.ds-c-autocomplete');

    expect(child.length).toEqual(1);
  });

  it('renders custom class names', () => {
    const { container } = makeAutocomplete({ className: 'additional-class' });
    const child = container.querySelector('.ds-c-autocomplete');

    expect(child).toHaveClass('additional-class');
  });

  it('renders a snapshot', () => {
    const { container } = render(
      <Autocomplete
        items={[{ id: 'kRf6c2fY', name: 'Cook County, IL' }]}
        clearSearchButton
        data-testid="my-autocomplete"
      >
        <TextField label="autocomplete" name="autocomplete_field" />
      </Autocomplete>
    );

    expect(container).toMatchSnapshot();
  });

  describe('default props', () => {
    it('defaults ariaClearLabel', () => {
      makeAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveAttribute('aria-label', 'Clear search to try again');
    });

    it('defaults clearInputText', () => {
      makeAutocomplete();
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();

      expect(button).toHaveTextContent('Clear search');
    });
  });

  describe('Downshift integration', () => {
    const props = {
      items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }],
      children: <TextField label="autocomplete" name="autocomplete_field" />,
    };

    it('Should expand the listbox when keys are pressed', () => {
      render(<Autocomplete {...props} />);
      const autocompleteField = screen.getByLabelText('autocomplete');
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('Should set the input value correctly when a listbox selection is clicked', () => {
      render(<Autocomplete {...props} />);
      const autocompleteField = screen.getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      expect(autocompleteField.value).toBe('Cook County, IL');
    });

    it('Should set the input value to empty when Clear search is clicked', () => {
      render(<Autocomplete {...props} />);
      const autocompleteField = screen.getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      const clearButton = screen.getByText('Clear search');
      userEvent.click(clearButton);

      expect(autocompleteField.value).toBe('');
    });

    it('Should select list items by keyboard', () => {
      render(<Autocomplete {...props} />);
      const autocompleteField = screen.getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');
      userEvent.type(autocompleteField, '{arrowdown}');
      userEvent.type(autocompleteField, '{enter}');

      expect(autocompleteField.value).toBe('Cook County, IL');
    });

    it('Should clear the input value by keyboard', () => {
      render(<Autocomplete {...props} />);
      const autocompleteField = screen.getByLabelText('autocomplete') as HTMLInputElement;
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

    it('Closes the listbox when ESC is pressed', () => {
      render(<Autocomplete {...props} />);
      const autocompleteField = screen.getByLabelText('autocomplete') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      let listboxEl = screen.queryByRole('listbox');
      expect(listboxEl).toBeTruthy();

      expect(autocompleteField.value).toEqual('c');

      userEvent.type(autocompleteField, '{esc}');

      listboxEl = screen.queryByRole('listbox');
      expect(listboxEl).toBeNull();
      expect(autocompleteField.value).toEqual('');
    });
  });
});
