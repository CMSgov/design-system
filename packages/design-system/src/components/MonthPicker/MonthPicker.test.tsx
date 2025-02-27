import { setLanguage } from '@cmsgov/design-system';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MonthPicker from './MonthPicker';

const defaultProps = {
  name: 'months',
  label: 'Months',
  hint: 'Guess and test',
  errorMessage:
    'Only odd-numbered months accepted until July, except on leap years, then only prime-numbered months that have an "A" in them',
  selectAllText: 'Select all',
  clearAllText: 'Clear all',
};

function renderMonthPicker(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return {
    user: userEvent.setup(),
    ...render(<MonthPicker {...props} />),
  };
}

describe('MonthPicker', () => {
  it('renders a snapshot', () => {
    const { asFragment } = renderMonthPicker();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders inverse style', () => {
    renderMonthPicker({ inversed: true });

    const buttons = screen.getAllByRole('button');
    const checkboxes = screen.getAllByRole('checkbox');

    buttons.forEach((button) => expect(button).toHaveClass('ds-c-button--on-dark'));
    checkboxes.forEach((check) => expect(check).toHaveClass('ds-c-choice--inverse'));
  });

  it('applies `buttonVariation` to buttons', () => {
    renderMonthPicker({ buttonVariation: 'solid' });
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => expect(button).toHaveClass('ds-c-button--solid'));
  });

  it('updates name attribute on children', () => {
    renderMonthPicker({ name: 'foo' });
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((check) => expect(check).toHaveAttribute('name', 'foo'));
  });

  it('generates month names with based on locale', () => {
    const shortMonthNames = [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sept',
      'oct',
      'nov',
      'dic',
    ];
    const longMonthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    setLanguage('es');
    const { container } = renderMonthPicker();

    const labels = container.querySelectorAll('label.ds-c-label');
    Array.from(labels).forEach((label, i) => {
      expect(label.textContent).toEqual(shortMonthNames[i]);
    });

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((check, i) =>
      expect(check).toHaveAttribute('aria-label', longMonthNames[i])
    );
    setLanguage('en');
  });

  it('corresponds choice values to month numbers', () => {
    renderMonthPicker();
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((check, i) => {
      expect(check).toHaveAttribute('value', (i + 1).toString());
    });
  });

  it('calls `onChange` and maintains state when checking/unchecking checkboxes', async () => {
    const onChange = jest.fn();
    const { user } = renderMonthPicker({ onChange });

    const el = screen.queryByLabelText('Jan');
    expect(el).not.toBeChecked();

    await user.click(el);
    expect(onChange).toHaveBeenCalled();
    expect(el).toBeChecked();
  });

  it('disables month choices according to `disabledMonths` prop', () => {
    const disabledMonths = [5, 9];
    renderMonthPicker({ disabledMonths });
    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).not.toBeDisabled();
    expect(checkboxes[1]).not.toBeDisabled();
    expect(checkboxes[4]).toBeDisabled();
    expect(checkboxes[8]).toBeDisabled();
    expect(checkboxes[11]).not.toBeDisabled();
  });

  it('checks month choices according to `selectedMonths` prop', () => {
    const selectedMonths = [5, 9];
    renderMonthPicker({ selectedMonths });
    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[4]).toBeChecked();
    expect(checkboxes[8]).toBeChecked();
    expect(checkboxes[11]).not.toBeChecked();
  });

  it('checks month choices according to `defaultSelectedMonths` prop', () => {
    const defaultSelectedMonths = [5, 9];
    renderMonthPicker({ defaultSelectedMonths });
    const checkboxes = screen.getAllByRole('checkbox');

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[4]).toBeChecked();
    expect(checkboxes[8]).toBeChecked();
    expect(checkboxes[11]).not.toBeChecked();
  });

  describe('with HTML as children', () => {
    const inputs = (
      <>
        <input type="checkbox" value="1" checked />
        <input type="checkbox" value="2" checked disabled />
        <input type="checkbox" value="3" disabled />
      </>
    );

    // Testing Library .toBeChecked() and .toBeDisabled() returning false
    // positives for this test suite.
    it('accepts HTML as children', () => {
      renderMonthPicker({ children: inputs });
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(12);
    });

    it('selects input when `checked` attribute present', () => {
      const { container } = renderMonthPicker({ children: inputs });
      const checkboxes = Array.from(container.querySelectorAll('input'));

      expect(checkboxes[0].checked).toBe(true);
      expect(checkboxes[1].checked).toBe(true);
      expect(checkboxes[2].checked).toBe(false);
      expect(checkboxes[3].checked).toBe(false);
    });

    it('default selects an input when attributes present', () => {
      const { container } = renderMonthPicker({ children: inputs });
      const checkboxes = Array.from(container.querySelectorAll('input'));

      // Only checkbox[1] should be checked AND disabled
      expect(checkboxes[0].checked).toBe(true);
      expect(checkboxes[1].checked).toBe(true);
      expect(checkboxes[2].checked).toBe(false);
      expect(checkboxes[3].checked).toBe(false);

      expect(checkboxes[0].disabled).toBe(false);
      expect(checkboxes[1].disabled).toBe(true);
      expect(checkboxes[2].disabled).toBe(true);
      expect(checkboxes[3].disabled).toBe(false);
    });

    it('disables input when attribute present', () => {
      const { container } = renderMonthPicker({ children: inputs });
      const checkboxes = Array.from(container.querySelectorAll('input'));

      expect(checkboxes[0].disabled).toBe(false);
      expect(checkboxes[1].disabled).toBe(true);
      expect(checkboxes[2].disabled).toBe(true);
      expect(checkboxes[3].disabled).toBe(false);
    });
  });

  describe('select-all button', () => {
    it('has default "select all" text', () => {
      renderMonthPicker();
      const buttons = screen.getAllByRole('button');
      expect(buttons[0].textContent).toEqual('Select all');
    });

    it('triggers onSelectAll', async () => {
      const onSelectAll = jest.fn();
      const { user } = renderMonthPicker({ onSelectAll });

      const button = screen.getByText('Select all');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      await user.click(button);
      expect(onSelectAll).toHaveBeenCalled();
    });

    it("doesn't select disabled months when onSelectAll is called", async () => {
      const onSelectAll = jest.fn();
      const disabledMonths = [5, 9];

      const { user } = renderMonthPicker({ disabledMonths, onSelectAll });

      const checkboxes = screen.getAllByRole('checkbox');

      const button = screen.getByText('Select all');
      await user.click(button);

      expect(onSelectAll).toHaveBeenCalled();
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[4]).not.toBeChecked();
      expect(checkboxes[8]).not.toBeChecked();
      expect(checkboxes[11]).toBeChecked();
    });
  });

  describe('clear-all button', () => {
    it('has default "clear all" text', () => {
      renderMonthPicker();
      const buttons = screen.getAllByRole('button');
      expect(buttons[1].textContent).toEqual('Clear all');
    });

    it('triggers onClearAll', async () => {
      const onClearAll = jest.fn();
      const { user } = renderMonthPicker({ onClearAll });

      const button = screen.getByText('Clear all');
      expect(button).toHaveAttribute('aria-pressed', 'true');

      await user.click(button);
      expect(onClearAll).toHaveBeenCalled();
    });

    it("doesn't clear disable-selected months when called", async () => {
      const onClearAll = jest.fn();

      // May should be both disabled and selected
      const disabledMonths = [5];
      const defaultSelectedMonths = [5];

      const { user } = renderMonthPicker({ disabledMonths, defaultSelectedMonths, onClearAll });

      const checkboxes = screen.getAllByRole('checkbox');

      const button = screen.getByText('Clear all');
      await user.click(button);

      expect(onClearAll).toHaveBeenCalled();
      expect(checkboxes[4]).toBeChecked();
      expect(checkboxes[4]).toBeDisabled();
    });
  });
});
