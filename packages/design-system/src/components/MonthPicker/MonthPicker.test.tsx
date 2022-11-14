import MonthPicker from './MonthPicker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setLanguage } from '@cmsgov/design-system';

const defaultProps = {
  name: 'months',
  label: 'Months',
  selectAllText: 'Select all',
  clearAllText: 'Clear all',
};

function renderMonthPicker(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return render(<MonthPicker {...props} />);
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

  it('calls `onChange` and maintains state when checking/unchecking checkboxes', () => {
    const onChange = jest.fn();
    renderMonthPicker({ onChange });

    const el = screen.queryByLabelText('Jan');
    expect(el).not.toBeChecked();

    userEvent.click(el);
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

  describe('select-all button', () => {
    it('has default "select all" text', () => {
      renderMonthPicker();
      const buttons = screen.getAllByRole('button');
      expect(buttons[0].textContent).toEqual('Select all');
    });

    it('triggers onSelectAll', () => {
      const onSelectAll = jest.fn();
      renderMonthPicker({ onSelectAll });

      const button = screen.getByText('Select all');
      expect(button).toHaveAttribute('aria-pressed', 'false');

      userEvent.click(button);
      expect(onSelectAll).toHaveBeenCalled();
    });
  });

  describe('clear-all button', () => {
    it('has default "clear all" text', () => {
      renderMonthPicker();
      const buttons = screen.getAllByRole('button');
      expect(buttons[1].textContent).toEqual('Clear all');
    });

    it('triggers onClearAll', () => {
      const onClearAll = jest.fn();
      renderMonthPicker({ onClearAll });

      const button = screen.getByText('Clear all');
      expect(button).toHaveAttribute('aria-pressed', 'true');

      userEvent.click(button);
      expect(onClearAll).toHaveBeenCalled();
    });
  });
});
