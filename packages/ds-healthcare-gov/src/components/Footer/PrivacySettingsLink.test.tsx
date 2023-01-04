import React from 'react';
import PrivacySettingsLink from './PrivacySettingsLink';
import { render } from '@testing-library/react';

describe('PrivacySettingsLink', function () {
  it('should render with default options', () => {
    const { container } = render(<PrivacySettingsLink />);
    expect(container).toMatchSnapshot();
  });

  it('should render with custom class and children', () => {
    const { container } = render(
      <PrivacySettingsLink className="ds-t-test-class">Custom modal trigger</PrivacySettingsLink>
    );
    expect(container).toMatchSnapshot();
  });
});
