import React from 'react';
import Autocomplete from './Autocomplete';
import TextField from '../TextField/TextField';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function makeAutocomplete(customProps = {}) {
  const props = {
    items: [{ id: 'kRf6c2fY', name: 'Cook County, IL' }],
    children: <TextField label="autocomplete" name="autocomplete_field" />,
    ...customProps,
  };
  return render(<Autocomplete {...props} />);
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
    expect(screen.queryByRole('listbox').children.length).toEqual(0);
  });

  it('renders Autocomplete component no results', () => {
    makeAutocomplete({ items: [], isOpen: true });
    expect(screen.queryByRole('listbox').children.length).toEqual(1);
    expect(screen.queryByRole('option')).toHaveTextContent('No results');
  });

  it('shows the menu when open', () => {
    const { container } = makeAutocomplete({ isOpen: true });
    const child = container.querySelector('.ds-c-autocomplete__list');
    expect(child).not.toHaveClass('ds-u-display--none');
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
    it('Should expand the listbox when keys are pressed', () => {
      makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox');
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('Should set the input value correctly when a listbox selection is clicked', () => {
      makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      expect(autocompleteField.value).toBe('Cook County, IL');
    });

    it('Should set the input value to empty when Clear search is clicked', () => {
      makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const listboxItem = screen.getByRole('option');
      userEvent.click(listboxItem);

      const clearButton = screen.getByText('Clear search');
      userEvent.click(clearButton);

      expect(autocompleteField.value).toBe('');
    });

    it('Should select list items by keyboard', () => {
      makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');
      userEvent.type(autocompleteField, '{arrowdown}');
      userEvent.type(autocompleteField, '{enter}');

      expect(autocompleteField.value).toBe('Cook County, IL');
    });

    it('Should clear the input value by keyboard', () => {
      makeAutocomplete();
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

    it('Closes the listbox when ESC is pressed', () => {
      const { container } = makeAutocomplete();
      const autocompleteField = screen.getByRole('combobox') as HTMLInputElement;
      userEvent.click(autocompleteField);
      userEvent.type(autocompleteField, 'c');

      const menuContainer = container.querySelector('.ds-c-autocomplete__list');
      expect(menuContainer).not.toHaveClass('ds-u-display--none');

      expect(autocompleteField.value).toEqual('c');

      userEvent.type(autocompleteField, '{esc}');

      expect(menuContainer).toHaveClass('ds-u-display--none');
      expect(autocompleteField.value).toEqual('');
    });
  });
});
