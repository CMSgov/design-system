import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from './Dropdown';

const defaultProps = {
  name: 'dropdown',
  label: 'Select an option',
  onBlur: jest.fn(),
  onChange: jest.fn((e) => {
    e.stopPropagation();
  }),
};

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

  it('has error', () => {
    const { container } = makeDropdown({ errorMessage: 'Error' });

    const wrapper = container.querySelector('div');
    expect(wrapper).toHaveAttribute('aria-invalid', 'true');
    expect(container).toMatchSnapshot();
  });

  it('handles bottom placed error', () => {
    const { container } = makeDropdown({
      errorMessage: 'Error',
      errorPlacement: 'bottom',
      errorId: '1_error',
    });

    const wrapper = container.querySelector('div');
    const select = screen.getByRole('combobox');
    expect(wrapper).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', '1_error');
    expect(select).toHaveClass('ds-c-field--error');
    expect(container).toMatchSnapshot();
  });

  it('is disabled', () => {
    makeDropdown({ disabled: true });

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('disabled');
  });

  it('is not disabled', () => {
    makeDropdown();

    const select = screen.getByRole('combobox');
    expect(select).not.toHaveAttribute('disabled');
  });

  it('calls the onChange handler', () => {
    makeDropdown({ defaultValue: '1' }, 10);
    const select = screen.getByRole('combobox');

    userEvent.selectOptions(select, screen.getByRole('option', { name: '2' }));
    expect(defaultProps.onBlur).not.toHaveBeenCalled();
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls the onBlur handler', () => {
    makeDropdown({ defaultValue: '1' }, 10);
    const selectLabel = screen.getByLabelText('Select an option');
    const select = screen.getByRole('combobox');

    userEvent.click(selectLabel);
    expect(select).toHaveFocus();
    userEvent.tab();
    expect(defaultProps.onBlur).toHaveBeenCalled();
    // TODO: reimpliment this to check for no onChange in this test
    // this is being called automatically by RTL when the component mounts
    // it does not get called in storybook or in a live environment, jsdom
    // limitation?
    // expect(defaultProps.onChange).not.toHaveBeenCalled();
  });

  it('focuses automatically with autoFocus prop', () => {
    makeDropdown({ defaultValue: '1', autoFocus: true }, 10);
    const select = screen.getByRole('combobox');

    expect(select).toHaveFocus();
  });
});
