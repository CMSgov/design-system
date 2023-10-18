import { Tooltip, TooltipIcon } from '@cmsgov/design-system';
import React from 'react';

function TooltipExample() {
  return (
    <div>
      <h2>Tooltip Example</h2>
      <Tooltip
        ariaLabel="Label describing the subject of the tooltip"
        className="ds-c-tooltip__trigger-icon"
        activeClassName="ds-c-tooltip-icon--active"
        title="Tooltip trigger uses <TooltipIcon> for the trigger content"
      >
        <TooltipIcon />
      </Tooltip>
    </div>
  );
}

export default TooltipExample;
