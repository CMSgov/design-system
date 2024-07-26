import { act, render, screen } from '@testing-library/react';
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
  return render(<ds-text-field {...props} />);
}

describe('ds-text-field', function () {
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

  it('applies additional classes to the wrapper', () => {
    const { container } = renderTextField({ 'class-name': 'foobar' });
    const wrapper = container.querySelector('.ds-u-clearfix');
    expect(wrapper).toHaveClass('foobar');
  });

  it('applies additional classes to the input', () => {
    renderTextField({ 'field-class-name': 'foobar' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('foobar');
  });

  it('applies requirement-label to hint text', () => {
    const { container } = renderTextField({ 'requirement-label': 'Optional' });
    const input = screen.getByRole('textbox');
    const hintId = input.getAttribute('aria-describedby');
    const hint = container.querySelector(`#${hintId}`);
    expect(hint).toContainHTML('Optional');
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

  it('fires a custom ds-change event', () => {
    renderTextField();

    const textFieldRoot = document.querySelector('ds-text-field');
    const mockHandler = jest.fn();
    textFieldRoot.addEventListener('ds-change', mockHandler);

    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.keyboard('a');

    expect(mockHandler).toHaveBeenCalledTimes(1);
    textFieldRoot.removeEventListener('ds-change', mockHandler);
  });

  it('fires a custom ds-blur event', async () => {
    renderTextField();

    const textFieldRoot = document.querySelector('ds-text-field');
    const onBlur = jest.fn();
    const onChange = jest.fn();
    textFieldRoot.addEventListener('ds-blur', onBlur);
    textFieldRoot.addEventListener('ds-change', onChange);

    const input = screen.getByRole('textbox');
    userEvent.click(input);
    userEvent.tab();

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await act(async () => {
      await sleep(40);
    });

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onChange).not.toHaveBeenCalled();
    textFieldRoot.removeEventListener('ds-blur', onBlur);
    textFieldRoot.removeEventListener('ds-change', onChange);
  });

  it('formats a phone number on blur', () => {
    renderTextField({ 'label-mask': 'phone' });

    const input = screen.getByRole('textbox') as HTMLInputElement;
    userEvent.click(input);
    userEvent.type(input, '1234567890');
    userEvent.tab();

    expect(input.value).toEqual('123-456-7890');
  });
});
