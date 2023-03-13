import React from 'react';
import { render } from '@testing-library/react';
import TooltipIcon from './TooltipIcon';

const defaultProps = {
  inversed: false,
};

function renderTooltipIcon(customProps = {}) {
  const props = { ...defaultProps, ...customProps };
  return render(<TooltipIcon {...props} />);
}

describe('TooltipIcon', function () {
  it('renders normal trigger icon', () => {
    const { asFragment } = renderTooltipIcon();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders inverse trigger icon', () => {
    const { asFragment } = renderTooltipIcon({ inversed: true });
    expect(asFragment()).toMatchSnapshot();
  });
});
