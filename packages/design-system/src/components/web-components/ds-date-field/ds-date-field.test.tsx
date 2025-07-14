import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import './ds-date-field';

const defaultProps = {
  label: 'Birthday',
  hint: 'Please enter your birthday',
  name: 'ds-date-field',
  value: '',
  'root-id': 'static-id',
  // 'ds-change': jest.fn(),
};

function renderField(props = {}) {
  return {
    user: userEvent.setup(),
    ...render(<ds-date-field {...props} />),
  };
}

function renderPicker(props = {}) {
  return renderField({ ...defaultProps, ...props });
}

function renderError(props = {}) {
  return renderField({ ...defaultProps, ...props });
}

function getInput() {
  return screen.getByRole('textbox');
}

describe('DateField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });
  it('renders without picker', () => {
    renderField(defaultProps);

    const label = screen.getByText('Birthday');
    expect(label).toBeInTheDocument();

    const hint = screen.getByText('Please enter your birthday');
    expect(hint).toBeInTheDocument();

    const masks = screen.getAllByText('MM/DD/YYYY');
    const mask = masks[0];
    expect(mask).toBeInTheDocument();

    const input = getInput();
    expect(input).toMatchSnapshot();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
  it('masks in label', async () => {
    const { user } = renderField({ value: '11-01' });

    await user.click(getInput());

    const mask = screen.getByText(/11\/01\/YYYY/, {
      selector: 'span:not(.ds-u-visibility--screen-reader)',
    });
    expect(mask).toBeInTheDocument();
  });

  it('generates ids when no id is provided', () => {
    // Render component without 'root-id' prop.
    renderField({
      label: 'Birthday',
      hint: 'Please enter your birthday',
      name: 'ds-date-field',
      value: '',
    });
    const inputElement = getInput();
    expect(inputElement).toMatchSnapshot();
    expect(inputElement.id).toMatch(/^date-field--[\w:.-]+$/);
  });

  it('calls ds-change (onChange) when input changes', async () => {
    const { user } = renderField(defaultProps);

    const dateFieldElement = document.querySelector('ds-date-field');
    const mockChangeHandler = jest.fn();

    dateFieldElement.addEventListener('ds-change', mockChangeHandler);

    const input = getInput() as HTMLInputElement;
    await user.type(input, '1');

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('1');
    expect(mockChangeHandler.mock.lastCall[0].detail).toEqual({
      updatedValue: '1',
      formattedValue: '01',
    });

    dateFieldElement.removeEventListener('ds-change', mockChangeHandler);
  });

  it('calls ds-change and ds-blur when input loses focus', async () => {
    const { user } = renderField({ value: '01-02-2000' });

    const dateFieldElement = document.querySelector('ds-date-field');
    const mockChangeHandler = jest.fn();
    const mockBlurHandler = jest.fn();
    dateFieldElement.addEventListener('ds-change', mockChangeHandler);
    dateFieldElement.addEventListener('ds-blur', mockBlurHandler);

    const input = getInput() as HTMLInputElement;

    await user.click(input);
    expect(input).toHaveFocus();

    await user.tab();
    expect(input).not.toHaveFocus();
    expect(mockBlurHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(mockChangeHandler.mock.lastCall[0].detail).toEqual({
      updatedValue: '01/02/2000',
      formattedValue: '01/02/2000',
    });

    dateFieldElement.removeEventListener('ds-change', mockChangeHandler);
    dateFieldElement.removeEventListener('ds-blur', mockBlurHandler);
  });

  describe('DateField with picker', () => {
    const defaultPickerProps = {
      label: 'What day did you move?',
      hint: 'This date should be within the past 60 days in order to qualify',
      'from-year': new Date('01-02-2000').getFullYear(),
      'to-date': new Date('01-02-2000').toISOString().split('T')[0],
    };

    it('renders with picker', async () => {
      const { user } = renderPicker(defaultPickerProps);
      const label = document.querySelector('.ds-c-label');
      const hint = document.querySelector('.ds-c-hint');
      expect(document.querySelector('.ds-c-single-input-date-field')).toBeInTheDocument();
      expect(document.querySelector('.ds-c-label')).toBeInTheDocument();
      expect(document.querySelector('.ds-c-hint')).toBeInTheDocument();

      const wrapper = document.querySelector('.ds-c-single-input-date-field__field-wrapper');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.querySelector('.ds-c-field')).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toMatchSnapshot();
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('ds-c-single-input-date-field__button');
      expect(button).toHaveAttribute('aria-describedby', `${label.id} ${hint.id}`);
      expect(button.firstElementChild.tagName).toBe('svg');
      expect(button.firstElementChild.classList).toContain('ds-c-icon--calendar');

      await user.click(button);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
  describe('Date Field with Error', () => {
    const defaultErrorProps = {
      label: 'What day did you move?',
      hint: 'This date should be within the past 60 days in order to qualify.',
      'from-year': '2023',
      'to-date': new Date('2023-02-15T21:56:34.272Z').toISOString(),
      'error-message': 'This is an example error message.',
    };
    it('renders with error message', () => {
      renderError(defaultErrorProps);
      const errorMessage = screen.getByText('This is an example error message.');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toMatchSnapshot();
      const inputElement = getInput();
      expect(inputElement).toMatchSnapshot();
      expect(inputElement).toHaveAttribute('aria-invalid', 'true');
      expect(errorMessage).toHaveAttribute('id', expect.stringContaining('static-id__error'));
      expect(inputElement).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(errorMessage.id)
      );
    });
  });
});
