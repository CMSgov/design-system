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

    const error = screen.getByText('Error message');
    expect(error).toHaveClass('ds-c-inline-error');
    expect(error).toMatchSnapshot();
  });

  it('renders inverse error', () => {
    makeInlineError({ inversed: true });

    const error = screen.getByText('Error message');
    expect(error).toHaveClass('ds-c-inline-error--inverse');
    expect(error).toMatchSnapshot();
  });

  it('renders when children is a number', () => {
    makeInlineError({ children: 404 });

    const error = screen.getByText('404');
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('ds-c-inline-error');
  });

  it('renders when children is a React element', () => {
    makeInlineError({ children: <span data-testid="inner-error">Inner error</span> });

    const inner = screen.getByTestId('inner-error');
    expect(inner).toBeInTheDocument();
    expect(inner).toHaveTextContent('Inner error');
  });

  it('renders when children is empty string', () => {
    makeInlineError({ children: '' });

    const error = screen.queryByText('Error message');
    expect(error).not.toBeInTheDocument();
  });
});
