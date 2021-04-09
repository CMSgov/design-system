import { Button, Tooltip, TooltipIcon } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <p className="ds-u-margin--0">Tooltip with icon trigger</p>
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
      <div className="ds-u-margin--0">
        {'Tooltip with '}
        <Tooltip
          className="ds-c-tooltip__trigger-link"
          component="a"
          title="Tooltip trigger uses <a> for the trigger, styled with dotted underline"
        >
          inline trigger
        </Tooltip>
      </div>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <Tooltip placement="right" className="ds-c-button" title="Tooltip positioned on the right">
        Tooltip with custom placement
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <Tooltip
        className="ds-c-button"
        offset={[0, 25]}
        title="Tooltip positioned with custom offset"
      >
        Tooltip with custom offset
      </Tooltip>
    </div>
    <div className="ds-u-display--flex ds-u-align-items--center ds-u-margin-y--2">
      <Tooltip
        dialog
        className="ds-c-button"
        title={
          <>
            <p className="ds-u-margin--0">
              Tooltip dialogs only activate on click and include a focus trap. Intended for tooltips
              with complex layout and
              <a href="/#"> interactive elements</a>
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
        Tooltip dialog for interactive content
      </Tooltip>
    </div>
    <div className="example--inverse example--wrapper">
      <div className="ds-u-display--flex ds-u-align-items--center">
        <p className="ds-u-margin--0">Inverse tooltip with icon trigger</p>
        <Tooltip
          activeClassName="ds-c-tooltip-icon--active"
          ariaLabel="Label describing the subject of the inverse tooltip"
          className="ds-c-tooltip__trigger-icon"
          title="Inverse tooltip styles applied"
          inversed
        >
          <TooltipIcon inversed />
        </Tooltip>
      </div>
      <div className="">
        <div className="ds-u-margin--0">
          {'Inverse tooltip with '}
          <Tooltip
            className="ds-c-tooltip__trigger-link"
            component="a"
            title="Tooltip trigger uses <a> for the trigger, styled with dotted underline"
            inversed
          >
            inline trigger
          </Tooltip>
        </div>
      </div>
    </div>
  </>,
  document.getElementById('js-example')
);
