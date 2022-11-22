import React from 'react';
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
    expect(error).toHaveClass('ds-c-field__error-message');
    expect(error).toMatchSnapshot();
  });

  it('renders inverse error', () => {
    makeInlineError({ inversed: true });

    const error = screen.getByText('Error message');
    expect(error).toHaveClass('ds-c-field__error-message--inverse');
    expect(error).toMatchSnapshot();
  });
});
