import { Tooltip } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <div className="example--wrapper ds-u-margin-top--6">
      {'Tooltip with '}
      <Tooltip
        className="ds-c-tooltip__trigger-link"
        placement="bottom"
        component="a"
        title="Tooltip trigger uses <a> for the trigger, styled with dashed underline"
      >
        inline trigger
      </Tooltip>
    </div>
    <div className="example--inverse example--wrapper ds-u-margin-bottom--2">
      {'Inverse tooltip with '}
      <Tooltip
        className="ds-c-tooltip__trigger-link"
        component="a"
        title="Tooltip trigger uses <a> for the trigger, styled with dashed underline"
        inversed
      >
        inline trigger
      </Tooltip>
    </div>
  </>,
  document.getElementById('js-example')
);
