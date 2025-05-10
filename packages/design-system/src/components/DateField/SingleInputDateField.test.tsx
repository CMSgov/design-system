import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SingleInputDateField from './SingleInputDateField';

const defaultProps = {
  label: 'Birthday',
  hint: 'Please enter your birthday',
  name: 'single-input-date-field',
  value: '',
  onChange: jest.fn(),
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
    expect(label.textContent).toContain('Birthday');

    const hint = container.querySelector('.ds-c-hint');
    expect(hint.textContent).toContain('Please enter your birthday');

    const mask = container.querySelector('.ds-c-label-mask');
    expect(mask).toBeInTheDocument();
    expect(mask.textContent).toContain('MM/DD/YYYY');
    expect(mask.querySelectorAll('span')).toHaveLength(2);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.parentElement).toHaveClass('ds-c-single-input-date-field__field-wrapper');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('masks in label', async function () {
    const { container, user } = renderField({ value: '11-01' });
    await user.click(getInput());
    expect(container.querySelector('.ds-c-label-mask').textContent).toContain('11/01/YYYY');
  });

  it('calls onChange when input changes', async function () {
    const onChange = jest.fn();
    const { user } = renderField({ onChange });
    await user.type(getInput(), '1');
    expect(onChange).toHaveBeenCalledWith('1', '01');
  });

  it('calls onChange when input loses focus', async function () {
    const onChange = jest.fn();
    const { user } = renderField({ onChange, value: '01-02-2000' });
    await user.click(getInput());
    await user.tab();
    expect(onChange).toHaveBeenCalledWith('01/02/2000', '01/02/2000');
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
      expect(button).toHaveAttribute('aria-describedby', `${label.id} ${hint.id}`);
      expect(button.firstElementChild.tagName).toBe('svg');
      expect(button.firstElementChild.classList).toContain('ds-c-icon--calendar');

      await user.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('generates ids when no id is provided', () => {
      renderPicker({ id: undefined });
      expect(screen.getByRole('textbox').id).toMatch(/date-field--\d+/);
      expect(screen.getByRole('img').id).toMatch(/date-field--\d+__icon/);
    });

    it('selecting a day calls onChange', async () => {
      const onChange = jest.fn();
      const { user } = renderPicker({ onChange });
      await act(async () => {
        await user.click(screen.getByRole('button'));
      });

      await act(async () => {
        await user.click(screen.getByRole('gridcell', { name: /19th/ }));
      });

      expect(onChange).toHaveBeenCalledWith('01/19/2000', '01/19/2000');
    });
  });
});
