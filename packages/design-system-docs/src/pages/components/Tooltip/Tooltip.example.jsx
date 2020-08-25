import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip, TooltipIcon } from '@cmsgov/design-system';

const loremM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
accumsan diam vitae metus lacinia, eget tempor purus placerat.`;

const TooltipExample = () => {
  return (
    <Fragment>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip</p>
        <Tooltip id="tooltip-1-id" ariaLabel="Label describing the subject of the tooltip" 
          triggerContent={<TooltipIcon/>}
          triggerActiveClassName={"trigger-focused"}>
          <p>{loremM}</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip with interactive content</p>
        <Tooltip
          id="tooltip-2-id"
          ariaLabel="Label describing the subject of the interactive tooltip"
          hasInteractiveContent
          triggerContent={<TooltipIcon/>}
          triggerActiveClassName={"trigger-focused"}
        >
          <p>
            <a href="#noop">Link to website</a>
            {' ' + loremM}
          </p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip with custom trigger</p>
        <Tooltip
          id="tooltip-3-id"
          ariaLabel="Label describing the subject of the interactive tooltip"
          triggerContent={
            <a className="ds-c-link">Learn more</a>
          }
          triggerClassName="ds-u-font-size--base"
          triggerActiveClassName={"trigger-focused"}
        >
          <p>{loremM}</p>
        </Tooltip>
      </div>
      <div className="example--inverse ds-u-display--flex ds-u-align-items--center">
        <p className="ds-u-margin--0">Inverse tooltip</p>
        <Tooltip
          id="tooltip-3-id"
          ariaLabel="Label describing the subject of the inverse tooltip"
          inverse
          triggerContent={<TooltipIcon inverse/>}
          triggerActiveClassName={"trigger-focused"}
        >
          <p>{loremM}</p>
        </Tooltip>
      </div>
    </Fragment>
  );
};

ReactDOM.render(<TooltipExample />, document.getElementById('js-example'));
