import React from 'react';
import FilterDialog from './FilterDialog';
import { render, screen } from '@testing-library/react';
import { Button } from '@cmsgov/design-system';

const defaultProps = {
  actions: (
    <>
      <Button variation="solid">Submit</Button>
      <Button variation="ghost">Cancel</Button>
    </>
  ),
  children: 'Hello, this is the dialog content.',
  className: 'a-custom-class',
  heading: 'FilterDialog heading',
  onExit: jest.fn(),
};

function renderFilterDialog(overwriteProps = {}) {
  const props = Object.assign({}, defaultProps, overwriteProps);
  return render(<FilterDialog {...props} />);
}

describe('FilterDialog', () => {
  it('renders a dialog', () => {
    renderFilterDialog();
    expect(screen.getByRole('dialog')).toMatchSnapshot();
  });

  it('passes a ref to the heading', () => {
    const headingRef = React.createRef<HTMLHeadingElement>();
    renderFilterDialog({ headingRef });
    expect(headingRef.current.textContent).toEqual(defaultProps.heading);
  });

  it('allows a custom headingLevel to be set', () => {
    renderFilterDialog({ headingLevel: '5' });
    expect(screen.getByText(defaultProps.heading).tagName).toEqual('H5');
  });
});
