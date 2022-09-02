import React from 'react';
import { TextField, unmaskValue } from './TextField';
import { render } from '@testing-library/react';

const defaultProps = {
  label: 'Foo',
  name: 'spec-field',
};

function renderTextField(customProps = {}) {
  return render(<TextField {...defaultProps} {...customProps} />);
}

describe('TextField', function () {
  it('renders', () => {
    expect(renderTextField().asFragment()).toMatchSnapshot();
  });

  it('exports unmaskValue method', () => {
    expect(typeof unmaskValue).toBe('function');
  });
});
