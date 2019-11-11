import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';

const loremM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
accumsan diam vitae metus lacinia, eget tempor purus placerat.`;

const TooltipExample = () => {
  return (
    <Fragment>
      <div className="ds-u-display--flex">
        <p>Tooltip</p>
        <Tooltip id="tooltip-1-id" ariaLabel="aria label" positionFixed>
          <p>{loremM}</p>
        </Tooltip>
      </div>
      <div className="ds-u-display--flex">
        <p>Tooltip with interactive content</p>
        <Tooltip id="tooltip-2-id" hasInteractiveContent ariaLabel="aria label" positionFixed>
          <p>
            <a href="#noop">Link to website</a>
            {' ' + loremM}
          </p>
        </Tooltip>
      </div>
      <div className="example--inverse">
        <div className="ds-u-display--flex">
          <p>Inverse tooltip</p>
          <Tooltip
            id="tooltip-3-id"
            ariaLabel="aria label"
            inverse
            tooltipBodyInverse
            positionFixed
          >
            <p>{loremM}</p>
          </Tooltip>
        </div>
        <div className="ds-u-display--flex">
          <p>Inverse tooltip trigger only</p>
          <Tooltip id="tooltip-4-id" ariaLabel="aria label" inverse positionFixed>
            <p>{loremM}</p>
          </Tooltip>
        </div>
      </div>
    </Fragment>
  );
};

ReactDOM.render(<TooltipExample />, document.getElementById('js-example'));
