import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Tooltip } from '@cmsgov/design-system';

const loremM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
accumsan diam vitae metus lacinia, eget tempor purus placerat.`;

const TooltipExample = () => {
  return (
    <Fragment>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip</p>
        <Tooltip id="tooltip-1-id" ariaLabel="Label describing the subject of the tooltip">
          <p>{loremM}</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
        <p className="ds-u-margin--0">Tooltip with interactive content</p>
        <Tooltip
          id="tooltip-2-id"
          ariaLabel="Label describing the subject of the interactive tooltip"
          hasInteractiveContent
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
            <span style={{ color: 'blue', textDecoration: 'underline' }}>Learn more</span>
          }
          triggerClassName="ds-u-font-size--base"
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
        >
          <p>{loremM}</p>
        </Tooltip>
      </div>
    </Fragment>
  );
};

ReactDOM.render(<TooltipExample />, document.getElementById('js-example'));
