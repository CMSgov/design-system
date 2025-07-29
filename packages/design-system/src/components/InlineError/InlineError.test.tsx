import { render, screen } from '@testing-library/react';
import InlineError from './InlineError';

const defaultProps = {
  children: 'Error message',
  id: 'error1',
  inversed: false,
};

function makeInlineError(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  const component = <InlineError {...props} />;

  return render(component);
}

describe('InlineError', function () {
  it('renders inline error', () => {
    makeInlineError();

    const errorText = screen.getByText('Error message');
    const error = errorText.closest('.ds-c-inline-error');
    expect(error).toHaveClass('ds-c-inline-error');
    expect(error).toMatchSnapshot();
  });

  it('renders inverse error', () => {
    makeInlineError({ inversed: true });

    const errorText = screen.getByText('Error message');
    const error = errorText.closest('.ds-c-inline-error');
    expect(error).toHaveClass('ds-c-inline-error--inverse');
    expect(error).toMatchSnapshot();
  });

  it('should wrap plain text children in spans', () => {
    const { container } = makeInlineError({ children: 'Plain text error' });

    const error = container.querySelector('.ds-c-inline-error');
    const textSpan = error.querySelector('span:last-child');
    expect(textSpan).toBeInTheDocument();
    expect(textSpan).toHaveTextContent('Plain text error');
  });

  it('should preserve React elements without additional wrapping', () => {
    const { container } = makeInlineError({
      children: <strong>Strong error message</strong>,
    });

    const error = container.querySelector('.ds-c-inline-error');
    const strong = error.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent('Strong error message');
    expect(strong.parentElement.tagName).toBe('P');
  });

  it('should handle mixed content with both text and React elements', () => {
    const children = ['Error: ', <code key="code">INVALID_INPUT</code>, ' - Try again'];
    const { container } = makeInlineError({ children });

    const error = container.querySelector('.ds-c-inline-error');
    const spans = Array.from(error.querySelectorAll('span')).filter(
      (span) => !span.classList.contains('ds-u-visibility--screen-reader')
    );
    expect(spans).toHaveLength(2);
    expect(spans[0]).toHaveTextContent(/Error:/);
    expect(spans[1]).toHaveTextContent(/- Try again/);
    expect(error.querySelector('code')).toHaveTextContent('INVALID_INPUT');
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['empty string', ''],
    ['false', false],
  ])('should render empty when children is %s', (_, children) => {
    const { container } = makeInlineError({ children });

    const error = container.querySelector('.ds-c-inline-error');
    expect(error).toBeInTheDocument();
    expect(error.querySelector('svg')).not.toBeInTheDocument();
    expect(error.querySelector('span')).not.toBeInTheDocument();
    expect(error).toBeEmptyDOMElement();
  });

  it('should handle zero as children', () => {
    const { container } = makeInlineError({ children: 0 });
    const error = container.querySelector('.ds-c-inline-error');
    expect(error).toBeInTheDocument();
    // In React, {0 && <Component />} renders "0", not the component
    // So the paragraph will contain just "0" as text
    expect(error).toHaveTextContent('0');
    expect(error.querySelector('svg')).not.toBeInTheDocument();
    expect(error.querySelector('span')).not.toBeInTheDocument();
  });

  it('should show component with valid children', () => {
    const { container } = makeInlineError({ children: 'Visible error' });
    const error = container.querySelector('.ds-c-inline-error');
    expect(error).toBeVisible();
    expect(error.querySelector('svg')).toBeInTheDocument();
    expect(error).toHaveTextContent(/Visible error/);
  });

  it('should have required ARIA attributes for accessibility', () => {
    const { container } = makeInlineError();
    const error = container.querySelector('.ds-c-inline-error');
    expect(error).toHaveAttribute('aria-live', 'assertive');
    expect(error).toHaveAttribute('aria-atomic', 'true');
  });

  it('should include screen reader prefix text when children exist', () => {
    makeInlineError();
    const srText = screen.getByText(/Error:/);
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass('ds-u-visibility--screen-reader');
  });

  it('should use provided ID or generate unique ID', () => {
    const { container: customContainer } = makeInlineError({ id: 'custom-id' });
    expect(customContainer.querySelector('.ds-c-inline-error')).toHaveAttribute('id', 'custom-id');

    const { container: autoContainer } = makeInlineError({ id: undefined });
    expect(autoContainer.querySelector('.ds-c-inline-error').id).toMatch(/^inline-error--/);
  });

  it('should render AlertCircleIcon with correct attributes when children exist', () => {
    const { container } = makeInlineError();
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('ds-c-icon--alert-circle');
    expect(icon).toHaveAttribute('viewBox', '36 -12 186 186');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not render icon or screen reader text when children are falsy', () => {
    const { container } = makeInlineError({ children: null });
    const error = container.querySelector('.ds-c-inline-error');
    expect(error.querySelector('svg')).not.toBeInTheDocument();
    expect(error.querySelector('.ds-u-visibility--screen-reader')).not.toBeInTheDocument();
  });

  it('should apply custom className while preserving base classes', () => {
    const { container } = makeInlineError({
      className: 'my-custom-class',
      inversed: true,
    });
    const error = container.querySelector('.ds-c-inline-error');
    expect(error).toHaveClass('ds-c-inline-error');
    expect(error).toHaveClass('ds-c-inline-error--inverse');
    expect(error).toHaveClass('my-custom-class');
  });

  it('should spread additional props to root element', () => {
    const { container } = makeInlineError({
      'data-testid': 'custom-test-id',
      'data-custom': 'value',
    });
    const error = container.querySelector('.ds-c-inline-error');
    expect(error).toHaveAttribute('data-testid', 'custom-test-id');
    expect(error).toHaveAttribute('data-custom', 'value');
  });
});
