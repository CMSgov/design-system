import React from 'react';
import { Tooltip, TooltipIcon } from '@cmsgov/design-system';
import ReactDOM from 'react-dom';

const TooltipExample = () => {
  return (
    <>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip</p>
        <Tooltip 
          ariaLabel="Label describing the subject of the tooltip" 
          triggerId="tooltip-1-id" 
          triggerContent={<TooltipIcon/>}
          triggerActiveClassName="trigger-focused"
        >
          <p className="ds-u-margin--0">Short description</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip with interactive content</p>
        <Tooltip
          ariaLabel="Label describing the subject of the interactive tooltip"
          interactive
          triggerId="tooltip-2-id"
          triggerContent={<TooltipIcon/>}
          triggerActiveClassName="trigger-focused"
        >
          <p className="ds-u-margin--0">
            {'Description with interactive '}<a href="#noop">link to website.</a>
          </p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip with custom trigger</p>
        <Tooltip
          ariaLabel="Label describing the subject of the interactive tooltip"
          triggerId="tooltip-3-id"
          triggerContent={
            <a className="ds-c-link">Learn more</a>
          }
          triggerClassName="ds-u-font-size--base"
          triggerActiveClassName="trigger-focused"
        >
          <p className="ds-u-margin--0">Short description</p>
        </Tooltip>
      </div>
      <div className="example--inverse ds-u-display--flex ds-u-align-items--center">
        <p className="ds-u-margin--0">Inverse tooltip</p>
        <Tooltip
          ariaLabel="Label describing the subject of the inverse tooltip"
          inverse
          triggerId="tooltip-3-id"
          triggerContent={<TooltipIcon inverse/>}
          triggerActiveClassName="trigger-focused"
        >
          <p className="ds-u-margin--0">Short description</p>
        </Tooltip>
      </div>
    </>
  );
};

ReactDOM.render(<TooltipExample />, document.getElementById('js-example'));
