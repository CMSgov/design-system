import React from 'react';
import { Spinner } from '@cmsgov/design-system';

function SpinnerExample(): React.ReactElement {
  return (
    <div>
      <h2>Spinner Example</h2>
      <Spinner className="ds-u-valign--middle" />
    </div>
  );
}

export default SpinnerExample;
