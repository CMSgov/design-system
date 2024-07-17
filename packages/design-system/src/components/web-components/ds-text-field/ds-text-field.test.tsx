import { render, screen } from '@testing-library/react';
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
});
