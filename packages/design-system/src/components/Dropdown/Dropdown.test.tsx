import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

const defaultProps = { name: 'dropdown', label: 'Select an option' };

export function generateOptions(count: number): { value: string; label: string }[] {
  const options = [];

  for (let i = 1; i < count + 1; i++) {
    options.push({
      value: String(i),
      label: String(i),
    });
  }

  return options;
}

function makeDropdown(customProps = {}, optionsCount = 1) {
  const props = { ...defaultProps, ...customProps };
  const component = <Dropdown {...props} options={generateOptions(optionsCount)} />;

  return render(component);
}

describe('Dropdown', () => {
  it('dropdown matches snapshot', () => {
    const { container } = makeDropdown({
      value: '1',
      label: '',
      ariaLabel: 'test aria label',
    });

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a select menu', () => {
    makeDropdown({ value: '1', label: '', ariaLabel: 'test aria label' });

    const select = screen.getByRole('combobox');
    const options = screen.queryAllByRole('option');
    expect(select).toBeInTheDocument();
    expect(options.length).toEqual(1);
    expect(select).toMatchSnapshot();
  });

  it('renders options correctly', () => {
    makeDropdown({ defaultValue: '1' }, 10);

    const select = screen.getByRole('combobox');
    const options = screen.queryAllByRole('option');
    expect(options.length).toBe(10);
    expect(select).toMatchSnapshot();
  });

  it('controlled selects <option>', () => {
    makeDropdown({ value: '1' }, 4);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('1');
  });

  it('uncontrolled selects <option>', () => {
    makeDropdown({ defaultValue: '2' }, 4);

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('2');
  });

  it('applies additional classNames to select element', () => {
    makeDropdown({ fieldClassName: 'foo' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('foo');
    // Make sure we're not replacing the other class names
    expect(select).toHaveClass('ds-c-field');
  });

  it('adds small size classes to select element', () => {
    makeDropdown({ size: 'small' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('ds-c-field--small');
  });

  it('adds medium size classes to select element', () => {
    makeDropdown({ size: 'medium' });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('ds-c-field--medium');
  });

  it('is inversed', () => {
    makeDropdown({ inversed: true });

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('ds-c-field--inverse');
  });

  // it('has error', () => {
  //   makeDropdown({ errorMessage: 'Error' });

  //   const select = screen.getByRole('combobox');
  //   expect(select).toHaveAttribute('aria-invalid', 'true');
  //   expect(select).toHaveClass('ds-c-field--error');
  // });

  // it('handles bottom placed error', () => {
  //   makeSelect({
  //     errorMessage: 'Error',
  //     errorPlacement: 'bottom',
  //     errorId: '1_error',
  //   });

  //   const select = screen.getByRole('combobox');
  //   expect(select).toHaveAttribute('aria-invalid', 'true');
  //   expect(select).toHaveAttribute('aria-describedby', '1_error');
  //   expect(select).toHaveClass('ds-c-field--error');
  //   expect(select).toMatchSnapshot();
  // });

  // it('is disabled', () => {
  //   makeSelect({ disabled: true });

  //   const select = screen.getByRole('combobox');
  //   expect(select).toHaveAttribute('disabled');
  // });

  // it('is not disabled', () => {
  //   makeSelect();

  //   const select = screen.getByRole('combobox');
  //   expect(select).not.toHaveAttribute('disabled');
  // });

  // it('calls the onChange handler', () => {
  //   makeSelect({ defaultValue: '1' }, 10);
  //   const select = screen.getByRole('combobox');
  //   userEvent.selectOptions(select, screen.getByRole('option', { name: '2' }));
  //   expect(defaultProps.onBlur).not.toHaveBeenCalled();
  //   expect(defaultProps.onChange).toHaveBeenCalled();
  // });

  // it('calls the onBlur handler', () => {
  //   makeSelect({ defaultValue: '1' }, 10);
  //   const select = screen.getByRole('combobox');
  //   userEvent.click(select);
  //   userEvent.tab();
  //   expect(defaultProps.onBlur).toHaveBeenCalled();
  //   expect(defaultProps.onChange).not.toHaveBeenCalled();
  // });
});
