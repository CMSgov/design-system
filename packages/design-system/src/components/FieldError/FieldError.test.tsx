import React from 'react';
import { render, screen } from '@testing-library/react';
import FieldError from './FieldError';

const defaultProps = {
  children: 'Error message',
  id: 'error1',
  inversed: false,
};

function makeFieldError(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  const component = <FieldError {...props} />;

  return render(component);
}

describe('FieldError', function () {
  it('renders inline error', () => {
    makeFieldError();

    const error = screen.getByText('Error message');
    expect(error).toHaveClass('ds-c-field__error-message');
    expect(error).toMatchSnapshot();
  });

  it('renders inverse error', () => {
    makeFieldError({ inversed: true });

    const error = screen.getByText('Error message');
    expect(error).toHaveClass('ds-c-field__error-message--inverse');
    expect(error).toMatchSnapshot();
  });
});
