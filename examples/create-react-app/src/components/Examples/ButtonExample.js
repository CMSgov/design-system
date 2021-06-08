import { Button } from '@cmsgov/design-system';
import React from 'react';

function ButtonExample() {
  return (
    <div>
      <h2>Button Example</h2>
      <Button
        className="ds-c-button ds-c-button--primary"
        key="primary"
        href="https://designsystem.digital.gov/"
      >
        OK
      </Button>
    </div>
  );
}

export default ButtonExample;
