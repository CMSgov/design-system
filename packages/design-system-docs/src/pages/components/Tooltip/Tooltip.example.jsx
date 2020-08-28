import React from 'react';
import { Tooltip, TooltipIcon } from '@cmsgov/design-system';
import ReactDOM from 'react-dom';

const TooltipExample = () => {
  return (
    <>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with </p>
        <Tooltip 
          ariaLabel="Label describing the subject of the tooltip" 
          triggerId="tooltip-1-id" 
          triggerContent="button"
          triggerClassName="ds-c-button"
        >
          <p className="ds-u-margin--0">{"Tooltip trigger is the default <button> element"}</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip with icon </p>
        <Tooltip 
          ariaLabel="Label describing the subject of the tooltip" 
          inverse
          triggerId="tooltip-2-id" 
          triggerContent={<TooltipIcon/>}
          triggerClassName="ds-c-tooltip__trigger-icon"
          triggerActiveClassName="ds-c-tooltip-icon--active"
        >
          <p className="ds-u-margin--0">{"Tooltip trigger uses <TooltipIcon> for the trigger content"}</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with </p>
        <Tooltip
          ariaLabel="Label describing the subject of the interactive tooltip"
          triggerId="tooltip-3-id"
          triggerComponent="a"
          triggerContent="link"
          triggerClassName="ds-c-tooltip__trigger-link"
        >
          <p className="ds-u-margin--0">{"Tooltip trigger is the <a> element"}</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with </p>
        <Tooltip
          ariaLabel="Label describing the subject of the interactive tooltip"
          interactive
          triggerId="tooltip-3-id"
          triggerContent="interactive content"
          triggerClassName="ds-c-tooltip__trigger-link"
        >
          <p className="ds-u-margin--0">
            {'Tooltip with interactive elements like a '}<a className="ds-c-link--inverse" href="#noop">link to website.</a>
          </p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with custom</p>
        <Tooltip
          ariaLabel="Label describing the tooltip"
          placement="right"
          triggerId="tooltip-3-id"
          triggerContent="placement"
          triggerClassName="ds-c-tooltip__trigger-link"
        >
          <p className="ds-u-margin--0">Tooltip positioned on the right</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with custom</p>
        <Tooltip
          ariaLabel="Label describing the tooltip"
          offset={[0,20]}
          triggerId="tooltip-3-id"
          triggerContent="offset"
          triggerClassName="ds-c-tooltip__trigger-link"
        >
          <p className="ds-u-margin--0">Tooltip positioned with custom offset</p>
        </Tooltip>
      </div>
      <div className="example--inverse ds-u-display--flex ds-u-align-items--center" style={{ maxWidth: "100%" }}>
        <p className="ds-u-margin--0">Inverse tooltip</p>
        <Tooltip
          ariaLabel="Label describing the subject of the inverse tooltip"
          inverse
          placement="right"
          triggerId="tooltip-3-id"
          triggerContent={<TooltipIcon inverse/>}
          triggerClassName="ds-c-tooltip__trigger-icon"
          triggerActiveClassName="ds-c-tooltip-icon--active"
        >
          <p className="ds-u-margin--0">Inverse tooltip styles applied</p>
        </Tooltip>
      </div>
    </>
  );
};

ReactDOM.render(<TooltipExample />, document.getElementById('js-example'));
