import { Button, Tooltip, TooltipIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0">Tooltip using an icon trigger</p>
      <Tooltip
        ariaLabel="Label describing the subject of the tooltip"
        triggerContent={<TooltipIcon />}
        triggerClassName="ds-c-tooltip__trigger-icon"
        triggerActiveClassName="ds-c-tooltip-icon--active"
      >
        {'Tooltip trigger uses <TooltipIcon> for the trigger content'}
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip using a</p>
      <Tooltip triggerContent="text trigger" triggerClassName="ds-c-tooltip__trigger-link">
        Tooltip trigger is styled with dashed underline
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with </p>
      <Tooltip triggerContent="interactive content" triggerClassName="ds-c-tooltip__trigger-link">
        <>
          {
            'Tooltip remains active when the mouse hovers over the tooltip body. Tooltip can contain '
          }
          <a className="ds-c-link--inverse" href="#noop">
            links
          </a>
          {' and other interactive content'}
        </>
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with custom</p>
      <Tooltip
        placement="right"
        triggerContent="placement"
        triggerClassName="ds-c-tooltip__trigger-link"
      >
        Tooltip positioned on the right
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip with custom</p>
      <Tooltip
        offset={[0, 20]}
        triggerContent="offset"
        triggerClassName="ds-c-tooltip__trigger-link"
      >
        Tooltip positioned with custom offset
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0 ds-u-margin-right--1">Tooltip dialog activated </p>
      <Tooltip dialog triggerContent="on click" triggerClassName="ds-c-tooltip__trigger-link">
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
        triggerContent={<TooltipIcon inversed />}
        triggerClassName="ds-c-tooltip__trigger-icon"
        triggerActiveClassName="ds-c-tooltip-icon--active"
      >
        Inverse tooltip styles applied
      </Tooltip>
    </div>
  </>,
  document.getElementById('js-example')
);
