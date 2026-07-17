import { act, render, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SingleInputDateField from './SingleInputDateField';
import * as i18n from '../i18n';
import { es } from 'date-fns/locale/es';

const defaultProps = {
  label: 'Birthday',
  hint: 'Please enter your birthday',
  name: 'single-input-date-field',
  value: '',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  id: 'static-id',
};

function renderField(props = {}) {
  return {
    user: userEvent.setup(),
    ...render(<SingleInputDateField {...defaultProps} {...props} />),
  };
}

function getInput() {
  return screen.getByRole('textbox');
}

describe('SingleInputDateField', function () {
  it('renders without picker', () => {
    const { container } = renderField();

    expect(container.querySelector('.ds-c-single-input-date-field')).toBeInTheDocument();

    const label = container.querySelector('.ds-c-label');
    expect(label?.textContent).toContain('Birthday');

    const hint = container.querySelector('.ds-c-hint');
    expect(hint?.textContent).toContain('Please enter your birthday');

    const mask = container.querySelector('.ds-c-label-mask');
    expect(mask).toBeInTheDocument();
    expect(mask?.textContent).toContain('MM/DD/YYYY');
    expect(mask?.querySelectorAll('span')).toHaveLength(2);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.parentElement).toHaveClass('ds-c-single-input-date-field__field-wrapper');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders without picker in Spanish', () => {
    // getLocale handles translation within the DatePicker component
    const getLocaleSpy = jest.spyOn(i18n, 'getLocale').mockReturnValue(es);
    // getLanguage is used by our labels and page text for translation
    const getLanguageSpy = jest.spyOn(i18n, 'getLanguage').mockReturnValue('es');

    const { container } = renderField({
      label: 'Cumpleaños',
      hint: 'Por favor, ingrese su fecha de nacimiento',
    });

    expect(container.querySelector('.ds-c-single-input-date-field')).toBeInTheDocument();

    const label = container.querySelector('.ds-c-label');
    expect(label).toHaveTextContent('Cumpleaños');

    const hint = container.querySelector('.ds-c-hint');
    expect(hint).toHaveTextContent('Por favor, ingrese su fecha de nacimiento');

    const mask = container.querySelector('.ds-c-label-mask');
    expect(mask).toBeInTheDocument();
    expect(mask).toHaveTextContent('DD/MM/YYYY');
    expect(mask?.querySelectorAll('span')).toHaveLength(2);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.parentElement).toHaveClass('ds-c-single-input-date-field__field-wrapper');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    getLanguageSpy.mockRestore();
    getLocaleSpy.mockRestore();
  });

  it('masks in label', async function () {
    const { container, user } = renderField({ value: '11-01' });
    await user.click(getInput());
    expect(container.querySelector('.ds-c-label-mask')?.textContent).toContain('11/01/YYYY');
  });

  it('calls onChange when input changes', async function () {
    const onChange = jest.fn();
    const { user } = renderField({ onChange });
    await user.type(getInput(), '1');
    expect(onChange).toHaveBeenCalledWith('1', '01', undefined);
  });

  it('calls onChange when input loses focus', async function () {
    const onChange = jest.fn();
    const { user } = renderField({ onChange, value: '01-02-2000' });
    // Months are zero based because of course
    const expectedDate = new Date(2000, 0, 2);
    await user.click(getInput());
    await user.tab();
    expect(onChange).toHaveBeenCalledWith('01/02/2000', '01/02/2000', expectedDate);
  });

  it('calls onChange with undefined date when input loses focus with an invalid date', async function () {
    const onChange = jest.fn();
    const { user } = renderField({ onChange, value: '02/31/2024' });

    await user.click(getInput());
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('02/31/2024', '02/31/2024', undefined);
  });

  it('calls onChange with a valid date when Spanish-formatted input loses focus', async function () {
    const getLanguageSpy = jest.spyOn(i18n, 'getLanguage').mockReturnValue('es');
    const onChange = jest.fn();
    const { user } = renderField({ onChange, value: '31-01-2000' });
    // Months are zero based because of course
    const expectedDate = new Date(2000, 0, 31);

    await user.click(getInput());
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('31/01/2000', '31/01/2000', expectedDate);

    getLanguageSpy.mockRestore();
  });

  it('calls onFocus with a valid date', async function () {
    const onBlur = jest.fn();
    const { user } = renderField({ onBlur, value: '01-02-2000' });
    // Months are zero based because of course
    const expectedDate = new Date(2000, 0, 2);
    await user.click(getInput());
    await user.tab();
    const lastCall = onBlur.mock.lastCall;
    // onBlur can be called with two arguments. We check the second.
    expect(lastCall[1]).toEqual(expectedDate);
  });

  it('calls onChange with undefined date when Spanish-formatted input is invalid', async function () {
    const getLanguageSpy = jest.spyOn(i18n, 'getLanguage').mockReturnValue('es');
    const onChange = jest.fn();
    const { user } = renderField({ onChange, value: '31-02-2024' });

    await user.click(getInput());
    await user.tab();

    expect(onChange).toHaveBeenCalledWith('31/02/2024', '31/02/2024', undefined);

    getLanguageSpy.mockRestore();
  });

  it('returns an invalid date when the user only enters 3 digits for the year', async function () {
    const onBlur = jest.fn();
    const onChange = jest.fn();
    const { user } = renderField({ onBlur, onChange });
    await user.type(getInput(), '1001101');
    await user.tab();
    const lastBlur = onBlur.mock.lastCall;
    const lastChange = onChange.mock.lastCall;
    // onBlur can be called with two arguments. We check the second.
    expect(lastBlur[1]).toEqual(undefined);
    expect(lastChange).toEqual(['10/01/101', '10/01/101', undefined]);
  });

  describe('with picker', function () {
    const defaultPickerProps = {
      label: 'What day did you move?',
      hint: 'This date should be within the past 60 days in order to qualify',
      fromYear: new Date('01-02-2000').getFullYear(),
      toDate: new Date('01-31-2000'),
      id: 'static-id',
    };

    function renderPicker(props = {}) {
      return renderField({ ...defaultPickerProps, ...props });
    }

    it('renders with picker', async () => {
      const { container, user } = renderPicker();

      const label = container.querySelector('.ds-c-label');
      const hint = container.querySelector('.ds-c-hint');

      expect(
        container.querySelector('.ds-c-single-input-date-field--with-picker')
      ).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(container.querySelector('.ds-c-label-mask')).toBeInTheDocument();
      expect(
        container.querySelector('.ds-c-single-input-date-field__field-wrapper')
      ).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('ds-c-single-input-date-field__button');
      expect(button).toHaveAttribute('aria-describedby', `${label?.id} ${hint?.id}`);
      expect(button.firstElementChild?.tagName).toBe('svg');
      expect(button.firstElementChild?.classList).toContain('ds-c-icon--calendar');

      await user.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with picker in Spanish', async () => {
      const getLocaleSpy = jest.spyOn(i18n, 'getLocale').mockReturnValue(es);

      const { container, user } = renderField({
        label: '¿Qué día se mudó?',
        hint: 'Esta fecha debe estar dentro de los últimos 60 días para calificar',
        fromDate: new Date('01-01-2000'),
        toDate: new Date('01-31-2000'),
        defaultMonth: new Date('01-01-2000'),
      });

      const label = container.querySelector('.ds-c-label');
      const hint = container.querySelector('.ds-c-hint');

      expect(
        container.querySelector('.ds-c-single-input-date-field--with-picker')
      ).toBeInTheDocument();
      expect(
        container.querySelector('.ds-c-single-input-date-field__field-wrapper')
      ).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-describedby', `${label?.id} ${hint?.id}`);
      expect(button.firstElementChild?.tagName).toBe('svg');
      expect(button.firstElementChild?.classList).toContain('ds-c-icon--calendar');

      await user.click(button);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();

      const [monthSelect] = within(dialog).getAllByRole('combobox');
      // We format our month display to only have 3 letters:
      expect(monthSelect).toHaveDisplayValue(/ene/i);

      getLocaleSpy.mockRestore();
    });

    it('generates ids when no id is provided', () => {
      renderPicker({ id: undefined });
      expect(screen.getByRole('textbox').id).toMatch(/date-field--\d+/);
      expect(screen.getByRole('img').id).toMatch(/date-field--\d+__icon/);
    });

    it('traps focus within the picker when tabbing through controls', async () => {
      const { user } = renderPicker();

      await user.click(screen.getByRole('button'));

      const dialog = screen.getByRole('dialog');

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>('button:not([disabled]), select:not([disabled])')
      ).filter((element) => element.tabIndex >= 0);

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      lastElement.focus();
      expect(lastElement).toHaveFocus();

      await user.tab();

      expect(firstElement).toHaveFocus();
    });

    it('traps focus within the picker when shift-tabbing before the first control', async () => {
      const { user } = renderPicker();

      await user.click(screen.getByRole('button'));

      const dialog = screen.getByRole('dialog');

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>('button:not([disabled]), select:not([disabled])')
      ).filter((element) => element.tabIndex >= 0);

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement.focus();
      expect(firstElement).toHaveFocus();

      await user.tab({ shift: true });

      expect(lastElement).toHaveFocus();
    });

    it('moves focus to the month select after navigating months', async () => {
      const { user } = renderPicker({
        fromDate: new Date('01-01-2000'),
        toDate: new Date('04-30-2000'),
        defaultMonth: new Date('01-01-2000'),
      });

      await user.click(screen.getByRole('button'));

      const dialog = screen.getByRole('dialog');

      await user.click(within(dialog).getByLabelText(/next/i));

      const monthSelect = within(dialog).getByRole('combobox', {
        name: /month/i,
      });

      await waitFor(() => {
        expect(monthSelect).toHaveFocus();
      });
    });

    it('selecting a day calls onChange', async () => {
      const onChange = jest.fn();
      const { user } = renderPicker({ onChange });
      // Months are zero based because of course
      const expectedDate = new Date(2000, 0, 19);
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });

      await act(async () => {
        await user.click(screen.getByRole('gridcell', { name: /19th/ }));
      });

      expect(onChange).toHaveBeenCalledWith('01/19/2000', '01/19/2000', expectedDate);
    });

    it('does not deselect the date when the selected day is selected again', async () => {
      const onChange = jest.fn();
      const { user } = renderPicker({ onChange });

      const calendarButton = screen.getByRole('button');
      const selectedDay = () => screen.getByRole('gridcell', { name: /19th/ });

      await user.click(calendarButton);
      await user.click(selectedDay());

      expect(onChange).toHaveBeenCalledWith('01/19/2000', '01/19/2000', new Date(2000, 0, 19));

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await user.click(calendarButton);
      const callsBeforeReselection = onChange.mock.calls.length;

      await user.click(selectedDay());

      expect(onChange).toHaveBeenCalledTimes(callsBeforeReselection + 1);
      expect(onChange).toHaveBeenLastCalledWith('01/19/2000', '01/19/2000', new Date(2000, 0, 19));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
