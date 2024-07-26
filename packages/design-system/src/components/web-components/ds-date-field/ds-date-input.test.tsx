// Date Input
// 1. Renders with all defaultProps [X]
// 2. Is inversed [X]
// 3. Has invalid month [X]
// 4. Has invalid day [X]
// 5. Has invalid year
// 6. Is disabled [X]
// 7. Returns reference to input fields [X]

// Event Handlers Tests:
// 8. Calls onBlur when month is blurred [X]
// 9. Calls onChange when day is changed [X]
// 10. Calls onComponentBlur when the component loses focus
// 11. Does not call onComponentBlur when focus switches to another date component input
// 12. Formats the date as a single string

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-date-input';

const defaultProps = {
  'day-name': 'day',
  'day-label': 'Day',
  'month-name': 'month',
  'month-label': 'Month',
  'year-name': 'year',
  'year-label': 'Year',
  id: 'static-id',
};

function renderDateInput(props = {}) {
  return render(<ds-date-input {...defaultProps} {...props} />);
}

function expectInvalid(textField: HTMLElement) {
  expect(textField.classList).toContain('ds-c-field--error');
  expect(textField.getAttribute('aria-invalid')).toBeTruthy();
}

describe('DateInput', () => {
  it('renders with all defaultProps', () => {
    renderDateInput();

    const inputs = screen.getAllByRole('textbox');
    const monthLabel = screen.getByLabelText(/month/i);
    const dayLabel = screen.getByLabelText(/day/i);
    const yearLabel = screen.getByLabelText(/year/i);

    expect(monthLabel).toHaveClass('ds-c-field--month');
    expect(monthLabel).toHaveAttribute('name', 'month');
    expect(monthLabel).toHaveAttribute('maxlength', '2');

    expect(dayLabel).toHaveClass('ds-c-field--day');
    expect(dayLabel).toHaveAttribute('name', 'day');
    expect(dayLabel).toHaveAttribute('maxlength', '2');

    expect(yearLabel).toHaveClass('ds-c-field--year');
    expect(yearLabel).toHaveAttribute('name', 'year');
    expect(yearLabel).toHaveAttribute('maxlength', '4');

    inputs.forEach((input) => {
      expect(input).toHaveAttribute('inputmode', 'numeric');
      expect(input).toHaveAttribute('pattern', '[0-9]*');
      expect(input).toHaveAttribute('type', 'text');
    });

    expect(screen.queryAllByText('/')).toHaveLength(2);
  });

  it('is inversed', async () => {
    renderDateInput({ inversed: true });
    const textFields = await screen.findAllByRole('textbox');
    textFields.forEach((textField) => {
      expect(textField.classList).toContain('ds-c-field--inverse');
    });
  });

  it('has invalid month', () => {
    renderDateInput({ 'month-invalid': true });
    const monthInput = screen.getByRole('textbox', { name: /month/i });
    expectInvalid(monthInput);
  });

  it('has invalid day', () => {
    renderDateInput({ 'day-invalid': true });
    expectInvalid(screen.getByRole('textbox', { name: /day/i }));
  });

  it('has invalid year', () => {
    renderDateInput({ 'year-invalid': true });
    expectInvalid(screen.getByRole('textbox', { name: /year/i }));
  });

  it('is disabled', async () => {
    renderDateInput({ disabled: true });
    const textFields = await screen.findAllByRole('textbox');
    textFields.forEach((textField) => {
      expect(textField.hasAttribute('disabled')).toBeTruthy();
    });
  });

  it('returns reference to input fields', async () => {
    const dayDefaultValue = '1';
    const monthDefaultValue = '22';
    const yearDefaultValue = '3333';

    renderDateInput({
      'day-default-value': dayDefaultValue,
      'month-default-value': monthDefaultValue,
      'year-default-value': yearDefaultValue,
    });

    const dateInputElement = document.querySelector('ds-date-input');
    expect(dateInputElement).toBeInTheDocument();

    const dayInput = dateInputElement?.querySelector<HTMLInputElement>(`input[name="day"]`);
    const monthInput = dateInputElement?.querySelector<HTMLInputElement>(`input[name="month"]`);
    const yearInput = dateInputElement?.querySelector<HTMLInputElement>(`input[name="year"]`);

    expect(dayInput).not.toBeNull();
    expect(monthInput).not.toBeNull();
    expect(yearInput).not.toBeNull();

    expect(dayInput?.value).toBe(dayDefaultValue);
    expect(monthInput?.value).toBe(monthDefaultValue);
    expect(yearInput?.value).toBe(yearDefaultValue);
  });

  describe('DateInput - Event Handlers', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear all mocks before each test
    });

    it('calls onBlur when month is blurred', () => {
      renderDateInput();

      const dateInputElement = document.querySelector('ds-date-input');
      const mockBlurHandler = jest.fn();
      dateInputElement.addEventListener('ds-blur', mockBlurHandler);

      const monthInput = screen.getByRole('textbox', { name: /month/i });
      userEvent.click(monthInput);
      userEvent.tab();

      expect(mockBlurHandler).toHaveBeenCalledTimes(1);
      dateInputElement.removeEventListener('ds-blur', mockBlurHandler);
    });

    it('calls onChange when day is changed', () => {
      renderDateInput();

      const dateInputElement = document.querySelector('ds-date-input');
      const mockChangeHandler = jest.fn();
      dateInputElement.addEventListener('ds-change', mockChangeHandler);

      const monthInput = screen.getByRole('textbox', { name: /month/i });
      userEvent.type(monthInput, '1');

      expect(mockChangeHandler).toHaveBeenCalledTimes(1);
      dateInputElement.removeEventListener('ds-change', mockChangeHandler);
    });
  });
});
