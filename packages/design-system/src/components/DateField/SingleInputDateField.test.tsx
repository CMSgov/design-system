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
    const { asFragment } = renderField();
    expect(asFragment()).toMatchSnapshot();
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
      const { asFragment } = renderPicker();
      expect(asFragment()).toMatchSnapshot();
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
