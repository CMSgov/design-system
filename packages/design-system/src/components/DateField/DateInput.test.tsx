import { createRef } from 'react';
import DateInput, { DateInputProps } from './DateInput';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const defaultProps: DateInputProps = {
  dayName: 'day',
  dayLabel: 'Day',
  monthName: 'month',
  monthLabel: 'Month',
  yearName: 'year',
  yearLabel: 'Year',
  id: 'static-id',
  language: 'en',
};

function renderDateInput(customProps: Partial<DateInputProps> = {}) {
  return render(<DateInput {...defaultProps} {...customProps} />);
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
    renderDateInput({ monthInvalid: true });
    expectInvalid(screen.getByRole('textbox', { name: /month/i }));
  });

  it('has invalid day', () => {
    renderDateInput({ dayInvalid: true });
    expectInvalid(screen.getByRole('textbox', { name: /day/i }));
  });

  it('has invalid year', () => {
    renderDateInput({ yearInvalid: true });
    expectInvalid(screen.getByRole('textbox', { name: /year/i }));
  });

  it('is disabled', async () => {
    renderDateInput({ disabled: true });
    const textFields = await screen.findAllByRole('textbox');
    textFields.forEach((textField) => {
      expect(textField.hasAttribute('disabled')).toBeTruthy();
    });
  });

  it('returns reference to input fields', () => {
    const dayDefaultValue = '1';
    const monthDefaultValue = '22';
    const yearDefaultValue = '3333';
    const dayFieldRef = createRef();
    const monthFieldRef = createRef();
    const yearFieldRef = createRef();

    renderDateInput({
      dayDefaultValue,
      dayFieldRef,
      monthDefaultValue,
      monthFieldRef,
      yearDefaultValue,
      yearFieldRef,
    });

    expect((dayFieldRef.current as HTMLInputElement).value).toBe(dayDefaultValue);
    expect((monthFieldRef.current as HTMLInputElement).value).toBe(monthDefaultValue);
    expect((yearFieldRef.current as HTMLInputElement).value).toBe(yearDefaultValue);
  });

  it('renders DD/MM/YYYY for non-English language pages', () => {
    renderDateInput({ language: 'es' });

    const monthLabel = screen.getByLabelText(/month/i);
    const dayLabel = screen.getByLabelText(/day/i);

    // A return value of 4 from compareDocumentPosition means the monthLabel follows the dayLabel in the DOM
    expect(dayLabel.compareDocumentPosition(monthLabel)).toBe(4);
  });

  it('renders MM/DD/YYYY for English language pages', () => {
    renderDateInput();

    const monthLabel = screen.getByLabelText(/month/i);
    const dayLabel = screen.getByLabelText(/day/i);

    // A return value of 4 from compareDocumentPosition means the dayLabel follows the monthLabel in the DOM
    expect(monthLabel.compareDocumentPosition(dayLabel)).toBe(4);
  });

  describe('event handlers', () => {
    const props = {
      onBlur: jest.fn(),
      onChange: jest.fn(),
    };

    beforeEach(() => {
      props.onBlur.mockClear();
      props.onChange.mockClear();
    });

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    it('calls onBlur when month is blurred', () => {
      renderDateInput(props);
      const monthInput = screen.getByRole('textbox', { name: /month/i });
      userEvent.click(monthInput);
      userEvent.tab();
      expect(props.onBlur).toHaveBeenCalledTimes(1);
      expect(props.onChange).not.toHaveBeenCalled();
    });

    it('calls onChange when day is changed', () => {
      renderDateInput(props);
      const monthInput = screen.getByRole('textbox', { name: /month/i });
      userEvent.type(monthInput, '1');
      expect(props.onBlur).not.toHaveBeenCalled();
      expect(props.onChange).toHaveBeenCalled();
    });

    it('calls onComponentBlur when component loses focus', async () => {
      const onComponentBlur = jest.fn();
      renderDateInput({ ...props, onComponentBlur });
      const lastInput = screen.getByRole('textbox', { name: /year/i });
      userEvent.type(lastInput, '1');
      userEvent.tab();
      // Because of implementation details, this event doesn't fire until 20ms have gone by
      await sleep(25);
      expect(onComponentBlur).toHaveBeenCalledTimes(1);
    });

    it('does not call onComponentBlur when focus switches to other date component', async () => {
      const onComponentBlur = jest.fn();
      renderDateInput({ ...props, onComponentBlur });
      const firstInput = screen.getByRole('textbox', { name: /month/i });
      userEvent.click(firstInput);
      // Tab to the next input, which is still part of the DateField component
      userEvent.tab();
      // Because of implementation details, this event doesn't fire until 20ms have gone by
      await sleep(25);
      expect(onComponentBlur).not.toHaveBeenCalled();
    });

    it('formats the date as a single string', () => {
      renderDateInput({
        ...props,
        dateFormatter: (values) => `${values.month} ${values.day} ${values.year}`,
        monthDefaultValue: '1',
        dayDefaultValue: '22',
        yearDefaultValue: '3333',
      });
      const monthInput = screen.getByRole('textbox', { name: /month/i });
      userEvent.type(monthInput, '2');
      userEvent.tab();

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(props.onBlur).toHaveBeenCalledTimes(1);
      expect(props.onChange.mock.calls[0][1]).toBe('12 22 3333');
      expect(props.onBlur.mock.calls[0][1]).toBe('12 22 3333');
    });
  });
});
