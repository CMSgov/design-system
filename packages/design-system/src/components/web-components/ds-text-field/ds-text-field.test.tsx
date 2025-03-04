import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './ds-text-field';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ds-text-field': any;
    }
  }
}
/* eslint-enable */

function renderTextField(props = {}) {
  return {
    user: userEvent.setup({ advanceTimers: jest.advanceTimersByTime }),
    ...render(<ds-text-field {...props} />),
  };
}

describe('ds-text-field', function () {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders text-field', () => {
    const { asFragment } = renderTextField({ id: 'static-id' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders disabled input', () => {
    renderTextField({ disabled: 'true' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('disabled');
  });

  it('does not render disabled when passed false', () => {
    renderTextField({ disabled: 'false' });
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('disabled');
  });

  it('applies additional classes to the root element', () => {
    const { container } = renderTextField({ 'class-name': 'foobar' });
    const root = container.querySelector('.ds-u-clearfix');
    expect(root).toHaveClass('foobar');
  });

  it('applies additional classes to the input', () => {
    renderTextField({ 'field-class-name': 'foobar' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('foobar');
  });

  it('applies requirement-label and hint-class-name attributes to hint text', () => {
    const customHintClass = 'my-custom-hint-class';
    const { container } = renderTextField({
      'requirement-label': 'Optional',
      'hint-class-name': customHintClass,
    });
    const input = screen.getByRole('textbox');
    const hintId = input.getAttribute('aria-describedby');
    const hint = container.querySelector(`#${hintId}`);
    expect(hint).toContainHTML('Optional');
    expect(hint.classList).toContain(customHintClass);
  });

  it('renders an error message', () => {
    const { container } = renderTextField({ 'error-message': 'Uh-oh!' });
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    const error = container.querySelector(`#${errorId}`);
    expect(error).toContainHTML('Uh-oh!');
  });

  it('applies inverse class', () => {
    const { container } = renderTextField({
      inversed: 'true',
      hint: 'Hello',
      'error-message': 'Ahh!!',
    });
    const inversedLabel = container.querySelector('.ds-c-label--inverse');
    const inversedHint = container.querySelector('.ds-c-hint--inverse');
    const inversedError = container.querySelector('.ds-c-inline-error--inverse');
    expect(inversedLabel).toBeInTheDocument();
    expect(inversedHint).toBeInTheDocument();
    expect(inversedError).toBeInTheDocument();
  });

  it('applies size classes', () => {
    renderTextField({ size: 'small' });
    const input = screen.getByRole('textbox');
    expect(input.classList.contains('ds-c-field--small')).toBe(true);
  });

  it('supports multiline text fields', () => {
    renderTextField({ multiline: 'true', rows: '3' });
    const textArea = screen.getByRole('textbox');
    expect(textArea.tagName).toEqual('TEXTAREA');
    expect(textArea).toHaveAttribute('rows', '3');
  });

  it('fires a custom ds-change event', async () => {
    jest.useFakeTimers();
    const { user } = renderTextField();

    const textFieldRoot = document.querySelector('ds-text-field');
    const mockHandler = jest.fn();
    textFieldRoot.addEventListener('ds-change', mockHandler);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.keyboard('a');

    expect(mockHandler).toHaveBeenCalledTimes(1);
    textFieldRoot.removeEventListener('ds-change', mockHandler);
  });

  it('fires a custom ds-blur event', async () => {
    jest.useFakeTimers();
    const { user } = renderTextField();

    const textFieldRoot = document.querySelector('ds-text-field');
    const onBlur = jest.fn();
    const onChange = jest.fn();
    textFieldRoot.addEventListener('ds-blur', onBlur);
    textFieldRoot.addEventListener('ds-change', onChange);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.tab();

    jest.runAllTimers();

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    textFieldRoot.removeEventListener('ds-blur', onBlur);
    textFieldRoot.removeEventListener('ds-change', onChange);
  });

  it('formats a phone number on blur', async () => {
    jest.useFakeTimers();
    const { user } = renderTextField({ 'label-mask': 'phone' });

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.click(input);
    await user.type(input, '1234567890');
    await user.tab();

    expect(input.value).toEqual('123-456-7890');
  });
});
