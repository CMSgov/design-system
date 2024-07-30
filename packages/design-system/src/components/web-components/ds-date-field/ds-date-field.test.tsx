import { screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import './ds-date-field';

const defaultProps = {
  label: 'Birthday',
  hint: 'Please enter your birthday',
  name: 'ds-date-field',
  value: '',
  'root-id': 'static-id',
};

function renderField(props = {}) {
  const element = document.createElement('ds-date-field');
  Object.keys(props).forEach((key) => {
    element.setAttribute(key, props[key]);
  });
  document.body.appendChild(element);
  return element;
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
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('aria-describedby');
    expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
  it('masks in label', () => {
    const container = renderField({ value: '11-01' });

    userEvent.click(getInput());

    const mask = container.querySelector('.ds-c-label-mask');
    expect(mask.textContent).toContain('11/01/YYYY');
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
    expect(inputElement.id).toMatch(/date-field--\d+/);
  });

  it('calls onChange when input changes', () => {
    renderField(defaultProps);

    const dateFieldElement = document.querySelector('ds-date-field');
    const mockChangeHandler = jest.fn();

    dateFieldElement.addEventListener('ds-change', mockChangeHandler);

    const input = getInput() as HTMLInputElement;
    expect(input.value).toBe('');
    userEvent.type(input, '1');

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
    expect(input.value).toBe('1');

    dateFieldElement.removeEventListener('ds-change', mockChangeHandler);
  });

  it('calls onChange when input loses focus', () => {
    renderField({ value: '01-02-2000' });

    const dateFieldElement = document.querySelector('ds-date-field');
    const mockChangeHandler = jest.fn();
    dateFieldElement.addEventListener('ds-change', mockChangeHandler);

    const input = getInput() as HTMLInputElement;

    userEvent.click(input);
    expect(input).toHaveFocus();

    userEvent.tab();
    expect(input).not.toHaveFocus();
    expect(mockChangeHandler).toHaveBeenCalledTimes(1);

    dateFieldElement.removeEventListener('ds-change', mockChangeHandler);
  });

  describe('DateField with picker', () => {
    const defaultPickerProps = {
      label: 'What day did you move?',
      hint: 'This date should be within the past 60 days in order to qualify',
      'from-year': new Date('01-02-2000').getFullYear(),
      'to-date': new Date('01-02-2000').toISOString().split('T')[0],
    };

    it('renders with picker', () => {
      renderPicker(defaultPickerProps);
      const label = document.querySelector('.ds-c-label');
      const hint = document.querySelector('.ds-c-hint');
      expect(document.querySelector('.ds-c-single-input-date-field')).toBeInTheDocument();
      expect(document.querySelector('.ds-c-label')).toBeInTheDocument();
      expect(document.querySelector('.ds-c-hint')).toBeInTheDocument();

      const wrapper = document.querySelector('.ds-c-single-input-date-field__field-wrapper');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.querySelector('.ds-c-field')).toBeInTheDocument();

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('ds-c-single-input-date-field__button');
      expect(button).toHaveAttribute('aria-describedby', `${label.id} ${hint.id}`);
      expect(button.firstElementChild.tagName).toBe('svg');
      expect(button.firstElementChild.classList).toContain('ds-c-icon--calendar');

      userEvent.click(button);
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
      const inputElement = getInput();
      expect(inputElement).toHaveAttribute('aria-invalid', 'true');
      expect(errorMessage).toHaveAttribute('id', expect.stringContaining('static-id__error'));
      expect(inputElement).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(errorMessage.id)
      );
    });
  });
});
