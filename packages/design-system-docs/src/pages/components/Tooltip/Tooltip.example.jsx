import { Button, Tooltip, TooltipIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0">Tooltip using an icon trigger</p>
      <Tooltip
        ariaLabel="Label describing the subject of the tooltip"
        className="ds-c-tooltip__trigger-icon"
        activeClassName="ds-c-tooltip-icon--active"
        title="Tooltip trigger uses <TooltipIcon> for the trigger content"
      >
        <TooltipIcon />
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip using a</p>
      <Tooltip
        title="Tooltip trigger is styled with dashed underline"
        className="ds-c-tooltip__trigger-link"
      >
        text trigger
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with </p>
      <Tooltip
        className="ds-c-tooltip__trigger-link"
        title={
          <>
            {
              'Tooltip remains active when the mouse hovers over the tooltip body. Tooltip can contain '
            }
            <a className="ds-c-link--inverse" href="#noop">
              links
            </a>
            {' and other interactive content'}
          </>
        }
      >
        interactive content
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with custom</p>
      <Tooltip
        placement="right"
        className="ds-c-tooltip__trigger-link"
        title="Tooltip positioned on the right"
      >
        placement
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with custom</p>
      <Tooltip
        offset={[0, 20]}
        className="ds-c-tooltip__trigger-link"
        title="Tooltip positioned with custom offset"
      >
        offset
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip dialog activated </p>
      <Tooltip
        dialog
        className="ds-c-tooltip__trigger-link"
        title={
          <>
            <p className="ds-u-margin--0">
              {
                'Tooltip dialogs only activate on click and include a focus trap. Intended for tooltips with complex layout and multiple interactive elements '
              }
            </p>
            <Button
              size="small"
              className="ds-u-margin-top--2"
              href="https://dequeuniversity.com/library/aria/tooltip-dialog"
            >
              More info
            </Button>
          </>
        }
      >
        onClick
      </Tooltip>
    </div>
    <div
      className="example--inverse ds-u-display--flex ds-u-align-items--center"
      style={{ maxWidth: '100%' }}
    >
      <p className="ds-u-margin--0">Inverse tooltip</p>
      <Tooltip
        ariaLabel="Label describing the subject of the inverse tooltip"
        inversed
        placement="right"
        className="ds-c-tooltip__trigger-icon"
        activeClassName="ds-c-tooltip-icon--active"
        title="Inverse tooltip styles applied"
      >
        <TooltipIcon inversed />
      </Tooltip>
    </div>
  </>,
  document.getElementById('js-example')
);
