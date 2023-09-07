import React from 'react';
jest.mock('lodash/uniqueId', () => (str) => `${str}snapshot`);
import { MultiInputDateField } from './MultiInputDateField';
import defaultDateFormatter from './defaultDateFormatter';
import { render, screen } from '@testing-library/react';

describe('MultiInputDateField', () => {
  it('renders', () => {
    const { container } = render(<MultiInputDateField />);

    expect(container.querySelectorAll('label')).toHaveLength(3);
    expect(screen.getAllByText('/')).toHaveLength(2);

    const monthInput = screen.getByLabelText(/month/i);
    expect(monthInput).toBeInTheDocument();
    expect(monthInput).toHaveAttribute('maxlength', '2');
    expect(monthInput.classList).toContain('ds-c-field--month');

    const dayInput = screen.getByLabelText(/day/i);
    expect(dayInput).toBeInTheDocument();
    expect(dayInput).toHaveAttribute('maxlength', '2');
    expect(dayInput.classList).toContain('ds-c-field--day');

    const yearInput = screen.getByLabelText(/year/i);
    expect(yearInput).toBeInTheDocument();
    expect(yearInput).toHaveAttribute('maxlength', '4');
    expect(yearInput.classList).toContain('ds-c-field--year');

    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(3);
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-describedby');
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).toHaveAttribute('inputmode', 'numeric');
      expect(input).toHaveAttribute('pattern', '[0-9]*');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('defaultDateFormatter', () => {
    it('prevents day over 2 digits', () => {
      const date = { day: '100', month: '10', year: '2000' };
      const formattedDate = defaultDateFormatter(date);
      expect(formattedDate.day).toBe('10');
      expect(formattedDate.month).toBe(date.month);
      expect(formattedDate.year).toBe(date.year);
    });

    it('prevents month over 2 digits', () => {
      const date = { day: '10', month: '100', year: '2000' };
      const formattedDate = defaultDateFormatter(date);
      expect(formattedDate.day).toBe(date.day);
      expect(formattedDate.month).toBe('10');
      expect(formattedDate.year).toBe(date.year);
    });

    it('prevents year over 4 digits', () => {
      const date = { day: '10', month: '10', year: '20000' };
      const formattedDate = defaultDateFormatter(date);
      expect(formattedDate.day).toBe(date.day);
      expect(formattedDate.month).toBe(date.month);
      expect(formattedDate.year).toBe('2000');
    });
  });
});
