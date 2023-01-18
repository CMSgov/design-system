import React from 'react';
import { Spinner } from '@cmsgov/ds-healthcare-gov';

function SpinnerExample(): React.ReactElement {
  return (
    <div>
      <h2>Spinner Example</h2>
      <Spinner className="ds-u-valign--middle" />
    </div>
  );
}

export default SpinnerExample;
