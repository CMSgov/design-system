import React from 'react';
import SingleInputDateField from './SingleInputDateField';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const defaultProps = {
  label: 'Birthday',
  hint: 'Please enter your birthday',
  name: 'single-input-date-field',
  value: '',
  onChange: jest.fn(),
  id: 'static-id',
};

function renderField(props = {}) {
  return render(<SingleInputDateField {...defaultProps} {...props} />);
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

    const hint = container.querySelector('.ds-c-field__hint');
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

  it('masks in label', function () {
    const { container } = renderField({ value: '11-01' });
    userEvent.click(getInput());
    expect(container.querySelector('.ds-c-label-mask').textContent).toContain('11/01/YYYY');
  });

  it('calls onChange when input changes', function () {
    const onChange = jest.fn();
    renderField({ onChange });
    userEvent.type(getInput(), '1');
    expect(onChange).toHaveBeenCalledWith('1', '01');
  });

  it('calls onChange when input loses focus', function () {
    const onChange = jest.fn();
    renderField({ onChange, value: '01-02-2000' });
    userEvent.click(getInput());
    userEvent.tab();
    expect(onChange).toHaveBeenCalledWith('01/02/2000', '01/02/2000');
  });

  describe('with picker', function () {
    const defaultPickerProps = {
      label: 'What day did you move?',
      hint: 'This date should be within the past 60 days in order to qualify',
      fromYear: new Date('01-02-2000').getFullYear(),
      toDate: new Date('01-02-2000'),
      id: 'static-id',
    };

    function renderPicker(props = {}) {
      return renderField({ ...defaultPickerProps, ...props });
    }

    it('renders with picker', () => {
      const { container } = renderPicker();

      expect(
        container.querySelector('.ds-c-single-input-date-field--with-picker')
      ).toBeInTheDocument();
      expect(container.querySelector('.ds-c-label')).toBeInTheDocument();
      expect(container.querySelector('.ds-c-label-mask')).toBeInTheDocument();
      expect(
        container.querySelector('.ds-c-single-input-date-field__field-wrapper')
      ).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('ds-c-single-input-date-field__button');
      expect(button.firstElementChild.tagName).toBe('svg');
      expect(button.firstElementChild.classList).toContain('ds-c-icon--calendar');

      userEvent.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('generates ids when no id is provided', () => {
      renderPicker({ id: undefined });
      expect(screen.getByRole('textbox').id).toMatch(/date-field--\d+/);
      expect(screen.getByRole('img').id).toMatch(/date-field--\d+__icon/);
    });

    // This is throwing many, many instances of this error:
    // `Error: Not implemented: window.computedStyle(elt, pseudoElt)`
    // I tried adding `"@testing-library/dom": "^7.31.2",` to the scripts package
    // because it is supposed to be fixed in later versions according to
    // https://github.com/testing-library/dom-testing-library/issues/774#issuecomment-702574312
    // but it isn't working
    //
    // it('selecting a day calls onChange', () => {
    //   const onChange = jest.fn();
    //   renderPicker({onChange});
    //   userEvent.click(screen.getByRole('button'));
    //   userEvent.click(screen.getByRole('button', {name: /9th/}))
    //   expect(onChange).toHaveBeenCalledWith('01/09/2000', '01/09/2000');
    // });
  });
});
