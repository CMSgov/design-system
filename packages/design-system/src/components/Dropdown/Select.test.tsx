import Select, { SelectProps } from './Select';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { generateOptions } from './Dropdown.test';

const defaultProps: SelectProps = {
  name: 'Select',
  errorPlacement: 'top',
  id: '1',
  setRef: jest.fn(),
  onBlur: jest.fn(),
  onChange: jest.fn(),
  options: [],
};

function makeSelect(customProps = {}, optionsCount = 1) {
  const props = { ...defaultProps, ...customProps };
  const component = <Select {...props} options={generateOptions(optionsCount)} />;

  return render(component);
}

describe('Select', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a select menu', () => {
    makeSelect({ value: '1', label: '', ariaLabel: 'test aria label' });

    const select = screen.getByRole('combobox');
    const options = screen.queryAllByRole('option');
    expect(select).toBeInTheDocument();
    expect(options.length).toEqual(1);
    expect(select).toMatchSnapshot();
  });

  it('renders options correctly', () => {
    makeSelect({ defaultValue: '1' }, 10);

    const select = screen.getByRole('combobox');
    const options = screen.queryAllByRole('option');
    expect(options.length).toBe(10);
    expect(select).toMatchSnapshot();
  });

  it('controlled selects <option>', () => {
    makeSelect({ value: '1' }, 4);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('1');
  });

  it('uncontrolled selects <option>', () => {
    makeSelect({ defaultValue: '2' }, 4);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('2');
  });

  it('applies additional classNames to select element', () => {
    makeSelect({ fieldClassName: 'foo' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('foo');
    // Make sure we're not replacing the other class names
    expect(select).toHaveClass('ds-c-field');
  });

  it('adds small size classes to select element', () => {
    makeSelect({ size: 'small' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('ds-c-field--small');
  });

  it('adds medium size classes to select element', () => {
    makeSelect({ size: 'medium' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('ds-c-field--medium');
  });

  it('is inversed', () => {
    makeSelect({ inversed: true });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('ds-c-field--inverse');
  });

  it('has error', () => {
    makeSelect({ errorMessage: 'Error' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveClass('ds-c-field--error');
  });

  it('handles bottom placed error', () => {
    makeSelect({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId: '1_error',
    });

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', '1_error');
    expect(select).toHaveClass('ds-c-field--error');
    expect(select).toMatchSnapshot();
  });

  it('is disabled', () => {
    makeSelect({ disabled: true });

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('disabled');
  });

  it('is not disabled', () => {
    makeSelect();

    const select = screen.getByRole('combobox');
    expect(select).not.toHaveAttribute('disabled');
  });

  it('calls the onChange handler', () => {
    makeSelect({ defaultValue: '1' }, 10);
    const select = screen.getByRole('combobox');
    userEvent.selectOptions(select, screen.getByRole('option', { name: '2' }));
    expect(defaultProps.onBlur).not.toHaveBeenCalled();
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls the onBlur handler', () => {
    makeSelect({ defaultValue: '1' }, 10);
    const select = screen.getByRole('combobox');
    userEvent.click(select);
    userEvent.tab();
    expect(defaultProps.onBlur).toHaveBeenCalled();
    expect(defaultProps.onChange).not.toHaveBeenCalled();
  });
});
