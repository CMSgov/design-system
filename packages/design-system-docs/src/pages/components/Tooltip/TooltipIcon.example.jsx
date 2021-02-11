import React from 'react';
import ReactDOM from 'react-dom';
import { TooltipIcon } from '@cmsgov/design-system';

ReactDOM.render(
  <>
    <div className="ds-u-display--inline-block ds-u-padding--2">
      <TooltipIcon />
    </div>
    <div className="ds-u-display--inline-block ds-u-padding--2 ds-u-fill--background-inverse">
      <TooltipIcon inversed />
    </div>
  </>,
  document.getElementById('js-example')
);
