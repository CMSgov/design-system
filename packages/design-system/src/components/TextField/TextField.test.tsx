import { TextField, unmaskValue } from './TextField';
import { render } from '@testing-library/react';
import { DATE_MASK } from './useLabelMask';

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

  it('renders with a label mask', () => {
    expect(renderTextField({ labelMask: DATE_MASK }).asFragment()).toMatchSnapshot();
  });

  it('renders with a mask', () => {
    expect(renderTextField({ mask: 'currency' }).asFragment()).toMatchSnapshot();
  });

  it('exports unmaskValue method', () => {
    expect(typeof unmaskValue).toBe('function');
  });
});
