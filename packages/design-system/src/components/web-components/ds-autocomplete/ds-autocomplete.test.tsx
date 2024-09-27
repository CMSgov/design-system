import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-autocomplete';

const defaultItems = [{ id: 'kRf6c2fY', name: 'Cook County, IL' }];

function makeAutocomplete(customProps = {}) {
  const props = {
    items: JSON.stringify(defaultItems),
    'aria-clear-label': 'Clear search to try again',
    'clear-input-text': 'Clear search',
    'clear-search-button': 'true',
    'loading-message': 'Loading...',
    'no-results-message': 'No results',
    'ds-change': () => null,
    ...customProps,
  };

  return <ds-autocomplete {...props} />;
}

function renderAutocomplete(customProps = {}) {
  return render(makeAutocomplete(customProps));
}

describe('Autocomplete', () => {
  it('renders correctly', () => {
    const { asFragment } = renderAutocomplete(renderAutocomplete);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders a closed Autocomplete component', () => {
    const { container } = renderAutocomplete();

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
});
